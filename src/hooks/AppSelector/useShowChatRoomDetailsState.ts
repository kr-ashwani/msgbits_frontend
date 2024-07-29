import { useAppSelector } from "@/lib/store/hooks";

class ChatRoomDetailsSelectedState {
  private chatRoomDetailsSelected: boolean;

  constructor(chatRoomDetailsSelected: boolean) {
    this.chatRoomDetailsSelected = chatRoomDetailsSelected;
  }

  showChatRoomDetails() {
    return this.chatRoomDetailsSelected;
  }
}
const useShowChatRoomDetailsState = () => {
  const chatRoomDetailsSelected = useAppSelector(
    (state) => state.chat.showChatRoomDetails,
  );

  return new ChatRoomDetailsSelectedState(chatRoomDetailsSelected);
};

export { useShowChatRoomDetailsState };
