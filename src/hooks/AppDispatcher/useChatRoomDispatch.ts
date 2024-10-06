import {
  addChatRoom,
  addNewMembers,
  chatRoomMakeAdmin,
  chatRoomRemoveAdmin,
  exitChatRoom,
  updateGroupChatProfilePicOrName,
} from "@/lib/store/features/chat/chatRoomSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { AppDispatch } from "@/lib/store/store";
import { ChatAddNewMember } from "@/schema/ChatAddNewMemberSchema";
import { ChatRoomAndMember } from "@/schema/ChatRoomAndMemberSchema";
import { IChatRoom } from "@/schema/ChatRoomSchema";
import { GroupChatProfileUpdate } from "@/schema/GroupChatProfileUpdate";
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

  makeAdmin = (payload: ChatRoomAndMember) => {
    this.dispatch(chatRoomMakeAdmin(payload));
  };

  removeAdmin = (payload: ChatRoomAndMember) => {
    this.dispatch(chatRoomRemoveAdmin(payload));
  };

  exitChatRoom = (payload: ChatRoomAndMember) => {
    this.dispatch(exitChatRoom(payload));
  };

  updateGroupChatProfilePicOrName = (payload: GroupChatProfileUpdate) => {
    this.dispatch(updateGroupChatProfilePicOrName(payload));
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
