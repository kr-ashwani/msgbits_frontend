import { typingStatusState } from "@/lib/store/features/chat/chatRoomDataSlice";
import { chatUserState } from "@/lib/store/features/chat/chatUserSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { IUser } from "@/schema/userSchema";
import { capitalizeStr } from "@/utils/custom/capitalizeStr";
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

  getUser(chatRoomId: string) {
    const memberId = this.typingStatus[chatRoomId];
    if (!this.user || !memberId) return null;
    const member = this.chatUser[memberId];
    if (!member) return null;

    const userName =
      this.user._id === member._id
        ? "You"
        : capitalizeStr(member.name.split(" ")[0]);

    return {
      userName,
      user: member,
    };
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
