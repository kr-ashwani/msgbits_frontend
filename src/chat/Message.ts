import { v4 as uuidv4 } from "uuid";
import {
  IFileMessage,
  IInfoMessage,
  IMessage,
  IMessageBase,
  ITextMessage,
} from "@/schema/MessageSchema";
import { IFile } from "@/schema/FileSchema";

class Message implements IMessageBase {
  messageId: string;
  chatRoomId: string;
  message: string;
  senderId: string;
  status: "pending" | "sent";
  repliedTo: string | null;
  createdAt: string;
  updatedAt: string;
  deliveredTo: string[];
  seenBy: string[];

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
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
    this.deliveredTo = [];
    this.seenBy = [];
  }

  toObject(): IMessageBase {
    return {
      messageId: this.messageId,
      chatRoomId: this.chatRoomId,
      message: this.message,
      senderId: this.senderId,
      status: this.status,
      repliedTo: this.repliedTo,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deliveredTo: this.deliveredTo,
      seenBy: this.seenBy,
    };
  }
}

export class TextMessage extends Message implements ITextMessage {
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

  toObject(): IMessage {
    return {
      type: this.type,
      ...super.toObject(),
    };
  }
}

export class InfoMessage extends Message implements IInfoMessage {
  type: "info";

  constructor(
    message: string,
    senderId: string,
    chatRoomId: string,
    repliedTo: string | null = null,
  ) {
    super(message, senderId, chatRoomId, repliedTo);
    this.type = "info";
  }

  toObject(): IMessage {
    return {
      type: this.type,
      ...super.toObject(),
    };
  }
}

export class TimestampMessage extends Message implements IInfoMessage {
  type: "info";

  constructor(
    senderId: string,
    chatRoomId: string,
    repliedTo: string | null = null,
  ) {
    super("TIMESTAMP", senderId, chatRoomId, repliedTo);
    this.type = "info";
  }

  toObject(): IMessage {
    return {
      type: this.type,
      ...super.toObject(),
    };
  }
}

export class FileMessage extends Message implements IFileMessage {
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

  toObject(): IMessage {
    return {
      type: this.type,
      file: this.file,
      ...super.toObject(),
    };
  }
}
