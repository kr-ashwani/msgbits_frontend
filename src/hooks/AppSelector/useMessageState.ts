import { chatRoomToMessageMapState } from "@/lib/store/features/chat/chatRoomToMessageMapSlice";
import { messageState } from "@/lib/store/features/chat/messageSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { IMessage } from "@/schema/MessageSchema";
import { useMemo } from "react";
import { formatTimeDifference } from "@/utils/custom/formatTimeDifference";

export class MessageState {
  public messageId: string;
  private messageContainerState: MessageContainerState;

  constructor(messageId: string, messageContainerState: MessageContainerState) {
    this.messageId = messageId;
    this.messageContainerState = messageContainerState;
  }
  getMessageText() {
    return this.messageContainerState.getMessageTextById(this.messageId);
  }
  getLastMessageTimeFromNow() {
    return this.messageContainerState.getLastMessageTimeFromNowById(
      this.messageId,
    );
  }
}
class MessageContainerState {
  private message: messageState;
  private chatRoomToMessageMap: chatRoomToMessageMapState;
  constructor(
    message: messageState,
    chatRoomToMessageMap: chatRoomToMessageMapState,
  ) {
    this.message = message;
    this.chatRoomToMessageMap = chatRoomToMessageMap;
  }
  getMessagesOfChatRoom(chatRoomId: string) {
    const messageArr: IMessage[] = [];
    this.chatRoomToMessageMap[chatRoomId].map((messageId) => {
      if (this.message[messageId]) messageArr.push(this.message[messageId]);
    });
    return messageArr;
  }
  getMessageById(messageId: string) {
    if (this.message[messageId]) return new MessageState(messageId, this);
    return null;
  }
  getAllMessages() {
    const message: { [p: string]: IMessage[] } = {};

    Object.entries(this.chatRoomToMessageMap).forEach((entry) => {
      const messageArr: IMessage[] = [];
      message[entry[0]] = messageArr;

      entry[1].forEach((messageId) => {
        if (this.message[messageId]) messageArr.push(this.message[messageId]);
      });
    });

    return message;
  }
  getMessageTextById(messageId: string) {
    const fallbackMsg = "No Message";
    if (this.message[messageId]) return this.message[messageId].message;
    return fallbackMsg;
  }
  getLastMessageTimeFromNowById(messageId: string) {
    const fallbackMsg = "No Timestamp";
    if (this.message[messageId])
      return formatTimeDifference(this.message[messageId].updatedAt);
    return fallbackMsg;
  }
}

const useMessageState = () => {
  const message = useAppSelector((state) => state.chat.message);
  const chatRoomToMessageMap = useAppSelector(
    (state) => state.chat.chatRoomToMessageMap,
  );

  return useMemo(
    () => new MessageContainerState(message, chatRoomToMessageMap),
    [message, chatRoomToMessageMap],
  );
};

export { useMessageState };
