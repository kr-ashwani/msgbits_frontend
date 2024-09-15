import { toast } from "sonner";
import { AckMessage, EmitterMapping, ListenerSchema } from "./types";
import { Socket } from "socket.io-client";
import { debug } from "@/utils/custom/Debug";

export class SocketManager {
  private socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
    this.init();
  }
  public init() {
    this.setupDefaultEventListeners();
  }

  private setupDefaultEventListeners(): void {
    this.socket.on("connect", () => {
      debug("success", "Socket connected");
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
    });

    this.socket.on("reconnect_failed", () => {
      debug("error", "Reconnection failed");
    });
  }
  public emit<K extends keyof EmitterMapping>(
    event: K,
    data: EmitterMapping[K],
    callback?: (err: any, ack: AckMessage) => void,
  ) {
    this.socket.emit(event, data, callback);
  }

  public on<K extends keyof ListenerSchema>(
    event: K,
    callback: (payload: Zod.infer<ListenerSchema[K]>) => void,
  ) {
    const eventHandler = (payload: any) => {
      const result = ListenerSchema[event].safeParse(payload);
      if (result.success) callback(result.data);
      else {
        toast.error(
          `ValidationError: server did not correctly send ${event} event data`,
        );
      }
    };
    this.socket.on(event as string, eventHandler);
    return { event, eventHandler };
  }

  public off<K extends keyof ListenerSchema>(
    event: K,
    callback?: (payload: Zod.infer<ListenerSchema[K]>) => void,
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

  public timeout(timeout: number) {
    this.socket.timeout(timeout);
    return this;
  }

  public disconnect(): void {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
  }

  public getSocketId(): string | undefined {
    return this.socket.id;
  }

  public once<K extends keyof ListenerSchema>(
    event: K,
    callback: (payload: Zod.infer<ListenerSchema[K]>) => void,
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

  public onDisconnect(callback: (reason: string) => void) {
    function handler(reason: string) {
      callback(reason);
    }
    this.socket.on("disconnect", handler);
    return handler;
  }

  public offDisconnect(callback: (reason: string) => void) {
    this.socket.off("disconnect", callback);
  }

  public send(data: any, callback?: (error: any) => void): void {
    this.socket.send(data, callback);
  }

  public io(): Socket {
    return this.socket;
  }
}
