import { chatRoomState } from "@/lib/store/features/chat/chatRoomSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { ChatUserState, useChatUserState } from "./useChatUserState";
import { IUser } from "@/schema/userSchema";
import { useMemo } from "react";
import { IGroupChatRoom } from "@/schema/ChatRoomSchema";

export class ChatRoomState {
  public chatRoomId: string;
  private chatRoomContainer: ChatRoomContainerState;

  constructor(chatRoomId: string, chatRoomContainer: ChatRoomContainerState) {
    this.chatRoomId = chatRoomId;
    this.chatRoomContainer = chatRoomContainer;
  }
  getChatContainer() {
    return this.chatRoomContainer;
  }
  getChatRoomPicture() {
    return this.chatRoomContainer.getChatRoomPictureById(this.chatRoomId);
  }
  getChatRoomCreatorName() {
    return this.chatRoomContainer.getChatRoomCreatorName(this.chatRoomId);
  }
  getChatRoomCreatorDate() {
    return this.chatRoomContainer.getChatRoomCreatorDate(this.chatRoomId);
  }
  getRawChatRoom() {
    return this.chatRoomContainer.getRawChatRoomById(this.chatRoomId);
  }
  getChatRoomMembers() {
    return this.chatRoomContainer.getChatRoomMembers(this.chatRoomId);
  }
  getChatRoomName() {
    return this.chatRoomContainer.getChatRoomName(this.chatRoomId);
  }
  isChatRoomAdmin(memberId: string) {
    return this.chatRoomContainer.isChatRoomAdmin(this.chatRoomId, memberId);
  }
  getUsersExceptChatMembers() {
    return this.chatRoomContainer.getUsersExceptChatMembers(this.chatRoomId);
  }
  getChatMembersNameExceptYou() {
    return this.chatRoomContainer.getChatMembersNameExceptYou(this.chatRoomId);
  }
  getCommonGroupChat() {
    return this.chatRoomContainer.getCommonGroupChatById(this.chatRoomId);
  }
  getLastMessageId() {
    return this.chatRoomContainer.getLastMessageId(this.chatRoomId);
  }
  getUpdatedTime() {
    return this.chatRoomContainer.getUpdatedTime(this.chatRoomId);
  }
}

export class ChatRoomContainerState {
  private chatRoom: chatRoomState;
  private chatUser: ChatUserState;
  private user: IUser | null;

  constructor(
    chatRoom: chatRoomState,
    chatUser: ChatUserState,
    user: IUser | null,
  ) {
    this.chatRoom = chatRoom;
    this.chatUser = chatUser;
    this.user = user;
  }
  getChatRoomById(chatId: string) {
    return new ChatRoomState(chatId, this);
    //return null;
  }
  getRawChatRoomById(chatId: string) {
    if (this.chatRoom[chatId]) return this.chatRoom[chatId];
    return null;
  }
  getChatRooms() {
    const chatRooms: ChatRoomState[] = [];

    Object.values(this.chatRoom).forEach((chatRoom) =>
      chatRooms.push(new ChatRoomState(chatRoom.chatRoomId, this)),
    );
    return chatRooms;
  }
  getPrivateChatWithMemberId(memberId: string) {
    if (!this.user) return null;
    const userId = this.user._id;

    const chatRooms = Object.values(this.chatRoom);

    for (let i = 0; i < chatRooms.length; i++) {
      const chatRoom = chatRooms[i];
      if (chatRoom.type === "group") continue;
      if (
        chatRoom.members.includes(memberId) &&
        chatRoom.members.includes(userId)
      )
        return chatRoom.chatRoomId;
    }
    return null;
  }

