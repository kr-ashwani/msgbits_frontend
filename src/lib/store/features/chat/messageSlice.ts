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
  reducers: {},
});

export const {} = messageSlice.actions;

export default messageSlice.reducer;
