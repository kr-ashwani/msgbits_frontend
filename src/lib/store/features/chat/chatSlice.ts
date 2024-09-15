import { combineReducers } from "@reduxjs/toolkit";
import chatRoomReducer from "./chatRoomSlice";
import chatRoomToMessageMapReducer from "./chatRoomToMessageMapSlice";
import messageReducer from "./messageSlice";
import selectedChatReducer from "./selectedChatSlice";
import chatUserReducer from "./chatUserSlice";
import showChatRoomDetailsReducer from "./showChatRoomDetails";
import socketReducer from "../socket/socketSlice";
import chatRoomDataReducer from "./chatRoomDataSlice";

const chatReducer = combineReducers({
  chatRoom: chatRoomReducer,
  message: messageReducer,
  chatRoomToMessageMap: chatRoomToMessageMapReducer,
  selectedChat: selectedChatReducer,
  chatUser: chatUserReducer,
  showChatRoomDetails: showChatRoomDetailsReducer,
  socket: socketReducer,
  chatRoomData: chatRoomDataReducer,
});

export default chatReducer;
