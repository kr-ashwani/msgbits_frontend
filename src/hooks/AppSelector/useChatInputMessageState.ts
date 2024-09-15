import { chatInputMessageState } from "@/lib/store/features/chat/chatRoomDataSlice";
import { chatUserState } from "@/lib/store/features/chat/chatUserSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { IUser } from "@/schema/userSchema";
import { useMemo } from "react";

export class ChatInputMessageState {
  private chatInputMessage;
  private chatUser;
  private user;

  constructor(
    chatInputMessage: chatInputMessageState,
    chatUser: chatUserState,
    user: IUser | null,
  ) {
    this.chatInputMessage = chatInputMessage;
    this.chatUser = chatUser;
    this.user = user;
  }
}

const useChatInputMessageState = () => {
  const chatInputMessage = useAppSelector(
    (state) => state.chat.chatRoomData.chatInputMessage,
  );
  const chatUser = useAppSelector((state) => state.chat.chatUser);
  const user = useAppSelector((state) => state.auth.user);

  return useMemo(
    () => new ChatInputMessageState(chatInputMessage, chatUser, user),
    [chatInputMessage, chatUser, user],
  );
};

export { useChatInputMessageState };
