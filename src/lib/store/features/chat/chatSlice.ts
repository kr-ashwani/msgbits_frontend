import { combineReducers } from "@reduxjs/toolkit";
import chatRoomReducer from "./chatRoomSlice";
import chatRoomToMessageMapReducer from "./chatRoomToMessageMapSlice";
import messageReducer from "./messageSlice";
import selectedChatReducer from "./selectedChatSlice";
import chatUserReducer from "./chatUserSlice";

const chatReducer = combineReducers({
  chatRoom: chatRoomReducer,
  message: messageReducer,
  chatRoomToMessageMap: chatRoomToMessageMapReducer,
  selectedChat: selectedChatReducer,
  chatUser: chatUserReducer,
});

export default chatReducer;
