import { setUnreadMessages } from "@/lib/store/features/chat/chatRoomDataSlice";
import { updateLastMessageIdOfChatRoom } from "@/lib/store/features/chat/chatRoomSlice";
import {
  addMessageMapping,
  addMessageMappingOfChatRoom,
} from "@/lib/store/features/chat/chatRoomToMessageMapSlice";
import {
  addMessage,
  addMessageOfChatRoom,
  updateDeliveredTo,
  updateMsgSent,
  updateSeenBy,
} from "@/lib/store/features/chat/messageSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { AppDispatch } from "@/lib/store/store";
import { IMessage } from "@/schema/MessageSchema";
import { MessageStatus } from "@/schema/MessageStatusSchema";
import { IUser } from "@/schema/userSchema";
import { useMemo } from "react";

export class MessageDispatcher {
  private dispatch;
  private user;

  constructor(dispatch: AppDispatch, user: IUser | null) {
    this.user = user;
    this.dispatch = dispatch;
  }

  createMessage = (payload: IMessage) => {
    this.dispatch(addMessage(payload));
    this.dispatch(addMessageMapping(payload));

    this.dispatch(updateLastMessageIdOfChatRoom(payload));

    // not self message
    if (this.user && payload.senderId !== this.user._id)
      this.dispatch(
        setUnreadMessages({
          chatRoomMessages: { [payload.chatRoomId]: payload },
          userId: this.user._id,
        }),
      );
  };

  updateMessage = (payload: IMessage) => {};

  setMessagesOfChatRoom = (payload: Record<string, IMessage[]>) => {
    if (!Object.keys(payload).length) return;
    this.dispatch(addMessageMappingOfChatRoom(payload));
    this.dispatch(addMessageOfChatRoom(payload));

    if (this.user)
      this.dispatch(
        setUnreadMessages({
          chatRoomMessages: payload,
          userId: this.user._id,
        }),
      );
  };
  updateDeliveredTo = (payload: MessageStatus) => {
    this.dispatch(updateDeliveredTo(payload));
  };
  updateSeenBy = (payload: MessageStatus) => {
    this.dispatch(updateSeenBy(payload));
  };
  updateMsgSent = (payload: string) => {
    this.dispatch(updateMsgSent(payload));
  };
}

const useMessageDispatch = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  return useMemo(() => new MessageDispatcher(dispatch, user), [dispatch, user]);
};

export { useMessageDispatch };
