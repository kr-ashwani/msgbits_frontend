import {
  addChatRoom,
  addNewMembers,
} from "@/lib/store/features/chat/chatRoomSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { AppDispatch } from "@/lib/store/store";
import { ChatAddNewMember } from "@/schema/ChatAddNewMemberSchema";
import { IChatRoom } from "@/schema/ChatRoomSchema";
import { useMemo } from "react";

export class ChatRoomDispatcher {
  private dispatch: AppDispatch;

  createChatRoom = (payload: IChatRoom) => {
    this.dispatch(addChatRoom(payload));
  };
  updateChatRoom = () => {};
  setChatRooms = (payload: IChatRoom[]) => {
    if (payload.length) this.dispatch(addChatRoom(payload));
  };

  addNewMembers = (payload: ChatAddNewMember) => {
    this.dispatch(addNewMembers(payload));
  };

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }
}

const useChatRoomDispatch = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => new ChatRoomDispatcher(dispatch), [dispatch]);
};

export { useChatRoomDispatch };
