import { ChatRoomAndMember } from "@/schema/ChatRoomAndMemberSchema";
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
    exitChatRoom(state, action: PayloadAction<ChatRoomAndMember>) {
      const chatRoom = state[action.payload.chatRoomId];
      if (!chatRoom) return;

      // Remove the memberId from the members array
      chatRoom.members = chatRoom.members.filter(
        (id) => id !== action.payload.memberId,
      );

      // Remove the memberId from the admin array for group chat
      if (chatRoom.type === "group")
        chatRoom.admins = chatRoom.admins.filter(
          (id) => id !== action.payload.memberId,
        );

      // deleting chatRoom if no members left
      if (chatRoom.members.length === 0) {
        delete state[chatRoom.chatRoomId];
      }
    },
    chatRoomMakeAdmin(state, action: PayloadAction<ChatRoomAndMember>) {
      const chatRoom = state[action.payload.chatRoomId];
      if (!chatRoom || chatRoom.type === "private") return;

      // Add the memberId in admin array
      if (!chatRoom.admins.includes(action.payload.memberId))
        chatRoom.admins.push(action.payload.memberId);
    },
    chatRoomRemoveAdmin(state, action: PayloadAction<ChatRoomAndMember>) {
      const chatRoom = state[action.payload.chatRoomId];
      if (!chatRoom || chatRoom.type === "private") return;

      // Remove the memberId from the admin array
      chatRoom.admins = chatRoom.admins.filter(
        (id) => id !== action.payload.memberId,
      );
    },
  },
});

export const {
  addChatRoom,
  updateLastMessageIdOfChatRoom,
  addNewMembers,
  exitChatRoom,
  chatRoomMakeAdmin,
  chatRoomRemoveAdmin,
} = chatRoomSlice.actions;

export default chatRoomSlice.reducer;
