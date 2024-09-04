import { IMessage } from "@/schema/MessageSchema";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface chatRoomToMessageMapState {
  [p: string]: [string];
}
const initialState: chatRoomToMessageMapState = {};

export const chatRoomToMessageMapSlice = createSlice({
  name: "Chat Room To Message Mapping",
  initialState,
  reducers: {
    addMessageMappingOfChatRoom(
      state,
      action: PayloadAction<Record<string, IMessage[]>>,
    ) {
      Object.values(action.payload).forEach((msgArr) => {
        msgArr.forEach((msg) =>
          state[msg.chatRoomId] &&
          !state[msg.chatRoomId].includes(msg.messageId)
            ? state[msg.chatRoomId].push(msg.messageId)
            : (state[msg.chatRoomId] = [msg.messageId]),
        );
      });
    },
  },
});

export const { addMessageMappingOfChatRoom } =
  chatRoomToMessageMapSlice.actions;

export default chatRoomToMessageMapSlice.reducer;
