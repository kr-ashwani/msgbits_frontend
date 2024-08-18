import { chatRoomState } from "@/lib/store/features/chat/chatRoomSlice";
import { selectedChatState } from "@/lib/store/features/chat/selectedChatSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { useMemo } from "react";

export class SelectedChatState {
  private selectedChatRoom: selectedChatState;
  private chatRoom: chatRoomState;

  constructor(selectedChatRoom: selectedChatState, chatRoom: chatRoomState) {
    this.selectedChatRoom = selectedChatRoom;
    this.chatRoom = chatRoom;
  }

  getSelectedChatRoom() {
    const chatRoomId = this.selectedChatRoom.id;
    return chatRoomId ? this.chatRoom[chatRoomId] || null : null;
  }
  isChatRoomSelected() {
    return this.getSelectedChatRoom() ? true : false;
  }
}
const useSelectedChatState = () => {
  const selectedChatId = useAppSelector((state) => state.chat.selectedChat);
  const chatRoom = useAppSelector((state) => state.chat.chatRoom);

  return useMemo(
    () => new SelectedChatState(selectedChatId, chatRoom),
    [selectedChatId, chatRoom],
  );
};

export { useSelectedChatState };
