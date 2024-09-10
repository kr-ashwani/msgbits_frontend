import { SyncUpdateInput } from "@/hooks/useSocketSyncService";
import { ChatRoomSchema, IChatRoom } from "@/schema/ChatRoomSchema";
import { ChatUserSchema } from "@/schema/ChatUserSchema";
import { IMessage, MessageSchema } from "@/schema/MessageSchema";
import { z } from "zod";

export interface ChatRoomEmitterMapping {
  "chatroom-create": IChatRoom;
}

export interface MessageEmitterMapping {
  "message-create": IMessage;
}
export interface SyncEmitterMapping {
  "sync-updateChatRoom:Messages:ChatUsers": SyncUpdateInput;
}

export type EmitterMapping = ChatRoomEmitterMapping &
  MessageEmitterMapping &
  SyncEmitterMapping;

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

const SyncListenerSchema = {
  "sync-update": z.string(),
  "sync-updateChatRoom:Messages:ChatUsers": z.object({
    chatRoom: z.array(ChatRoomSchema),
    message: z.record(z.string(), z.array(MessageSchema)),
    chatUser: z.array(ChatUserSchema),
  }),
};

const ListenerSchema = {
  ...ChatRoomListenerSchema,
  ...MessageListenerSchema,
  ...ChatUserListenerSchema,
  ...SyncListenerSchema,
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
  SyncListenerSchema,
};
