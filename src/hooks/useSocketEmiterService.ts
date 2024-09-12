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

  updateMsgStatus(
    action: "seen" | "delivered",
    message: IMessage | IMessage[],
  ) {
    const messageArr = Array.isArray(message) ? message : [message];
    if (!this.user) return;
    const userId = this.user._id;

    const msgIdArr: MessageStatusEmit[] = [];

    messageArr.forEach((msg) => {
      const statusArr = action === "seen" ? msg.seenBy : msg.deliveredTo;
      if (msg.type === "info") return;
      if (msg.senderId === userId || statusArr.includes(userId)) return;
      msgIdArr.push({
        messageId: msg.messageId,
        chatRoomId: msg.chatRoomId,
      });
    });

    const event = action === "seen" ? "message-seen" : "message-delivered";
    if (msgIdArr.length) this.socketQueue.emitDirectly(event, msgIdArr);
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
