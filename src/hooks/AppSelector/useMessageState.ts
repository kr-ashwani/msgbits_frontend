import { chatRoomToMessageMapState } from "@/lib/store/features/chat/chatRoomToMessageMapSlice";
import { messageState } from "@/lib/store/features/chat/messageSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { IMessage } from "@/schema/MessageSchema";

class MessageState {
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
    if (this.message[messageId]) return this.message[messageId];
    else return null;
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
}

const useMessageState = () => {
  const message = useAppSelector((state) => state.chat.message);
  const chatRoomToMessageMap = useAppSelector(
    (state) => state.chat.chatRoomToMessageMap,
  );

  return new MessageState(message, chatRoomToMessageMap);
};

export { useMessageState };
