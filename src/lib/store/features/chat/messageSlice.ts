import { IMessage } from "@/schema/MessageSchema";
import { MessageStatus } from "@/schema/MessageStatusSchema";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface messageState {
  [p: string]: IMessage;
}
const initialState: messageState = {};

export const messageSlice = createSlice({
  name: "Message",
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<IMessage>) {
      state[action.payload.messageId] = action.payload;
    },

    addMessageOfChatRoom(
      state,
      action: PayloadAction<Record<string, IMessage[]>>,
    ) {
      Object.values(action.payload).forEach((msgArr) => {
        msgArr.forEach((msg) => (state[msg.messageId] = msg));
      });
    },

    updateDeliveredTo(state, action: PayloadAction<MessageStatus>) {
      const { messageIds, userId } = action.payload;
      messageIds.forEach((messageId) => {
        const message = state[messageId];
        if (
          !message ||
          message.senderId === userId ||
          message.deliveredTo.includes(userId)
        )
          return;
        message.deliveredTo.push(userId);
      });
    },
    updateSeenBy(state, action: PayloadAction<MessageStatus>) {
      const { messageIds, userId } = action.payload;
      messageIds.forEach((messageId) => {
        const message = state[messageId];
        if (
          !message ||
          message.senderId === userId ||
          message.seenBy.includes(userId)
        )
          return;
        message.seenBy.push(userId);
      });
    },
    updateMsgSent(state, action: PayloadAction<string>) {
      const message = state[action.payload];
      if (message) message.status = "sent";
    },
  },
});

export const {
  addMessageOfChatRoom,
  addMessage,
  updateDeliveredTo,
  updateSeenBy,
  updateMsgSent,
} = messageSlice.actions;

export default messageSlice.reducer;
