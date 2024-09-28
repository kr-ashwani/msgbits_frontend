import { IUser } from "@/schema/userSchema";
import { UserUpdateProfile } from "@/schema/UserUpdateProfileSchema";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: null | IUser;
  isAuthPreflightCompleted: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthPreflightCompleted: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.isAuthPreflightCompleted = true;
      state.user = action.payload;
    },
    resetUser(state) {
      state.user = null;
    },
    setAuthPreflightCompleted(state, action: PayloadAction<true>) {
      state.isAuthPreflightCompleted = action.payload;
    },
    updateAuthUserProfile(state, action: PayloadAction<UserUpdateProfile>) {
      if (!state.user) return;
      if (state.user._id !== action.payload.userId) return;

      if (action.payload.updatedProfilePicture)
        state.user.profilePicture = action.payload.updatedProfilePicture;
      if (action.payload.updatedName)
        state.user.name = action.payload.updatedName;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUser,
  resetUser,
  setAuthPreflightCompleted,
  updateAuthUserProfile,
} = authSlice.actions;

export default authSlice.reducer;
