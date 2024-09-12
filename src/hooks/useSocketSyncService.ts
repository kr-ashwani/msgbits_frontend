import { useMemo } from "react";
import { useSocket } from "./useSocket";
import { SocketEmitterQueue } from "@/service/socketQueue/SocketEmitterQueue";
import { useAppSelector } from "@/lib/store/hooks";
import { messageState } from "@/lib/store/features/chat/messageSlice";
import {
  ChatRoomContainerState,
  useChatRoomState,
} from "./AppSelector/useChatRoomState";
import {
  ChatUserState,
  useChatUserState,
} from "./AppSelector/useChatUserState";
import { socketState } from "@/lib/store/features/socket/socketSlice";

export type SyncUpdateInput = {
  chatRoom: {
    [p in string]: {
      lastMessageTimestamp: string | null;
      lastUpdateTimestamp: string;
    };
  };
  lastChatUserCreatedAt: string | null;
  socketLastDisconnectedAt: string | null;
};

class SocketSyncService {
  private socketQueue: SocketEmitterQueue;
  private chatRoomContainer: ChatRoomContainerState;
  private messageState: messageState;
  private chatUserState: ChatUserState;
  private socketState: socketState;

  constructor(
    socketQueue: SocketEmitterQueue,
    chatRoomContainer: ChatRoomContainerState,
    messageState: messageState,
    chatUserState: ChatUserState,
    socketState: socketState,
  ) {
    this.socketQueue = socketQueue;
    this.chatRoomContainer = chatRoomContainer;
    this.messageState = messageState;
    this.chatUserState = chatUserState;
    this.socketState = socketState;
  }

  listenForSyncInitiator = (payload: string) => {
    const syncUpdate: SyncUpdateInput = {
      chatRoom: {},
      lastChatUserCreatedAt:
        this.chatUserState.getLatestUserCreationTimestamp(),
      socketLastDisconnectedAt: this.socketState.socketLastDisconnectedAt,
    };

    this.chatRoomContainer.getChatRooms().forEach((chatRoomState) => {
      const lastMessageId = chatRoomState.getLastMessageId();
      const lastMessageTimestamp = lastMessageId
        ? this.messageState[lastMessageId]?.updatedAt || null
        : null;

      syncUpdate.chatRoom[chatRoomState.chatRoomId] = {
        lastUpdateTimestamp: chatRoomState.getRawChatRoom()?.updatedAt || "",
        lastMessageTimestamp,
      };
    });

    this.socketQueue.emit("sync-updateChatRoom:Messages:ChatUsers", syncUpdate);
  };
}

export const useSocketSyncService = () => {
  const { socketQueue } = useSocket();
  const chatRoomContainer = useChatRoomState();
  const messageState = useAppSelector((state) => state.chat.message);
  const chatUserState = useChatUserState();
  const socketState = useAppSelector((state) => state.chat.socket);

  const socketSyncService = useMemo(
    () =>
      new SocketSyncService(
        socketQueue,
        chatRoomContainer,
        messageState,
        chatUserState,
        socketState,
      ),
    [socketQueue, chatRoomContainer, messageState, chatUserState, socketState],
  );

  return socketSyncService;
};
