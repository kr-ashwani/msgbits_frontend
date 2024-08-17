import { useAppSelector } from "@/lib/store/hooks";
import { useMemo } from "react";

export class ChatRoomDetailsSelectedState {
  private chatRoomDetailsSelected: boolean;

  constructor(chatRoomDetailsSelected: boolean) {
    this.chatRoomDetailsSelected = chatRoomDetailsSelected;
  }

  isChatRoomDetailsSelected() {
    return this.chatRoomDetailsSelected;
  }
}
const useShowChatRoomDetailsState = () => {
  const chatRoomDetailsSelected = useAppSelector(
    (state) => state.chat.showChatRoomDetails,
  );

  return useMemo(
    () => new ChatRoomDetailsSelectedState(chatRoomDetailsSelected),
    [chatRoomDetailsSelected],
  );
};

export { useShowChatRoomDetailsState };
