import { IChatRoom } from "@/schema/ChatRoomSchema";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface chatRoomState {
  [p: string]: IChatRoom;
}
const initialState: chatRoomState = {};

export const chatRoomSlice = createSlice({
  name: "Chat Room",
  initialState,
  reducers: {
    addChatRoom(state, action: PayloadAction<IChatRoom | IChatRoom[]>) {
      if (Array.isArray(action.payload)) {
        action.payload.forEach(
          (chatroom) => (state[chatroom.chatRoomId] = chatroom),
        );
      } else {
        state[action.payload.chatRoomId] = action.payload;
      }
    },
  },
});

export const { addChatRoom } = chatRoomSlice.actions;

export default chatRoomSlice.reducer;
