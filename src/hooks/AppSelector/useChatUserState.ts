import { chatUserState } from "@/lib/store/features/chat/chatUserSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { useMemo } from "react";

export class ChatUserState {
  private chatUser: chatUserState;
  constructor(chatUser: chatUserState) {
    this.chatUser = chatUser;
  }
  getUserById(messageId: string) {
    if (this.chatUser[messageId]) return this.chatUser[messageId];
    else return null;
  }
}

const useChatUserState = () => {
  const chatUser = useAppSelector((state) => state.chat.chatUser);

  return useMemo(() => new ChatUserState(chatUser), [chatUser]);
};

export { useChatUserState };
