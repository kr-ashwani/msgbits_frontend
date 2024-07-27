import { addMessageMappingOfChatRoom } from "@/lib/store/features/chat/chatRoomToMessageMapSlice";
import { addMessageOfChatRoom } from "@/lib/store/features/chat/messageSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { AppDispatch } from "@/lib/store/store";
import { IMessage } from "@/schema/MessageSchema";

class MessageDispatcher {
  private dispatch: AppDispatch;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }

  createMessage = () => {};
  updateMessage = () => {};
  getAllMessageOfChatRoom = (payload: Record<string, IMessage[]>) => {
    this.dispatch(addMessageMappingOfChatRoom(payload));
    this.dispatch(addMessageOfChatRoom(payload));
  };
}

const useMessageDispatch = () => {
  const dispatch = useAppDispatch();

  return new MessageDispatcher(dispatch);
};

export { useMessageDispatch };
