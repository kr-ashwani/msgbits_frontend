import { v4 as uuidv4 } from "uuid";
import {
  IFileMessage,
  IMessageBase,
  ITextMessage,
} from "@/schema/MessageSchema";
import { IFile } from "@/schema/FileSchema";

class Message implements IMessageBase {
  messageId: string;
  message: string;
  senderId: string;
  status: "pending" | "sent" | "delivered" | "read" | "failed";
  repliedTo: string | null;
  createdAt: number;
  updatedAt: number;

  constructor(
    message: string,
    senderId: string,
    repliedTo: string | null = null,
  ) {
    this.messageId = uuidv4();
    this.message = message;
    this.senderId = senderId;
    this.status = "pending";
    this.repliedTo = repliedTo;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }
}

class TextMessage extends Message implements ITextMessage {
  type: "text";

  constructor(
    message: string,
    senderId: string,
    repliedTo: string | null = null,
  ) {
    super(message, senderId, repliedTo);
    this.type = "text";
  }
}

class FileMessage extends Message implements IFileMessage {
  type: "file";
  file: IFile;

  constructor(
    message: string,
    senderId: string,
    repliedTo: string | null = null,
    file: IFile,
  ) {
    super(message, senderId, repliedTo);
    this.type = "file";
    this.file = file;
  }
}
