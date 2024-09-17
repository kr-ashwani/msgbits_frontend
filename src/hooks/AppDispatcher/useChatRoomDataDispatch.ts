import {
  addNewGroupMembers,
  changeTypingStatus,
  resetNewGroupMembers,
  resetTypingStatus,
  resetUnreadMessages,
} from "@/lib/store/features/chat/chatRoomDataSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { AppDispatch } from "@/lib/store/store";
import { useMemo } from "react";

export class ChatRoomDataDispatch {
  private dispatch: AppDispatch;

  addNewGroupMembers(members: string[]) {
    this.dispatch(addNewGroupMembers(members));
  }
  resetNewGroupMembers() {
    this.dispatch(resetNewGroupMembers());
  }
  changeTypingStatus(payload: { chatRoomId: string; memberId: string }) {
    this.dispatch(changeTypingStatus(payload));
  }
  resetTypingStatus(payload: { chatRoomId: string }) {
    this.dispatch(resetTypingStatus(payload));
  }
  resetUnreadMessages(payload: { chatRoomId: string }) {
    this.dispatch(resetUnreadMessages(payload));
  }

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }
}

const useChatRoomDataDispatch = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => new ChatRoomDataDispatch(dispatch), [dispatch]);
};

export { useChatRoomDataDispatch };
