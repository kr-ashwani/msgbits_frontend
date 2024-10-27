import { unreadMessagesState } from "@/lib/store/features/chat/chatRoomDataSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { useMemo } from "react";

export class ChatUnreadMessagesState {
  private unreadMessages;

  constructor(unreadMessages: unreadMessagesState) {
    this.unreadMessages = unreadMessages;
  }
  getUnreadMessages = (chatRoomId: string): number => {
    return this.unreadMessages[chatRoomId];
  };
}
const useChatUnreadMessages = () => {
  const unreadMessages = useAppSelector(
    (state) => state.chat.chatRoomData.unreadMessages,
  );

  return useMemo(
    () => new ChatUnreadMessagesState(unreadMessages),
    [unreadMessages],
  );
};

export { useChatUnreadMessages };
