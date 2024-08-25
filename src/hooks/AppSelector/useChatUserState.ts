import { chatUserState } from "@/lib/store/features/chat/chatUserSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { IChatUser } from "@/schema/ChatUserSchema";
import { IUser } from "@/schema/userSchema";
import { useMemo } from "react";

export class ChatUserState {
  private chatUser: chatUserState;
  private user: IUser | null;
  constructor(chatUser: chatUserState, user: IUser | null) {
    this.chatUser = chatUser;
    this.user = user;
  }
  getUserById(userId: string) {
    if (this.chatUser[userId]) return this.chatUser[userId];
    else return null;
  }
  getUserNameById(userId: string) {
    if (this.chatUser[userId]) return this.chatUser[userId].name;
    else return "";
  }
  getAllUsers() {
    const users: IChatUser[] = [];

    Object.values(this.chatUser).forEach((user) => users.push(user));
    return users;
  }
  getAllUsersExceptItself() {
    const users: IChatUser[] = [];

    Object.values(this.chatUser).forEach((user) => {
      if (user._id !== this.user?._id) users.push(user);
    });
    return users;
  }
}

const useChatUserState = () => {
  const chatUser = useAppSelector((state) => state.chat.chatUser);
  const user = useAppSelector((state) => state.auth.user);

  return useMemo(() => new ChatUserState(chatUser, user), [chatUser, user]);
};

export { useChatUserState };
