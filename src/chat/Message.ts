import { v4 as uuidv4 } from "uuid";
import {
  IFileMessage,
  IMessageBase,
  ITextMessage,
} from "@/schema/MessageSchema";
import { IFile } from "@/schema/FileSchema";

class Message implements IMessageBase {
  messageId: string;
  chatRoomId: string;
  message: string;
  senderId: string;
  status: "pending" | "sent" | "delivered" | "read" | "failed";
  repliedTo: string | null;
  createdAt: string;
  updatedAt: string;

  constructor(
    message: string,
    senderId: string,
    chatRoomId: string,
    repliedTo: string | null = null,
  ) {
    this.messageId = uuidv4();
    this.chatRoomId = chatRoomId;
    this.message = message;
    this.senderId = senderId;
    this.status = "pending";
    this.repliedTo = repliedTo;
    this.createdAt = Date.now().toString();
    this.updatedAt = Date.now().toString();
  }
}

class TextMessage extends Message implements ITextMessage {
  type: "text";

  constructor(
    message: string,
    senderId: string,
    chatRoomId: string,
    repliedTo: string | null = null,
  ) {
    super(message, senderId, chatRoomId, repliedTo);
    this.type = "text";
  }
}

class FileMessage extends Message implements IFileMessage {
  type: "file";
  file: IFile;

  constructor(
    message: string,
    senderId: string,
    chatRoomId: string,
    repliedTo: string | null = null,
    file: IFile,
  ) {
    super(message, senderId, chatRoomId, repliedTo);
    this.type = "file";
    this.file = file;
  }
}
