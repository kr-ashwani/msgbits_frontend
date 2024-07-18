import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface chatRoomState {
  [p: string]: [string];
}
const initialState: chatRoomState = {};

export const chatRoomToMessageMapSlice = createSlice({
  name: "Chat Room To Message Mapping",
  initialState,
  reducers: {},
});

export const {} = chatRoomToMessageMapSlice.actions;

export default chatRoomToMessageMapSlice.reducer;
