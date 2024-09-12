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
    addMessageMapping(state, action: PayloadAction<IMessage>) {
      const msg = action.payload;
      const msgMapping = state[msg.chatRoomId];
      if (msgMapping) {
        if (!msgMapping.includes(msg.messageId)) msgMapping.push(msg.messageId);
      } else state[msg.chatRoomId] = [msg.messageId];
    },
    addMessageMappingOfChatRoom(
      state,
      action: PayloadAction<Record<string, IMessage[]>>,
    ) {
      Object.values(action.payload).forEach((msgArr) => {
        msgArr.forEach((msg) => {
          const msgMapping = state[msg.chatRoomId];
          if (msgMapping) {
            if (!msgMapping.includes(msg.messageId))
              msgMapping.push(msg.messageId);
          } else state[msg.chatRoomId] = [msg.messageId];
        });
      });
    },
  },
});

export const { addMessageMappingOfChatRoom, addMessageMapping } =
  chatRoomToMessageMapSlice.actions;

export default chatRoomToMessageMapSlice.reducer;
