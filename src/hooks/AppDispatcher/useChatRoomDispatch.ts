import { addChatRoom } from "@/lib/store/features/chat/chatRoomSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { AppDispatch } from "@/lib/store/store";
import { IChatRoom } from "@/schema/ChatRoomSchema";

class ChatRoomDispatcher {
  private dispatch: AppDispatch;

  createChatRoom = () => {};
  updateChatRoom = () => {};
  getAllChatRoom = (payload: IChatRoom[]) => {
    this.dispatch(addChatRoom(payload));
  };

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }
}

const useChatRoomDispatch = () => {
  const dispatch = useAppDispatch();

  return new ChatRoomDispatcher(dispatch);
};

export { useChatRoomDispatch };
