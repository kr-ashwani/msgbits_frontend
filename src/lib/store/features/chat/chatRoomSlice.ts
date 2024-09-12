import { ChatAddNewMember } from "./../../../../schema/ChatAddNewMemberSchema";
import { IChatRoom } from "@/schema/ChatRoomSchema";
import { IMessage } from "@/schema/MessageSchema";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface chatRoomState {
  [p: string]: IChatRoom;
}
const initialState: chatRoomState = {};

export const chatRoomSlice = createSlice({
  name: "Chat Room",
  initialState,
  reducers: {
    addChatRoom(state, action: PayloadAction<IChatRoom | IChatRoom[]>) {
      if (Array.isArray(action.payload)) {
        action.payload.forEach(
          (chatroom) => (state[chatroom.chatRoomId] = chatroom),
        );
      } else {
        state[action.payload.chatRoomId] = action.payload;
      }
    },
    updateLastMessageIdOfChatRoom(state, action: PayloadAction<IMessage>) {
      const chatRoom = state[action.payload.chatRoomId];
      if (chatRoom) {
        chatRoom.lastMessageId = action.payload.messageId;
        // since chatroom is updating. so, we must update updateAt field
        chatRoom.updatedAt = action.payload.updatedAt;
      }
    },
    addNewMembers(state, action: PayloadAction<ChatAddNewMember>) {
      const chatRoom = state[action.payload.chatRoomId];
      if (!chatRoom) return;
      action.payload.newMember.forEach((membId) => {
        if (!chatRoom.members.includes(membId)) chatRoom.members.push(membId);
      });
    },
  },
});

export const { addChatRoom, updateLastMessageIdOfChatRoom, addNewMembers } =
  chatRoomSlice.actions;

export default chatRoomSlice.reducer;
