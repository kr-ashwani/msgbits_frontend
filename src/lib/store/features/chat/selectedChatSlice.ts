import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: string | null = null;

export const selectedChatSlice = createSlice({
  name: "Selected Chat",
  initialState,
  reducers: {},
});

export const {} = selectedChatSlice.actions;

export default selectedChatSlice.reducer;
