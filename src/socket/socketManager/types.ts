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
import {
  GroupChatProfileUpdate,
  GroupChatProfileUpdateSchema,
} from "@/schema/GroupChatProfileUpdate";

import { IMessage, MessageSchema } from "@/schema/MessageSchema";
import { MessageStatusSchema } from "@/schema/MessageStatusSchema";
import {
  UserUpdateProfile,
  UserUpdateProfileSchema,
} from "@/schema/UserUpdateProfileSchema";

import { z } from "zod";

export interface ChatRoomEmitterMapping {
  "chatroom-create": IChatRoom;
  "chatroom-addNewMembers": ChatAddNewMember;
  "chatroom-leave": ChatRoomAndMember;
  "chatroom-removeUser": ChatRoomAndMember;
  "chatroom-makeAdmin": ChatRoomAndMember;
  "chatroom-removeAdmin": ChatRoomAndMember;
  "chatroom-memberTyping": ChatRoomAndMember;
  "chatroom-updateChatNameOrPic": GroupChatProfileUpdate;
}

export interface MessageEmitterMapping {
  "message-create": IMessage;
  "message-delivered": MessageStatusEmit[];
  "message-seen": MessageStatusEmit[];
}

export interface ChatUserEmitterMapping {
  "chatuser-updateProfile": UserUpdateProfile;
}
export interface SyncEmitterMapping {
  "sync-updateChatRoom:Messages:ChatUsers": SyncUpdateInput;
  "sync-allUserStatus": null;
  heartbeat: string;
}

export type EmitterMapping = ChatRoomEmitterMapping &
  MessageEmitterMapping &
  ChatUserEmitterMapping &
  SyncEmitterMapping;

const ChatRoomListenerSchema = {
  "chatroom-create": ChatRoomSchema,
  "chatroom-addNewMembers": ChatAddNewMemberSchema,
  "chatroom-leave": ChatRoomAndMemberSchema,
  "chatroom-removeUser": ChatRoomAndMemberSchema,
  "chatroom-makeAdmin": ChatRoomAndMemberSchema,
  "chatroom-removeAdmin": ChatRoomAndMemberSchema,
  "chatroom-memberTyping": ChatRoomAndMemberSchema,
  "chatroom-updateChatNameOrPic": GroupChatProfileUpdateSchema,
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
  "chatuser-statusChange": z.object({
    userId: z.union([z.string(), z.array(z.string())]),
    status: z.string(),
  }),
  "chatuser-updateProfile": UserUpdateProfileSchema,
};

const SyncListenerSchema = {
  "sync-update": z.string(),
  "sync-updateChatRoom:Messages:ChatUsers": z.object({
    chatRoom: z.array(ChatRoomSchema),
    message: z.record(z.string(), z.array(MessageSchema)),
    chatUser: z.array(ChatUserSchema),
  }),
  "sync-allUserStatus": z.array(z.string()),
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
