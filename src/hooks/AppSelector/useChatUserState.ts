import { chatUserState } from "@/lib/store/features/chat/chatUserSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { IChatUser } from "@/schema/ChatUserSchema";
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
  getAllUsers() {
    const users: IChatUser[] = [];

    Object.values(this.chatUser).forEach((entry) => users.push(entry));
    return users;
  }
}

const useChatUserState = () => {
  const chatUser = useAppSelector((state) => state.chat.chatUser);

  return useMemo(() => new ChatUserState(chatUser), [chatUser]);
};

export { useChatUserState };
