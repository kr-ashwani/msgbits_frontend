import { IChatRoom } from "@/schema/ChatRoomSchema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type typingStatusState = {
  [p in string]: string | null;
};
export type chatInputMessageState = {
  [p in string]: IChatRoom;
};
export type newGroupMembersState = string[];

export interface chatRoomDataState {
  chatInputMessage: chatInputMessageState;
  typingStatus: typingStatusState;
  newGroupMembers: newGroupMembersState;
}
const initialState: chatRoomDataState = {
  chatInputMessage: {},
  typingStatus: {},
  newGroupMembers: [],
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
  },
});

export const {
  addNewGroupMembers,
  resetNewGroupMembers,
  changeTypingStatus,
  resetTypingStatus,
} = chatRoomDataSlice.actions;

export default chatRoomDataSlice.reducer;
