import { Socket } from "socket.io-client";
import { SocketManager } from "../socketManager/SocketManager";
import {
  ChatRoomEmitterMapping,
  EmitterMapping,
  MessageEmitterMapping,
} from "../socketManager/types";

interface SocketQueueData<T extends keyof EmitterMapping> {
  eventName: T;
  Data: EmitterMapping[T];
  isDataCompleted: boolean;
  noOfRetries: number;
  firstAttemptTimestamp: number;
}

class SocketEmitterQueue {
  private socket: SocketManager;
  private queueMap: Map<string, Queue<SocketQueueData<keyof EmitterMapping>>>;
  private queueProcessingMap: Map<string, boolean>;
  private static EVENTTIMEOUT: number = 5000; // 5 seconds timeout duration

  constructor(socket: SocketManager) {
    this.socket = socket;
    this.queueMap = new Map<
      string,
      Queue<SocketQueueData<keyof EmitterMapping>>
    >();
    this.queueProcessingMap = new Map<string, boolean>();
  }

  /**
   * Add socket events to queueId
   * @param queueId
   * @param eventName
   * @param data
   */
  emitWithQueueId<T extends keyof EmitterMapping>(
    queueId: string,
    eventName: T,
    data: EmitterMapping[T],
  ) {
    if (!this.queueMap.has(queueId)) {
      this.queueMap.set(queueId, new Queue<SocketQueueData<T>>());
      this.queueProcessingMap.set(queueId, false);
    }

    const queue = this.queueMap.get(queueId);
    if (queue) {
      const socketQueueData: SocketQueueData<T> = {
        eventName: eventName,
        Data: data,
        isDataCompleted: true,
        noOfRetries: 0,
        firstAttemptTimestamp: Date.now(),
      };
      queue.enqueue(socketQueueData);
    }
  }

  /**
   * Add socket events to common queue
   * @param eventName
   * @param data
   */
  emit<T extends keyof EmitterMapping>(eventName: T, data: EmitterMapping[T]) {
    this.emitWithQueueId("commonQueue", eventName, data);
  }

  /**
   * Add chatRoom messages events to queue
   * @param chatRoomId
   * @param eventName
   * @param data
   */
  emitChatRoomMessage<T extends keyof MessageEmitterMapping>(
    chatRoomId: string,
    eventName: T,
    data: MessageEmitterMapping[T],
  ) {
    this.emitWithQueueId(chatRoomId + "-msg", eventName, data);
  }

  /**
   * Add chatRoom events to queue
   * @param eventName
   * @param data
   */
  emitChatRoom<T extends keyof ChatRoomEmitterMapping>(
    eventName: T,
    data: ChatRoomEmitterMapping[T],
  ) {
    this.emitWithQueueId("chatroom", eventName, data);
  }

  private processEventQueue(event: string): void {
    if (this.queueProcessingMap.get(event) || !this.socket.isConnected) return;

    const data = this.queueMap.get(event)?.peek();
    if (data) {
      this.queueProcessingMap.set(event, true);
      this.socket.emit(data.eventName, data.Data);
    }
  }
}
