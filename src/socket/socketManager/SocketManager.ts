import { Socket } from "socket.io-client";
import { EmitterMapping, ListenerMapping } from "./types";
import { debug } from "@/utils/custom/Debug";
import { ChatRoomSchema } from "@/schema/ChatRoomSchema";
import { toastDelegate } from "@/utils/toastDelegate/ToastDelegate";
import { z } from "zod";
import { setUpChatRoomEventListenerWithValidation } from "./socketListners/chatRoomEventListners";
import { setUpMessageEventListenerWithValidation } from "./socketListners/messageEventListeners";

export class SocketManager {
  private socket: Socket;
  private eventQueue: { [event: string]: Queue<any> } = {};
  private isProcessingQueue: { [event: string]: boolean } = {};
  private timeoutDuration: number = 5000; // 5 seconds timeout duration

  constructor(socket: Socket) {
    this.socket = socket;
    this.setupDefaultEventListeners();
  }

  private setupDefaultEventListeners(): void {
    this.socket.on("connect", () => {
      debug("success", "Socket connected");
      this.flushEventQueue();
    });

    this.socket.on("disconnect", (reason) => {
      debug("error", `Socket disconnected: ${reason}`);
    });

    this.socket.on("connect_error", (error) => {
      debug("error", `Connection error: ${error.message}`);
    });

    this.socket.on("reconnect_attempt", (attemptNumber) => {
      debug("warning", `Reconnecting attempt #${attemptNumber}`);
    });

    this.socket.on("reconnect", (attemptNumber) => {
      debug("success", `Reconnected on attempt #${attemptNumber}`);
      this.flushEventQueue();
    });

    this.socket.on("reconnect_failed", () => {
      debug("error", "Reconnection failed");
    });

    // Add more default event listeners as needed
  }

  public emit<K extends keyof EmitterMapping>(
    event: K,
    data: EmitterMapping[K],
    bypassCache: boolean = false,
  ): void {
    if (bypassCache && this.socket.connected) {
      this.emitDirectly(event, data);
    } else {
      this.cacheEvent(event, data);
      if (this.socket.connected) {
        this.processEventQueue(event);
      }
    }
  }

  private emitDirectly<K extends keyof EmitterMapping>(
    event: K,
    data: EmitterMapping[K],
  ): void {
    const timeoutId = setTimeout(() => {
      debug("error", `Acknowledgment timeout for event "${event}"`);
    }, this.timeoutDuration);

    this.socket.emit(event as string, data, (ack: any) => {
      clearTimeout(timeoutId); // Clear the timeout if acknowledgment is received
      debug(`Acknowledgment received for event "${event}":`, ack);
    });
  }

  private cacheEvent<T>(event: string, data: T): void {
    if (!this.eventQueue[event]) {
      this.eventQueue[event] = new Queue<any>();
      this.isProcessingQueue[event] = false;
    }
    this.eventQueue[event].enqueue(data);
  }

  private dequeueEvent(event: string): void {
    if (this.eventQueue[event] && !this.eventQueue[event].isEmpty()) {
      this.eventQueue[event].dequeue();
    }
  }

  private flushEventQueue(): void {
    for (const event in this.eventQueue) {
      if (this.eventQueue.hasOwnProperty(event)) {
        this.processEventQueue(event as keyof EmitterMapping);
      }
    }
  }

  private processEventQueue(event: keyof EmitterMapping): void {
    if (this.isProcessingQueue[event] || !this.socket.connected) {
      return;
    }

    const data = this.eventQueue[event].peek();
    if (data) {
      this.isProcessingQueue[event] = true;
      const timeoutId = setTimeout(() => {
        debug("error", `Acknowledgment timeout for event "${event}"`);
        this.isProcessingQueue[event] = false;
        this.dequeueEvent(event); // Optionally remove the timed-out event
        this.processEventQueue(event); // Continue processing the queue
      }, this.timeoutDuration);

      this.socket.emit(event as string, data, (ack: any) => {
        clearTimeout(timeoutId); // Clear the timeout if acknowledgment is received
        debug(
          "success",
          `Acknowledgment received for event "${event}": ${ack}`,
        );
        this.dequeueEvent(event);
        this.isProcessingQueue[event] = false;
        this.processEventQueue(event); // Continue processing the queue
      });
    }
  }

  public on<K extends keyof ListenerMapping>(
    event: K,
    callback: ListenerMapping[K],
  ) {
    // chat room event

    let unsub = null;
    unsub = setUpChatRoomEventListenerWithValidation(
      this.socket,
      event,
      callback,
    );
    if (unsub) return unsub;
    unsub = setUpMessageEventListenerWithValidation(
      this.socket,
      event,
      callback,
    );
    return unsub;
  }

  public off<K extends keyof ListenerMapping>(
    event: K,
    callback?: ListenerMapping[K],
  ): void {
    if (callback) {
      this.socket.off(event as string, callback);
    } else {
      this.socket.off(event as string);
    }
  }

  public isConnected(): boolean {
    return this.socket.connected;
  }

  public connect(): void {
    if (!this.socket.connected) {
      this.socket.connect();
    }
  }

  public disconnect(): void {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
  }

  public getSocketId(): string | undefined {
    return this.socket.id;
  }

  // Additional functionality for advanced use cases
  public once<K extends keyof ListenerMapping>(
    event: K,
    callback: ListenerMapping[K],
  ): void {
    this.socket.once(event as string, callback);
  }

  public removeAllListeners(event?: string): void {
    if (event) {
      this.socket.removeAllListeners(event);
    } else {
      this.socket.removeAllListeners();
    }
  }

  public send(data: any, callback?: (error: any) => void): void {
    this.socket.send(data, callback);
  }

  public io(): Socket {
    return this.socket;
  }
}
