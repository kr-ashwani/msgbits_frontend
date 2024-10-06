import { Queue } from "@/utils/custom/Queue";
import { SocketManager } from "../../socket/socketManager/SocketManager";
import {
  ChatRoomEmitterMapping,
  EmitterMapping,
  MessageEmitterMapping,
} from "../../socket/socketManager/types";
import { debug } from "@/utils/custom/debug";
import _ from "lodash";

interface SocketQueueData<T extends keyof EmitterMapping> {
  eventName: T;
  Data: EmitterMapping[T];
  noOfRetries: number;
  firstAttemptTimestamp: number;
  isDataComplete: boolean;
}

export class SocketEmitterQueue {
  private socket: SocketManager;
  private queueMap: Map<string, Queue<SocketQueueData<keyof EmitterMapping>>>;
  private queueProcessingMap: Map<string, boolean>;
  private static EVENT_TIMEOUT = 5000; // 5 seconds timeout
  private static MAX_RETRIES = 3; // Maximum number of retries
  private static RETRY_DELAY = 1000; // Delay between retries (ms)

  constructor(socket: SocketManager) {
    this.socket = socket;
    this.queueMap = new Map();
    this.queueProcessingMap = new Map();

    // Listen to socket connection events
    this.socket.io().on("connect", () => this.processAllQueues());
  }

  /**
   * Emit directly will emit event instantly if socket is connected
   * if Socket is bot connected then it will ignore
   * @param eventName
   * @param data
   */
  emitDirectly<T extends keyof EmitterMapping>(
    eventName: T,
    data: EmitterMapping[T],
  ) {
    if (this.socket.isConnected()) this.socket.emit(eventName, data);
  }
  emitWithQueueId<T extends keyof EmitterMapping>(
    queueId: string,
    eventName: T,
    data: EmitterMapping[T],
  ) {
    if (!this.queueMap.has(queueId)) {
      this.queueMap.set(queueId, new Queue<SocketQueueData<T>>());
      this.queueProcessingMap.set(queueId, false);
    }

    let isDataComplete = true;
    // for message create event mark isDataComplete to false for file Message
    if (eventName === "message-create") {
      const eventData = data as EmitterMapping["message-create"];
      if (eventData.type === "file") isDataComplete = false;
    }

    const queue = this.queueMap.get(queueId)!;
    queue.enqueue({
      eventName,
      Data: data,
      noOfRetries: 0,
      firstAttemptTimestamp: Date.now(),
      isDataComplete,
    });

    this.processEventQueue(queueId);
  }

  emit<T extends keyof EmitterMapping>(eventName: T, data: EmitterMapping[T]) {
    this.emitWithQueueId("commonQueue", eventName, data);
  }

  emitChatRoomMessage<T extends keyof MessageEmitterMapping>(
    chatRoomId: string,
    eventName: T,
    data: MessageEmitterMapping[T],
  ) {
    this.emitWithQueueId(
      `${chatRoomId}-msg`,
      eventName as keyof EmitterMapping,
      data,
    );
  }

  emitChatRoom<T extends keyof ChatRoomEmitterMapping>(
    eventName: T,
    data: ChatRoomEmitterMapping[T],
  ) {
    this.emitWithQueueId("chatroom", eventName as keyof EmitterMapping, data);
  }

  updateNewFileMsgEventWithUrl({
    fileId,
    chatRoomId,
    url,
  }: {
    fileId: string;
    chatRoomId: string;
    url: string;
  }) {
    const queueId = `${chatRoomId}-msg`;
    const chatRoomMsgQueue = this.queueMap.get(queueId);

    let isUpdated = false;
    chatRoomMsgQueue?.forEach((QueueElem) => {
      if (QueueElem.eventName === "message-create") {
        const eventData = QueueElem.Data as EmitterMapping["message-create"];

        if (eventData.type === "file") {
          const cloneEventData = _.cloneDeep(eventData);
          if (cloneEventData.file.fileId === fileId) {
            // update file url and mark queue node to complete
            cloneEventData.file.url = url;
            QueueElem.isDataComplete = true;
            isUpdated = true;
          }
          QueueElem.Data = cloneEventData;
        }
      }
    });

    if (isUpdated) this.processEventQueue(queueId);
  }

  deleteFailedNewFileMessageEvent({
    fileId,
    chatRoomId,
  }: {
    fileId: string;
    chatRoomId: string;
  }) {
    const queueId = `${chatRoomId}-msg`;
    const chatRoomMsgQueue = this.queueMap.get(queueId);

    let elemRemoved = false;
    chatRoomMsgQueue?.removeElem((QueueElem) => {
      if (QueueElem.eventName === "message-create") {
        const eventData = QueueElem.Data as EmitterMapping["message-create"];

        if (
          eventData.type === "file" &&
          eventData.chatRoomId === chatRoomId &&
          eventData.file.fileId === fileId
        ) {
          elemRemoved = true;
          return true;
        }
      }
      return false;
    });

    // if any queue node is removed then trigger processing
    if (elemRemoved) this.processEventQueue(queueId);
  }

  private processEventQueue(queueId: string): void {
    if (this.queueProcessingMap.get(queueId) || !this.socket.isConnected())
      return;

    const queue = this.queueMap.get(queueId)!;
    const data = queue.peek();

    if (!data) {
      // Clean up empty queue
      this.cleanupQueue(queueId);
      return;
    }

    if (!data.isDataComplete) return;

    this.queueProcessingMap.set(queueId, true);

    this.socket
      .timeout(SocketEmitterQueue.EVENT_TIMEOUT)
      .emit(data.eventName, data.Data, (err, ack) => {
        if (err) {
          debug("error", `Event ${data.eventName} failed beacuse ${err}`);
          this.handleRetry(queueId, data);
        } else {
          if (ack && !ack?.success)
            debug(
              "error",
              `Server failed to acknowledge event ${data.eventName} due to ${ack?.error}`,
            );
          queue.dequeue();
          this.queueProcessingMap.set(queueId, false);
          this.processEventQueue(queueId);
        }
      });
  }

  private handleRetry(
    queueId: string,
    data: SocketQueueData<keyof EmitterMapping>,
  ): void {
    if (data.noOfRetries < SocketEmitterQueue.MAX_RETRIES) {
      data.noOfRetries++;
      setTimeout(() => {
        this.queueProcessingMap.set(queueId, false);
        this.processEventQueue(queueId);
      }, SocketEmitterQueue.RETRY_DELAY);
    } else {
      debug(
        "error",
        `Event ${data.eventName} dropped after ${SocketEmitterQueue.MAX_RETRIES} retries`,
      );
      this.queueMap.get(queueId)?.dequeue();
      this.queueProcessingMap.set(queueId, false);
      this.processEventQueue(queueId);
    }
  }

  private cleanupQueue(queueId: string): void {
    this.queueMap.delete(queueId);
    this.queueProcessingMap.delete(queueId);
  }

  private processAllQueues(): void {
    Array.from(this.queueMap.keys()).forEach((key) => {
      this.processEventQueue(key);
    });
  }
}
