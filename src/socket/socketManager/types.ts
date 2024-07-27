import { IChatRoom } from "@/schema/ChatRoomSchema";
import { IChatUser } from "@/schema/ChatUserSchema";
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

interface ChatUserListenerMapping {
  "chatuser-create": (payload: IChatUser) => void;
  "chatuser-update": (payload: IChatUser) => void;
  "chatuser-getall": (payload: IChatUser[]) => void;
}

export type ListenerMapping = ChatRoomListenerMapping &
  MessageListenerMapping &
  ChatUserListenerMapping;
