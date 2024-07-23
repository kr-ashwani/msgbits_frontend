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
  reducers: {},
});

export const {} = chatRoomSlice.actions;

export default chatRoomSlice.reducer;
