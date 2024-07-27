import { IMessage } from "@/schema/MessageSchema";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface messageState {
  [p: string]: IMessage;
}
const initialState: messageState = {};

export const messageSlice = createSlice({
  name: "Message",
  initialState,
  reducers: {
    addMessageOfChatRoom(
      state,
      action: PayloadAction<Record<string, IMessage[]>>,
    ) {
      Object.values(action.payload).forEach((msgArr) => {
        msgArr.forEach((msg) => (state[msg.chatRoomId] = msg));
      });
    },
  },
});

export const { addMessageOfChatRoom } = messageSlice.actions;

export default messageSlice.reducer;
