import { typingStatusState } from "@/lib/store/features/chat/chatRoomDataSlice";
import { chatUserState } from "@/lib/store/features/chat/chatUserSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { IUser } from "@/schema/userSchema";
import { useMemo } from "react";

export class ChatTypingStatusState {
  private typingStatus;
  private chatUser;
  private user;

  constructor(
    typingStatus: typingStatusState,
    chatUser: chatUserState,
    user: IUser | null,
  ) {
    this.typingStatus = typingStatus;
    this.chatUser = chatUser;
    this.user = user;
  }
}

const useChatTypingStatusState = () => {
  const typingStatus = useAppSelector(
    (state) => state.chat.chatRoomData.typingStatus,
  );
  const chatUser = useAppSelector((state) => state.chat.chatUser);
  const user = useAppSelector((state) => state.auth.user);

  return useMemo(
    () => new ChatTypingStatusState(typingStatus, chatUser, user),
    [typingStatus, chatUser, user],
  );
};

export { useChatTypingStatusState };
