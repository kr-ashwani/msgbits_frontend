import { Queue } from "@/utils/custom/Queue";
import { SocketManager } from "../../socket/socketManager/SocketManager";
import {
  ChatRoomEmitterMapping,
  EmitterMapping,
  MessageEmitterMapping,
} from "../../socket/socketManager/types";
import { debug } from "@/utils/custom/Debug";

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

  emitWithQueueId<T extends keyof EmitterMapping>(
    queueId: string,
    eventName: T,
    data: EmitterMapping[T],
  ) {
    if (!this.queueMap.has(queueId)) {
      this.queueMap.set(queueId, new Queue<SocketQueueData<T>>());
      this.queueProcessingMap.set(queueId, false);
    }

    const queue = this.queueMap.get(queueId)!;
    queue.enqueue({
      eventName,
      Data: data,
      noOfRetries: 0,
      firstAttemptTimestamp: Date.now(),
      isDataComplete: true,
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
    this.emitWithQueueId(`${chatRoomId}-msg`, eventName, data);
  }

  emitChatRoom<T extends keyof ChatRoomEmitterMapping>(
    eventName: T,
    data: ChatRoomEmitterMapping[T],
  ) {
    this.emitWithQueueId("chatroom", eventName as keyof EmitterMapping, data);
  }

  private processEventQueue(queueId: string): void {
    if (this.queueProcessingMap.get(queueId) || !this.socket.isConnected)
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
      .emit(data.eventName, data.Data, (err) => {
        if (err) {
          this.handleRetry(queueId, data);
        } else {
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
