import { chatRoomState } from "@/lib/store/features/chat/chatRoomSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { use, useMemo } from "react";
import { chatUserState } from "@/lib/store/features/chat/chatUserSlice";
import { IUser } from "@/schema/userSchema";
import {
  SelectedChatState,
  useSelectedChatState,
} from "./useSelectedChatState";

export class SelectedChatRoomState {
  private selectedChatState: SelectedChatState;
  private chatRoom: chatRoomState;
  private chatUser: chatUserState;
  private user: IUser | null;

  constructor(
    selectedChatState: SelectedChatState,
    chatRoom: chatRoomState,
    chatUser: chatUserState,
    user: IUser | null,
  ) {
    this.selectedChatState = selectedChatState;
    this.chatRoom = chatRoom;
    this.chatUser = chatUser;
    this.user = user;
  }

  getChatRoomMembers() {
    const userList: IUser[] = [];
    const selectedChat = this.selectedChatState.getSelectedChatRoom();
    if (selectedChat)
      selectedChat.members.forEach((memberId) => {
        const member = this.chatUser[memberId];

        if (selectedChat.type === "group" && member) userList.push(member);
        if (
          selectedChat.type === "private" &&
          member &&
          this.user &&
          this.user._id !== member._id
        )
          userList.push(member);
      });
    else {
      const tempChatRoomUserId = this.selectedChatState.getSelectedChatId();
      if (tempChatRoomUserId) {
        const member = this.chatUser[tempChatRoomUserId];
        userList.push(member);
      }
    }
    return userList;
  }
  getChatRoomName() {
    const chatRoomId = this.selectedChatState.getSelectedChatId();
    const fallbackChatName = "";
    if (chatRoomId) {
      if (!this.chatRoom[chatRoomId]) {
        const tempUser = this.chatUser[chatRoomId];
        return tempUser ? tempUser.name : fallbackChatName;
      }
      const chatRoom = this.chatRoom[chatRoomId];
      if (chatRoom.type === "group") return chatRoom.chatName;
      else {
        if (!this.user) return fallbackChatName;

        const otherUserId = chatRoom.members.filter(
          (item) => item !== this.user?._id,
        );
        const otherUser = this.chatUser[otherUserId[0]];

        return otherUser ? otherUser.name : fallbackChatName;
      }
    }
    return fallbackChatName;
  }
}
const useSelectedChatRoomState = () => {
  const selectedChatState = useSelectedChatState();
  const chatRoom = useAppSelector((state) => state.chat.chatRoom);
  const chatUser = useAppSelector((state) => state.chat.chatUser);
  const user = useAppSelector((state) => state.auth.user);

  return useMemo(
    () =>
      new SelectedChatRoomState(selectedChatState, chatRoom, chatUser, user),
    [selectedChatState, chatRoom, chatUser, user],
  );
};

export { useSelectedChatRoomState };
