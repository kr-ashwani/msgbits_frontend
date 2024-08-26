import { ChatRoomSchema } from "@/schema/ChatRoomSchema";
import { ChatUserSchema } from "@/schema/ChatUserSchema";
import { MessageSchema } from "@/schema/MessageSchema";
import { z } from "zod";

export interface ChatRoomEmitterMapping {}

export interface MessageEmitterMapping {}

export type EmitterMapping = ChatRoomEmitterMapping & MessageEmitterMapping;

const ChatRoomListenerSchema = {
  "chatroom-create": ChatRoomSchema,
  "chatroom-update": ChatRoomSchema,
  "chatroom-getall": z.array(ChatRoomSchema),
};

const MessageListenerSchema = {
  "message-create": MessageSchema,
  "message-update": MessageSchema,
  "message-chatroom": z.record(z.string(), z.array(MessageSchema)),
};
const ChatUserListenerSchema = {
  "chatuser-create": ChatUserSchema,
  "chatuser-update": ChatUserSchema,
  "chatuser-getall": z.array(ChatUserSchema),
};

const ListenerSchema = {
  ...ChatRoomListenerSchema,
  ...MessageListenerSchema,
  ...ChatUserListenerSchema,
};

export type ListenerSchema = typeof ListenerSchema;
export type ChatRoomListenerSchema = typeof ChatRoomListenerSchema;
export type MessageListenerSchema = typeof MessageListenerSchema;
export type ChatUserListenerSchema = typeof ChatUserListenerSchema;
export {
  ListenerSchema,
  ChatRoomListenerSchema,
  MessageListenerSchema,
  ChatUserListenerSchema,
};
