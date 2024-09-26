import { combineReducers, createAction, UnknownAction } from "@reduxjs/toolkit";
import chatRoomReducer from "./chatRoomSlice";
import chatRoomToMessageMapReducer from "./chatRoomToMessageMapSlice";
import messageReducer from "./messageSlice";
import selectedChatReducer from "./selectedChatSlice";
import chatUserReducer from "./chatUserSlice";
import showChatRoomDetailsReducer from "./showChatRoomDetails";
import socketReducer from "../socket/socketSlice";
import chatRoomDataReducer from "./chatRoomDataSlice";
import settingReducer from "./settingSlice";

export const resetChatData = createAction("chat/resetAll");

const chatReducer = combineReducers({
  chatRoom: chatRoomReducer,
  message: messageReducer,
  chatRoomToMessageMap: chatRoomToMessageMapReducer,
  selectedChat: selectedChatReducer,
  chatUser: chatUserReducer,
  showChatRoomDetails: showChatRoomDetailsReducer,
  socket: socketReducer,
  chatRoomData: chatRoomDataReducer,
  setting: settingReducer,
});

export type RootState = ReturnType<typeof chatReducer>;

const rootReducerWithReset = (
  state: RootState | undefined,
  action: UnknownAction,
): RootState => {
  if (action.type === resetChatData.type) {
    // Reset all slices to their initial states
    return chatReducer(undefined, action);
  }
  return chatReducer(state, action);
};

export default rootReducerWithReset;
