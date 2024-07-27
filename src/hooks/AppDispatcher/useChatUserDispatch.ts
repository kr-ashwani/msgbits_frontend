import { addChatUser } from "@/lib/store/features/chat/chatUserSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { AppDispatch } from "@/lib/store/store";
import { IChatUser } from "@/schema/ChatUserSchema";

class ChatUserDispatcher {
  private dispatch: AppDispatch;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }
  createChatUser = () => {};
  updateChatUser = () => {};
  getAllChatUser = (payload: IChatUser[]) => {
    this.dispatch(addChatUser(payload));
  };
}

const useChatUserDispatch = () => {
  const dispatch = useAppDispatch();

  return new ChatUserDispatcher(dispatch);
};

export { useChatUserDispatch };
