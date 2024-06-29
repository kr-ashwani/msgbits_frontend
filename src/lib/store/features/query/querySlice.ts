import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface QueryState {
  email: string;
  httpRedirect: string;
}

const initialState: QueryState = {
  email: "",
  httpRedirect: "",
};

export const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setQueryEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setQueryHttpRedirect(state, action: PayloadAction<string>) {
      state.httpRedirect = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setQueryEmail, setQueryHttpRedirect } = querySlice.actions;

export default querySlice.reducer;
