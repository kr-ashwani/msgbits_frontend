import { repliedToMessageState } from "@/lib/store/features/chat/chatRoomDataSlice";
import { selectedChatState } from "@/lib/store/features/chat/selectedChatSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { useMemo } from "react";
import {
  MessageContainerState,
  MessageState,
  useMessageState,
} from "./useMessageState";

export class RepliedToMessage {
  private repliedToMessage;
  private selectedChatState;
  private messageContainer;

  constructor(
    repliedToMessage: repliedToMessageState,
    selectedChatState: selectedChatState,
    messageContainer: MessageContainerState,
  ) {
    this.repliedToMessage = repliedToMessage;
    this.selectedChatState = selectedChatState;
    this.messageContainer = messageContainer;
  }
  getRepliedToMessage(): MessageState | null {
    const chatRoomId = this.selectedChatState.id;
    if (!chatRoomId) return null;
    const messageId = this.repliedToMessage[chatRoomId];
    if (!messageId) return null;

    return this.messageContainer.getMessageById(messageId);
  }
}

const useRepliedToMessageState = () => {
  const repliedToMessage = useAppSelector(
    (state) => state.chat.chatRoomData.repliedToMessage,
  );
  const selectedChatState = useAppSelector((state) => state.chat.selectedChat);
  const messageContainer = useMessageState();

  return useMemo(
    () =>
      new RepliedToMessage(
        repliedToMessage,
        selectedChatState,
        messageContainer,
      ),
    [repliedToMessage, selectedChatState, messageContainer],
  );
};

export { useRepliedToMessageState };
