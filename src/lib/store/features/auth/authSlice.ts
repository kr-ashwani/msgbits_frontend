import { IUser } from "@/schema/userSchema";
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
  },
});

// Action creators are generated for each case reducer function
export const { setUser, resetUser, setAuthPreflightCompleted } =
  authSlice.actions;

export default authSlice.reducer;
