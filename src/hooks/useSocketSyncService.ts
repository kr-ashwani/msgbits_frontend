import { useMemo } from "react";
import { useSocket } from "./useSocket";
import { SocketEmitterQueue } from "@/service/socketQueue/SocketEmitterQueue";
import { useAppSelector } from "@/lib/store/hooks";
import { chatRoomToMessageMapState } from "@/lib/store/features/chat/chatRoomToMessageMapSlice";
import { chatRoomState } from "@/lib/store/features/chat/chatRoomSlice";
import { messageState } from "@/lib/store/features/chat/messageSlice";

export type SyncUpdateInput = {
  [p in string]: {
    lastMessageTimestamp: string | null;
    lastUpdateTimestamp: string;
  };
};

class SocketSyncService {
  private socketQueue: SocketEmitterQueue;
  private chatRoomState: chatRoomState;
  private chatRoomToMessageMapState: chatRoomToMessageMapState;
  private messageState: messageState;

  constructor(
    socketQueue: SocketEmitterQueue,
    chatRoomState: chatRoomState,
    chatRoomToMessageMapState: chatRoomToMessageMapState,
    messageState: messageState,
  ) {
    this.socketQueue = socketQueue;
    this.chatRoomState = chatRoomState;
    this.chatRoomToMessageMapState = chatRoomToMessageMapState;
    this.messageState = messageState;
  }

  listenForSyncInitiator() {
    const chatRoomAndMessagesUpdate: SyncUpdateInput = {};
    Object.values(this.chatRoomState).forEach((chatRoom) => {
      const chatRoomId = chatRoom.chatRoomId;
      const lastUpdateTimestamp = chatRoom.updatedAt;
      const lastMessageId =
        this.chatRoomToMessageMapState[chatRoomId].pop() || null;
      const lastMessageTimestamp = lastMessageId
        ? this.messageState[lastMessageId].updatedAt
        : null;
      chatRoomAndMessagesUpdate[chatRoomId] = {
        lastUpdateTimestamp,
        lastMessageTimestamp,
      };
    });
    this.socketQueue.emit(
      "sync-updateChatRoomAndMessages",
      chatRoomAndMessagesUpdate,
    );
  }
}

export const useSocketSyncService = () => {
  const { socketQueue } = useSocket();
  const chatRoomState = useAppSelector((state) => state.chat.chatRoom);
  const chatRoomToMessageMapState = useAppSelector(
    (state) => state.chat.chatRoomToMessageMap,
  );
  const messageState = useAppSelector((state) => state.chat.message);
  const socketSyncService = useMemo(
    () =>
      new SocketSyncService(
        socketQueue,
        chatRoomState,
        chatRoomToMessageMapState,
        messageState,
      ),
    [socketQueue, chatRoomState, chatRoomToMessageMapState, messageState],
  );

  return socketSyncService;
};
