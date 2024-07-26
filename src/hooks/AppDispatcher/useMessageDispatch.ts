import { useAppDispatch } from "@/lib/store/hooks";
import { AppDispatch } from "@/lib/store/store";

class MessageDispatcher {
  private dispatch: AppDispatch;

  createMessage() {}
  updateMessage() {}
  getAllMessageOfChatRoom() {}

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }
}

const useMessageDispatch = () => {
  const dispatch = useAppDispatch();

  return new MessageDispatcher(dispatch);
};

export { useMessageDispatch };
