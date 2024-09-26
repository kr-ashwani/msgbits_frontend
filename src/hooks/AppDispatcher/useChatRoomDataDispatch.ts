import { resetChatData } from "@/lib/store/features/chat/chatSlice";
import {
  setEnterToSendMsg,
  updateTheme,
} from "./../../lib/store/features/chat/settingSlice";
import {
  addNewGroupMembers,
  changeTypingStatus,
  resetNewGroupMembers,
  resetRepliedToMessage,
  resetTypingStatus,
  resetUnreadMessages,
  setRepliedToMessage,
} from "@/lib/store/features/chat/chatRoomDataSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { AppDispatch } from "@/lib/store/store";
import { ChatRoomAndMember } from "@/schema/ChatRoomAndMemberSchema";
import { useMemo } from "react";

export class ChatRoomDataDispatch {
  private dispatch: AppDispatch;
  private chatTypingTimeOut: { [p in string]: NodeJS.Timeout } = {};

  addNewGroupMembers = (members: string[]) => {
    this.dispatch(addNewGroupMembers(members));
  };
  resetNewGroupMembers = () => {
    this.dispatch(resetNewGroupMembers());
  };
  changeTypingStatus = (payload: ChatRoomAndMember) => {
    this.dispatch(changeTypingStatus(payload));

    const timeout = this.chatTypingTimeOut[payload.chatRoomId];
    if (timeout) clearTimeout(timeout);
    this.chatTypingTimeOut[payload.chatRoomId] = setTimeout(() => {
      this.resetTypingStatus({ chatRoomId: payload.chatRoomId });
    }, 5000);
  };
  resetTypingStatus = (payload: { chatRoomId: string }) => {
    this.dispatch(resetTypingStatus(payload));
  };
  resetUnreadMessages = (payload: { chatRoomId: string }) => {
    this.dispatch(resetUnreadMessages(payload));
  };

  setRepliedToMessage = (payload: {
    chatRoomId: string;
    messageId: string;
  }) => {
    this.dispatch(setRepliedToMessage(payload));
  };
  resetRepliedToMessage = (payload: { chatRoomId: string }) => {
    this.dispatch(resetRepliedToMessage(payload));
  };

  setEnterToSendMsg = (payload: boolean) => {
    this.dispatch(setEnterToSendMsg(payload));
  };
  updateTheme = (payload: string) => {
    localStorage.setItem("theme", payload);
    this.dispatch(updateTheme(payload));
  };

  resetChatData = () => {
    this.dispatch(resetChatData());
  };
  getDispatch = () => {
    return this.dispatch;
  };

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }
}

const useChatRoomDataDispatch = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => new ChatRoomDataDispatch(dispatch), [dispatch]);
};

export { useChatRoomDataDispatch };
