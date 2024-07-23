import { chatRoomState } from "@/lib/store/features/chat/chatRoomSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { IChatRoom } from "@/schema/ChatRoomSchema";

class ChatRoomState {
  private chatRoom: chatRoomState;

  constructor(chatRoom: chatRoomState) {
    this.chatRoom = chatRoom;
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
}
const useChatRoomState = () => {
  const chatRoom = useAppSelector((state) => state.chat.chatRoom);

  return new ChatRoomState(chatRoom);
};

export { useChatRoomState };
