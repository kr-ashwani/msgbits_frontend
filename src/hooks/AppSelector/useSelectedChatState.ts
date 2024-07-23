import { chatRoomState } from "@/lib/store/features/chat/chatRoomSlice";
import { useAppSelector } from "@/lib/store/hooks";

class SelectedChatState {
  private chatRoomId: string | null;
  private chatRoom: chatRoomState;

  constructor(chatRoomId: string | null, chatRoom: chatRoomState) {
    this.chatRoomId = chatRoomId;
    this.chatRoom = chatRoom;
  }

  getSelectedChatRoom() {
    if (this.chatRoomId) {
      if (this.chatRoom[this.chatRoomId]) return this.chatRoom[this.chatRoomId];
      else return null;
    }
    return null;
  }
}
const useSelectedChatState = () => {
  const selectedChatId = useAppSelector((state) => state.chat.selectedChat);
  const chatRoom = useAppSelector((state) => state.chat.chatRoom);

  return new SelectedChatState(selectedChatId, chatRoom);
};

export { useSelectedChatState };