  getChatRoomPictureById(chatRoomId: string) {
    const fallbackChatRoomImage = "";
    if (!this.chatRoom[chatRoomId]) return fallbackChatRoomImage;

    const chatRoom = this.chatRoom[chatRoomId];
    if (chatRoom.type === "group") return chatRoom.chatRoomPicture;
    else {
      if (!this.user) return fallbackChatRoomImage;

      const otherUserId = chatRoom.members.filter(
        (item) => item !== this.user?._id,
      );
      const otherUser = this.chatUser.getUserById(otherUserId[0]);

      return otherUser ? otherUser.profilePicture : fallbackChatRoomImage;
    }
  }
  getChatRoomCreatorName(chatRoomId: string) {
    const chatRoom = this.chatRoom[chatRoomId];
    if (chatRoom) {
      const creatorId = chatRoom.createdBy;
      const creator = this.chatUser.getUserById(creatorId);
      return creator ? creator.name.split(" ")[0] : "";
    } else return "";
  }
  getChatRoomCreatorDate(chatRoomId: string) {
    const chatRoom = this.chatRoom[chatRoomId];
    if (chatRoom) {
      return new Date(chatRoom.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } else return "";
  }
  getChatRoomMembers(chatRoomId: string) {
    const userList: IUser[] = [];
    const chatRoom = this.chatRoom[chatRoomId];
    if (chatRoom)
      chatRoom.members.forEach((memberId) => {
        const member = this.chatUser.getUserById(memberId);

        if (chatRoom.type === "group" && member) userList.push(member);
        if (
          chatRoom.type === "private" &&
          member &&
          this.user &&
          this.user._id !== member._id
        )
          userList.push(member);
      });
    else {
      const member = this.chatUser.getUserById(chatRoomId);
      if (member) userList.push(member);
    }
    return userList;
  }
  getChatRoomName(chatRoomId: string) {
    const fallbackChatName = "";

    if (!this.chatRoom[chatRoomId]) {
      const tempUser = this.chatUser.getUserById(chatRoomId);
      return tempUser ? tempUser.name : fallbackChatName;
    }
    const chatRoom = this.chatRoom[chatRoomId];
    if (chatRoom.type === "group") return chatRoom.chatName;
    else {
      if (!this.user) return fallbackChatName;

      const otherUserId = chatRoom.members.filter(
        (item) => item !== this.user?._id,
      );
      const otherUser = this.chatUser.getUserById(otherUserId[0]);

      return otherUser ? otherUser.name : fallbackChatName;
    }
  }
  isChatRoomAdmin(chatRoomId: string, memberId: string) {
    const chatRoom = this.chatRoom[chatRoomId];
    if (!chatRoom) return false;
    return chatRoom.type === "group"
      ? chatRoom.admins.includes(memberId)
      : false;
  }
  getUsersExceptChatMembers(chatRoomId: string) {
    const userList: IUser[] = [];
    const chatRoom = this.chatRoom[chatRoomId];
    if (chatRoom) {
      const chatUser = this.chatUser.getAllUsers();
      chatUser.forEach((user) => {
        if (!chatRoom.members.includes(user._id)) userList.push(user);
      });
    }
    return userList;
  }
  getChatMembersNameExceptYou(chatRoomId: string) {
    const memberName: string[] = [];
    const chatRoom = this.chatRoom[chatRoomId];
    if (chatRoom) {
      chatRoom.members.forEach((member) => {
        if (member !== this.user?._id)
          memberName.push(this.chatUser.getUserNameById(member));
      });
    }
    return memberName;
  }

  getCommonGroupChatById(chatRoomId: string) {
    const groupChatList: IGroupChatRoom[] = [];
    const user = this.user;
    const chatRoom = this.chatRoom[chatRoomId];
    if (!(user && chatRoom)) return groupChatList;
    if (chatRoom.type === "group") return groupChatList;

    const memberId = chatRoom.members.filter(
      (member) => member !== user._id,
    )[0];
    if (!memberId) return groupChatList;

    Object.values(this.chatRoom).forEach((chatRoom) => {
      if (chatRoom.type === "private") return;
      if (
        chatRoom.members.includes(user._id) &&
        chatRoom.members.includes(memberId)
      )
        groupChatList.push(chatRoom);
    });
    return groupChatList;
  }

  getLastMessageId(chatRoomId: string) {
    return this.chatRoom[chatRoomId]
      ? this.chatRoom[chatRoomId].lastMessageId
      : null;
  }
  getUpdatedTime(chatRoomId: string) {
    if (!this.chatRoom[chatRoomId]) return 0;
    return new Date(this.chatRoom[chatRoomId].updatedAt).getTime();
  }
}
const useChatRoomState = () => {
  const chatRoom = useAppSelector((state) => state.chat.chatRoom);
  const chatUser = useChatUserState();
  const user = useAppSelector((state) => state.auth.user);

  return useMemo(
    () => new ChatRoomContainerState(chatRoom, chatUser, user),
    [chatRoom, chatUser, user],
  );
};

export { useChatRoomState };
