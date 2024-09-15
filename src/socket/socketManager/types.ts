import { MessageStatusEmit } from "@/hooks/useSocketEmiterService";
import { SyncUpdateInput } from "@/hooks/useSocketSyncService";
import {
  ChatAddNewMember,
  ChatAddNewMemberSchema,
} from "@/schema/ChatAddNewMemberSchema";
import {
  ChatRoomAndMember,
  ChatRoomAndMemberSchema,
} from "@/schema/ChatRoomAndMemberSchema";
import { ChatRoomSchema, IChatRoom } from "@/schema/ChatRoomSchema";
import { ChatUserSchema } from "@/schema/ChatUserSchema";

import { IMessage, MessageSchema } from "@/schema/MessageSchema";
import { MessageStatusSchema } from "@/schema/MessageStatusSchema";
import { z } from "zod";

export interface ChatRoomEmitterMapping {
  "chatroom-create": IChatRoom;
  "chatroom-addNewMembers": ChatAddNewMember;
  "chatroom-leave": ChatRoomAndMember;
  "chatroom-removeUser": ChatRoomAndMember;
  "chatroom-makeAdmin": ChatRoomAndMember;
  "chatroom-removeAdmin": ChatRoomAndMember;
}

export interface MessageEmitterMapping {
  "message-create": IMessage;
  "message-delivered": MessageStatusEmit[];
  "message-seen": MessageStatusEmit[];
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
  "chatroom-addNewMembers": ChatAddNewMemberSchema,
  "chatroom-leave": ChatRoomAndMemberSchema,
  "chatroom-removeUser": ChatRoomAndMemberSchema,
  "chatroom-makeAdmin": ChatRoomAndMemberSchema,
  "chatroom-removeAdmin": ChatRoomAndMemberSchema,
};

const MessageListenerSchema = {
  "message-create": MessageSchema,
  "message-update": MessageSchema,
  "message-chatroom": z.record(z.string(), z.array(MessageSchema)),
  "message-delivered": MessageStatusSchema,
  "message-seen": MessageStatusSchema,
  "message-sent": z.string(),
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

interface SuccessAckMessage {
  success: true;
}
interface FailureAckMessage {
  success: false;
  error: string;
}
export type AckMessage = SuccessAckMessage | FailureAckMessage;
