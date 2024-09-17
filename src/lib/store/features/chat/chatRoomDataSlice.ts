import { IMessage } from "@/schema/MessageSchema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type typingStatusState = {
  [p in string]: string | null;
};
export type chatInputMessageState = {
  [p in string]: {
    message: string;
    repliedTo: string | null;
  };
};
export type unreadMessagesState = {
  [p in string]: number;
};
export type newGroupMembersState = string[];

export interface chatRoomDataState {
  chatInputMessage: chatInputMessageState;
  typingStatus: typingStatusState;
  newGroupMembers: newGroupMembersState;
  unreadMessages: unreadMessagesState;
}
const initialState: chatRoomDataState = {
  chatInputMessage: {},
  typingStatus: {},
  newGroupMembers: [],
  unreadMessages: {},
};

export const chatRoomDataSlice = createSlice({
  name: "Chat Room Data",
  initialState,
  reducers: {
    addNewGroupMembers(state, action: PayloadAction<string[]>) {
      action.payload.forEach((member) => {
        if (!state.newGroupMembers.includes(member))
          state.newGroupMembers.push(member);
      });
    },
    resetNewGroupMembers(state, action: PayloadAction<void>) {
      state.newGroupMembers = [];
    },
    changeTypingStatus(
      state,
      action: PayloadAction<{ chatRoomId: string; memberId: string }>,
    ) {
      state.typingStatus[action.payload.chatRoomId] = action.payload.memberId;
    },
    resetTypingStatus(state, action: PayloadAction<{ chatRoomId: string }>) {
      state.typingStatus[action.payload.chatRoomId] = null;
    },
    setChatInputMessage(
      state,
      action: PayloadAction<{
        chatRoomId: string;
        message: string;
        repliedTo: string | null;
      }>,
    ) {
      const { message, repliedTo } = action.payload;
      state.chatInputMessage[action.payload.chatRoomId] = {
        message,
        repliedTo,
      };
    },
    setUnreadMessages(
      state,
      action: PayloadAction<{
        chatRoomMessages: {
          [p in string]: IMessage[] | IMessage;
        };
        userId: string;
      }>,
    ) {
      Object.entries(action.payload.chatRoomMessages).forEach(
        ([chatRoomId, message]) => {
          const userId = action.payload.userId;
          const msgArr: IMessage[] = Array.isArray(message)
            ? message
            : [message];

          // start iterating from end to get unread Messages
          for (let i = msgArr.length - 1; i >= 0; i--) {
            const msg = msgArr[i];
            // if it's user itself message then exit
            if (msg.senderId === userId) break;
            // if message is already seen by user then also exit
            else if (msg.seenBy.includes(userId)) break;
            // user hasn't seen the message so mark it
            else
              state.unreadMessages[msg.chatRoomId] =
                (state.unreadMessages[msg.chatRoomId] ?? 0) + 1;
          }
        },
      );
    },
    resetUnreadMessages(
      state,
      action: PayloadAction<{
        chatRoomId: string;
      }>,
    ) {
      state.unreadMessages[action.payload.chatRoomId] = 0;
    },
  },
});

export const {
  addNewGroupMembers,
  resetNewGroupMembers,
  changeTypingStatus,
  resetTypingStatus,
  setChatInputMessage,
  setUnreadMessages,
  resetUnreadMessages,
} = chatRoomDataSlice.actions;

export default chatRoomDataSlice.reducer;
