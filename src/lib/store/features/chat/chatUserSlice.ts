import { IChatUser } from "@/schema/ChatUserSchema";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface chatUserState {
  [p: string]: IChatUser;
}
const initialState: chatUserState = {};

export const chatUserSlice = createSlice({
  name: "Chat User",
  initialState,
  reducers: {
    addChatUser(state, action: PayloadAction<IChatUser | IChatUser[]>) {
      if (Array.isArray(action.payload)) {
        action.payload.forEach((user) => (state[user._id] = user));
      } else {
        state[action.payload._id] = action.payload;
      }
    },
  },
});

export const { addChatUser } = chatUserSlice.actions;

export default chatUserSlice.reducer;
