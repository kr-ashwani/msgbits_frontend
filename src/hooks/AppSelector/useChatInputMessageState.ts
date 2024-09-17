import { chatInputMessageState } from "@/lib/store/features/chat/chatRoomDataSlice";
import { selectedChatState } from "@/lib/store/features/chat/selectedChatSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { useMemo } from "react";

export class ChatInputMessageState {
  private chatInputMessage;
  private selectedChatState;

  constructor(
    chatInputMessage: chatInputMessageState,
    selectedChatState: selectedChatState,
  ) {
    this.chatInputMessage = chatInputMessage;
    this.selectedChatState = selectedChatState;
  }
  getSelectedChatMessage() {
    return (
      this.chatInputMessage[this.selectedChatState.id || ""]?.message || ""
    );
  }
}

const useChatInputMessageState = () => {
  const chatInputMessage = useAppSelector(
    (state) => state.chat.chatRoomData.chatInputMessage,
  );
  const selectedChatState = useAppSelector((state) => state.chat.selectedChat);

  return useMemo(
    () => new ChatInputMessageState(chatInputMessage, selectedChatState),
    [chatInputMessage, selectedChatState],
  );
};

export { useChatInputMessageState };
