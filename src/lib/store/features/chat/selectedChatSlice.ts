import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type SelectedChatState = string | null;

const initialState: SelectedChatState = "";

export const selectedChatSlice = createSlice({
  name: "Selected Chat",
  initialState,
  reducers: {
    setSelectedChatId(state, action: PayloadAction<string | null>) {
      return action.payload;
    },
  },
});

export const { setSelectedChatId } = selectedChatSlice.actions;

export default selectedChatSlice.reducer;
