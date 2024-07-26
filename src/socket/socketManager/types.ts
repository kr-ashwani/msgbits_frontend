import { IChatRoom } from "@/schema/ChatRoomSchema";
import { IMessage } from "@/schema/MessageSchema";

interface ChatRoomEmitterMapping {}

interface MessageEmitterMapping {}

export type EmitterMapping = ChatRoomEmitterMapping & MessageEmitterMapping;

interface ChatRoomListenerMapping {
  "chatroom-create": (payload: IChatRoom) => void;
  "chatroom-update": (payload: IChatRoom) => void;
  "chatroom-getall": (payload: IChatRoom[]) => void;
}

interface MessageListenerMapping {
  "message-create": (payload: IMessage) => void;
  "message-update": (payload: IMessage) => void;
  "message-chatroom": (payload: { [P: string]: IMessage[] }) => void;
}

export type ListenerMapping = ChatRoomListenerMapping & MessageListenerMapping;
