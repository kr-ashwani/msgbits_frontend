import { chatRoomState } from "@/lib/store/features/chat/chatRoomSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { ChatUserState, useChatUserState } from "./useChatUserState";
import { IUser } from "@/schema/userSchema";
import { useMemo } from "react";

export class ChatRoomState {
  public chatRoomId: string;
  private chatRoomContainer: ChatRoomContainerState;

  constructor(chatRoomId: string, chatRoomContainer: ChatRoomContainerState) {
    this.chatRoomId = chatRoomId;
    this.chatRoomContainer = chatRoomContainer;
  }
  getChatRoomPicture() {
    return this.chatRoomContainer.getChatRoomPictureById(this.chatRoomId);
  }
  getChatRoomName() {
    return this.chatRoomContainer.getChatRoomNameById(this.chatRoomId);
  }
  getLastChatRoomMessage() {
    return this.chatRoomContainer.getLastChatRoomMessageById(this.chatRoomId);
  }
}

class ChatRoomContainerState {
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
    if (this.chatRoom[chatId]) return new ChatRoomState(chatId, this);
    return null;
  }
  getChatRooms() {
    const chatRooms: ChatRoomState[] = [];

    Object.values(this.chatRoom).forEach((chatRoom) =>
      chatRooms.push(new ChatRoomState(chatRoom.chatRoomId, this)),
    );
    return chatRooms;
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
  getChatRoomNameById(chatRoomId: string) {
    const fallbackChatName = "Chat Name is empty";
    if (!this.chatRoom[chatRoomId]) return fallbackChatName;

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
  getLastChatRoomMessageById(chatRoomId: string) {
    const chatRoom = this.chatRoom[chatRoomId];
    return chatRoom.lastMessageId;
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
