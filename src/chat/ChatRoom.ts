import { v4 as uuidv4 } from "uuid";
import {
  IFileMessage,
  IMessage,
  IMessageBase,
  ITextMessage,
} from "@/schema/MessageSchema";
import { IFile } from "@/schema/FileSchema";
import {
  IChatRoom,
  IChatRoomBase,
  IGroupChatRoom,
  IPrivateChatRoom,
} from "@/schema/ChatRoomSchema";

class ChatRoom implements IChatRoomBase {
  chatRoomId: string;
  members: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;

  constructor(members: string[], createdBy: string) {
    this.chatRoomId = uuidv4();
    this.members = members;
    this.createdBy = createdBy;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  toObject() {
    return {
      chatRoomId: this.chatRoomId,
      members: this.members,
      createdBy: this.createdBy,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export class PrivateChatRoom extends ChatRoom implements IPrivateChatRoom {
  type: "private";

  constructor(members: string[], createdBy: string) {
    super(members, createdBy);
    this.type = "private";
  }

  toObject(): IChatRoom {
    return {
      type: this.type,
      ...super.toObject(),
    };
  }
}

export class GroupChatRoom extends ChatRoom implements IGroupChatRoom {
  type: "group";
  chatName: string;
  chatRoomPicture: string;
  admins: string[];

  constructor(
    chatName: string,
    chatRoomPicture: string,
    admins: string[],
    members: string[],
    createdBy: string,
  ) {
    super(members, createdBy);
    this.type = "group";
    this.admins = admins;
    this.chatRoomPicture = chatRoomPicture;
    this.chatName = chatName;
  }

  toObject(): IChatRoom {
    return {
      type: this.type,
      chatName: this.chatName,
      chatRoomPicture: this.chatRoomPicture,
      admins: this.admins,
      ...super.toObject(),
    };
  }
}
