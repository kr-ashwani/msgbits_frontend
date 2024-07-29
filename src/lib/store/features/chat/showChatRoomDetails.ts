import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: boolean = false;

export const showChatRoomDetailsSlice = createSlice({
  name: "show chatroom details",
  initialState,
  reducers: {
    showChatRoomDetails(state, action: PayloadAction<boolean>) {
      return action.payload;
    },
  },
});

export const { showChatRoomDetails } = showChatRoomDetailsSlice.actions;

export default showChatRoomDetailsSlice.reducer;
