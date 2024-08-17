import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type selectedChatState = { id: string | null };

const initialState: selectedChatState = { id: null };

export const selectedChatSlice = createSlice({
  name: "Selected Chat",
  initialState,
  reducers: {
    setSelectedChatId(state, action: PayloadAction<string | null>) {
      state.id = action.payload;
    },
  },
});

export const { setSelectedChatId } = selectedChatSlice.actions;

export default selectedChatSlice.reducer;
