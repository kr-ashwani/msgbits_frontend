import { newGroupMembersState } from "@/lib/store/features/chat/chatRoomDataSlice";
import { chatUserState } from "@/lib/store/features/chat/chatUserSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { IUser } from "@/schema/userSchema";
import { useMemo } from "react";

export class NewGroupMembersState {
  private newGroupMembersState;
  private chatUser;
  private user;

  constructor(
    newGroupMembersState: newGroupMembersState,
    chatUser: chatUserState,
    user: IUser | null,
  ) {
    this.newGroupMembersState = newGroupMembersState;
    this.chatUser = chatUser;
    this.user = user;
  }
  getMembersId(): string[] {
    return this.newGroupMembersState;
  }
  getMembers(): IUser[] {
    const members: IUser[] = [];
    this.newGroupMembersState.forEach((id) => {
      const user = this.chatUser[id];
      if (user) members.push(user);
    });

    return members;
  }
}

const useNewGroupMembersState = () => {
  const newGroupMembersState = useAppSelector(
    (state) => state.chat.chatRoomData.newGroupMembers,
  );
  const chatUser = useAppSelector((state) => state.chat.chatUser);
  const user = useAppSelector((state) => state.auth.user);

  return useMemo(
    () => new NewGroupMembersState(newGroupMembersState, chatUser, user),
    [newGroupMembersState, chatUser, user],
  );
};

export { useNewGroupMembersState };
