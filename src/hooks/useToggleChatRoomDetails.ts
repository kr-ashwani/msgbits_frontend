import { useEffect } from "react";
import { ChatRoomDetailsSelectedState } from "./AppSelector/useShowChatRoomDetailsState";

export function useToggleChatRoomDetails(
  showChatRoomDetail: ChatRoomDetailsSelectedState,
) {
  useEffect(() => {
    const chat = document.getElementById("chat");

    if (!chat) return;
    const showChatDetails =
      "lg:grid-cols-[var(--chatRoomContainer-width)_1fr_var(--chatRoomDetail-width)]";
    const hideChatDetails =
      "lg:grid-cols-[var(--chatRoomContainer-width)_1fr_0]";
    if (showChatRoomDetail.isChatRoomDetailsSelected()) {
      chat.classList.remove(hideChatDetails);
      chat.classList.add(showChatDetails);
    } else {
      chat.classList.remove(showChatDetails);
      chat.classList.add(hideChatDetails);
    }
  }, [showChatRoomDetail]);
}
