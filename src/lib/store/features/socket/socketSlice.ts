import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface socketState {
  socketLastDisconnectedAt: string | null;
}
const initialState: socketState = {
  socketLastDisconnectedAt: null,
};

export const socketSlice = createSlice({
  name: "Socket",
  initialState,
  reducers: {
    updateSocketLastDisconectedTime(state, action: PayloadAction<string>) {
      state.socketLastDisconnectedAt = action.payload;
    },
  },
});

export const { updateSocketLastDisconectedTime } = socketSlice.actions;

export default socketSlice.reducer;
