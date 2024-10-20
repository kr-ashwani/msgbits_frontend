import { ChatRoomAndMember } from "@/schema/ChatRoomAndMemberSchema";
import { IMessage } from "@/schema/MessageSchema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type typingStatusState = {
  [p in string]: string | null;
};
export type chatInputMessageState = {
  [p in string]: {
    message: string;
    repliedTo: string | null;
  };
};
export type unreadMessagesState = {
  [p in string]: number;
};
export type userOnlineStatusState = {
  [p in string]: boolean;
};
export type repliedToMessageState = {
  [p in string]: string;
};
export type newGroupMembersState = string[];
export interface ImagePreview {
  url: string;
  fileId: string;
}
export interface ImagePreviewState {
  images: ImagePreview[];
  initialImageCursor: number;
}

export interface chatRoomDataState {
  chatInputMessage: chatInputMessageState;
  typingStatus: typingStatusState;
  newGroupMembers: newGroupMembersState;
  unreadMessages: unreadMessagesState;
  userOnlineStatus: userOnlineStatusState;
  repliedToMessage: repliedToMessageState;
  isInFilePreviewMode: boolean;
  showFileDiscardDialog: boolean;
  imagePreview: ImagePreviewState;
}
const initialState: chatRoomDataState = {
  chatInputMessage: {},
  typingStatus: {},
  newGroupMembers: [],
  unreadMessages: {},
  userOnlineStatus: {},
  repliedToMessage: {},
  isInFilePreviewMode: false,
  showFileDiscardDialog: false,
  imagePreview: { images: [], initialImageCursor: 0 },
};

export const chatRoomDataSlice = createSlice({
  name: "Chat Room Data",
  initialState,
  reducers: {
    addNewGroupMembers(state, action: PayloadAction<string[]>) {
      action.payload.forEach((member) => {
        if (!state.newGroupMembers.includes(member))
          state.newGroupMembers.push(member);
      });
    },
    resetNewGroupMembers(state, action: PayloadAction<void>) {
      state.newGroupMembers = [];
    },
    changeTypingStatus(state, action: PayloadAction<ChatRoomAndMember>) {
      state.typingStatus[action.payload.chatRoomId] = action.payload.memberId;
    },
    resetTypingStatus(state, action: PayloadAction<{ chatRoomId: string }>) {
      state.typingStatus[action.payload.chatRoomId] = null;
    },
    setChatInputMessage(
      state,
      action: PayloadAction<{
        chatRoomId: string;
        message: string;
        repliedTo: string | null;
      }>,
    ) {
      const { message, repliedTo } = action.payload;
      state.chatInputMessage[action.payload.chatRoomId] = {
        message,
        repliedTo,
      };
    },
    setUnreadMessages(
      state,
      action: PayloadAction<{
        chatRoomMessages: {
          [p in string]: IMessage[] | IMessage;
        };
        userId: string;
      }>,
    ) {
      Object.entries(action.payload.chatRoomMessages).forEach(
        ([chatRoomId, message]) => {
          const userId = action.payload.userId;
          const msgArr: IMessage[] = Array.isArray(message)
            ? message
            : [message];

          // start iterating from end to get unread Messages
          for (let i = msgArr.length - 1; i >= 0; i--) {
            const msg = msgArr[i];
            // if it's user itself message then exit
            if (msg.senderId === userId) break;
            // if message is already seen by user then also exit
            else if (msg.seenBy.includes(userId)) break;
            // if message is of info type then don't do anything
            else if (msg.type === "info") continue;
            // user hasn't seen the message so mark it
            else
              state.unreadMessages[msg.chatRoomId] =
                (state.unreadMessages[msg.chatRoomId] ?? 0) + 1;
          }
        },
      );
    },
    resetUnreadMessages(
      state,
      action: PayloadAction<{
        chatRoomId: string;
      }>,
    ) {
      state.unreadMessages[action.payload.chatRoomId] = 0;
    },

    setOnlineStatus(
      state,
      action: PayloadAction<{
        userId: string | string[];
        status: "online" | "offline";
      }>,
    ) {
      const userId = action.payload.userId;
      const status = action.payload.status;
      const userIds = Array.isArray(userId) ? userId : [userId];

      userIds.forEach((id) => {
        state.userOnlineStatus[id] = status === "online" ? true : false;
      });
    },
    setRepliedToMessage(
      state,
      action: PayloadAction<{
        chatRoomId: string;
        messageId: string;
      }>,
    ) {
      state.repliedToMessage[action.payload.chatRoomId] =
        action.payload.messageId;
    },
    resetRepliedToMessage(
      state,
      action: PayloadAction<{
        chatRoomId: string;
      }>,
    ) {
      delete state.repliedToMessage[action.payload.chatRoomId];
    },
    setFilePreviewMode(state, action: PayloadAction<boolean>) {
      state.isInFilePreviewMode = action.payload;
    },

    setShowFileDiscardDialog(state, action: PayloadAction<boolean>) {
      state.showFileDiscardDialog = action.payload;
    },
    addImagePreview(state, action: PayloadAction<ImagePreviewState>) {
      state.imagePreview = action.payload;
    },
    resetImagePreview(state, action: PayloadAction<void>) {
      state.imagePreview = {
        images: [],
        initialImageCursor: 0,
      };
    },
  },
});

export const {
  addNewGroupMembers,
  resetNewGroupMembers,
  changeTypingStatus,
  resetTypingStatus,
  setChatInputMessage,
  setUnreadMessages,
  resetUnreadMessages,
  setOnlineStatus,
  setRepliedToMessage,
  resetRepliedToMessage,
  setFilePreviewMode,
  setShowFileDiscardDialog,
  addImagePreview,
  resetImagePreview,
} = chatRoomDataSlice.actions;

export default chatRoomDataSlice.reducer;
