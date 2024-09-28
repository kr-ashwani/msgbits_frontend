import { IChatUser } from "@/schema/ChatUserSchema";
import { UserUpdateProfile } from "@/schema/UserUpdateProfileSchema";
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
    updateUserProfile(state, action: PayloadAction<UserUpdateProfile>) {
      const user = state[action.payload.userId];
      if (!user) return;

      if (action.payload.updatedProfilePicture)
        user.profilePicture = action.payload.updatedProfilePicture;
      if (action.payload.updatedName) user.name = action.payload.updatedName;
    },
  },
});

export const { addChatUser, updateUserProfile } = chatUserSlice.actions;

export default chatUserSlice.reducer;
