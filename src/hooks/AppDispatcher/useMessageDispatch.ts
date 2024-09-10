import { updateLastMessageIdOfChatRoom } from "@/lib/store/features/chat/chatRoomSlice";
import {
  addMessageMapping,
  addMessageMappingOfChatRoom,
} from "@/lib/store/features/chat/chatRoomToMessageMapSlice";
import {
  addMessage,
  addMessageOfChatRoom,
} from "@/lib/store/features/chat/messageSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { AppDispatch } from "@/lib/store/store";
import { IMessage } from "@/schema/MessageSchema";
import { useMemo } from "react";

export class MessageDispatcher {
  private dispatch: AppDispatch;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }

  createMessage = (payload: IMessage) => {
    this.dispatch(addMessage(payload));
    this.dispatch(addMessageMapping(payload));

    this.dispatch(updateLastMessageIdOfChatRoom(payload));
  };
  updateMessage = (payload: IMessage) => {};
  setMessagesOfChatRoom = (payload: Record<string, IMessage[]>) => {
    if (!Object.keys(payload).length) return;
    this.dispatch(addMessageMappingOfChatRoom(payload));
    this.dispatch(addMessageOfChatRoom(payload));
  };
}

const useMessageDispatch = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => new MessageDispatcher(dispatch), [dispatch]);
};

export { useMessageDispatch };
