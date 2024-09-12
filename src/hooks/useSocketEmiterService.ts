import { SocketEmitterQueue } from "@/service/socketQueue/SocketEmitterQueue";
import { useSocket } from "./useSocket";
import { useMemo } from "react";
import { IMessage } from "@/schema/MessageSchema";
import { useAppSelector } from "@/lib/store/hooks";
import { IUser } from "@/schema/userSchema";

export interface MessageStatusEmit {
  chatRoomId: string;
  messageId: string;
}
class SocketEmitterService {
  private socketQueue;
  private user: IUser | null;

  constructor(socketQueue: SocketEmitterQueue, user: IUser | null) {
    this.socketQueue = socketQueue;
    this.user = user;
  }

  msgDeliveredTo(message: IMessage | IMessage[]) {
    const messageArr = Array.isArray(message) ? message : [message];
    if (!this.user) return;
    const userId = this.user._id;

    const msgIdArr: MessageStatusEmit[] = [];

    messageArr.forEach((msg) => {
      if (msg.senderId === userId || msg.deliveredTo.includes(userId)) return;
      msgIdArr.push({
        messageId: msg.messageId,
        chatRoomId: msg.chatRoomId,
      });
    });

    if (msgIdArr.length)
      this.socketQueue.emitDirectly("message-delivered", msgIdArr);
  }
  msgSeenBy(message: IMessage | IMessage[]) {
    const messageArr = Array.isArray(message) ? message : [message];
    if (!this.user) return;
    const userId = this.user._id;

    const msgIdArr: MessageStatusEmit[] = [];

    messageArr.forEach((msg) => {
      if (msg.senderId === userId || msg.seenBy.includes(userId)) return;
      msgIdArr.push({
        messageId: msg.messageId,
        chatRoomId: msg.chatRoomId,
      });
    });
    if (msgIdArr.length)
      this.socketQueue.emitDirectly("message-seen", msgIdArr);
  }
}

export const useSocketEmiterService = () => {
  const { socketQueue } = useSocket();
  const user = useAppSelector((state) => state.auth.user);

  const socketEmitterService = useMemo(
    () => new SocketEmitterService(socketQueue, user),
    [socketQueue, user],
  );

  return socketEmitterService;
};
