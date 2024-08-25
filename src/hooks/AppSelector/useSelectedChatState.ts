import { selectedChatState } from "@/lib/store/features/chat/selectedChatSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { useMemo } from "react";
import { ChatRoomContainerState, useChatRoomState } from "./useChatRoomState";

export class SelectedChatState {
  private selectedChatRoom: selectedChatState;
  private chatRoomContainer: ChatRoomContainerState;

  constructor(
    selectedChatRoom: selectedChatState,
    chatRoomContainer: ChatRoomContainerState,
  ) {
    this.selectedChatRoom = selectedChatRoom;
    this.chatRoomContainer = chatRoomContainer;
  }

  getChatState() {
    const chatRoomId = this.selectedChatRoom.id;
    return chatRoomId
      ? this.chatRoomContainer.getChatRoomById(chatRoomId)
      : null;
  }
  isChatSelected() {
    return this.getSelectedChatId() ? true : false;
  }
  getSelectedChatId() {
    return this.selectedChatRoom.id;
  }
}
const useSelectedChatState = () => {
  const selectedChatId = useAppSelector((state) => state.chat.selectedChat);
  const chatRoomContainer = useChatRoomState();

  return useMemo(
    () => new SelectedChatState(selectedChatId, chatRoomContainer),
    [selectedChatId, chatRoomContainer],
  );
};

export { useSelectedChatState };
