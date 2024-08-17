import { chatRoomState } from "@/lib/store/features/chat/chatRoomSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { IChatRoom } from "@/schema/ChatRoomSchema";
import { ChatUserState, useChatUserState } from "./useChatUserState";
import { IUser } from "@/schema/userSchema";
import { use, useMemo } from "react";

class ChatRoomState {
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
    if (this.chatRoom[chatId]) return this.chatRoom[chatId];
    return null;
  }
  getChatRooms() {
    const chatRooms: IChatRoom[] = [];
    Object.values(this.chatRoom).forEach((chatRoom) =>
      chatRooms.push(chatRoom),
    );
    return chatRooms;
  }
  getChatRoomPicture(chatId: string) {
    const fallbackChatRoomImage = "";
    if (!this.chatRoom[chatId]) return fallbackChatRoomImage;

    const chatRoom = this.chatRoom[chatId];
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
}
const useChatRoomState = () => {
  const chatRoom = useAppSelector((state) => state.chat.chatRoom);
  const chatUser = useChatUserState();
  const user = useAppSelector((state) => state.auth.user);

  return useMemo(
    () => new ChatRoomState(chatRoom, chatUser, user),
    [chatRoom, chatUser, user],
  );
};

export { useChatRoomState };
