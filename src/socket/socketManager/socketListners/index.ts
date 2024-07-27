import { Socket } from "socket.io-client";
import { setUpChatRoomEventListenerWithValidation } from "./chatRoomEventListners";
import { setUpChatUserEventListenerWithValidation } from "./chatUserEventListeners";
import { setUpMessageEventListenerWithValidation } from "./messageEventListeners";
import { ListenerMapping } from "../types";

export class SocketListeners {
  private socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }

  setUpListenersWithValidation<K extends keyof ListenerMapping>(
    event: K,
    callback: ListenerMapping[K],
  ) {
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
    if (unsub) return unsub;
    unsub = setUpChatUserEventListenerWithValidation(
      this.socket,
      event,
      callback,
    );
    return unsub;
  }
}
