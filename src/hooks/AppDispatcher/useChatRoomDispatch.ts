import { useAppDispatch } from "@/lib/store/hooks";
import { AppDispatch } from "@/lib/store/store";

class ChatRoomDispatcher {
  private dispatch: AppDispatch;

  createChatRoom() {}
  updateChatRoom() {}
  getAllChatRoom() {}

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }
}

const useChatRoomDispatch = () => {
  const dispatch = useAppDispatch();

  return new ChatRoomDispatcher(dispatch);
};

export { useChatRoomDispatch };
