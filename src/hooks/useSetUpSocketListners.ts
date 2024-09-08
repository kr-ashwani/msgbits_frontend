import { useEffect } from "react";
import { useMessageDispatch } from "./AppDispatcher/useMessageDispatch";
import { useChatRoomDispatch } from "./AppDispatcher/useChatRoomDispatch";
import { useSocket } from "./useSocket";
import { useChatUserDispatch } from "./AppDispatcher/useChatUserDispatch";
import { useSocketSyncService } from "./useSocketSyncService";
import { IMessage } from "@/schema/MessageSchema";

/**
 * All socket listeners for the App must be registered here
 */
export const useSetUpSocketListners = () => {
  const { socket, socketQueue } = useSocket();
  const messageDispatch = useMessageDispatch();
  const chatRoomDispatch = useChatRoomDispatch();
  const chatUserDispatch = useChatUserDispatch();
  const socketSyncService = useSocketSyncService();

  useEffect(() => {
    socketQueue.emitChatRoom("chatroom-op", "Hi from chat room");
  }, [socketQueue]);

  useEffect(() => {
    const unsubListeners = [
      // Listening to all message events
      socket.on("message-create", messageDispatch.createMessage),
      socket.on("message-update", messageDispatch.createMessage),
      socket.on("message-chatroom", messageDispatch.getAllMessageOfChatRoom),
      // Listening to all chatRoom events
      socket.on("chatroom-create", chatRoomDispatch.createChatRoom),
      socket.on("chatroom-update", chatRoomDispatch.updateChatRoom),
      socket.on("chatroom-getall", chatRoomDispatch.getAllChatRoom),
      // Listening to all chatUser events
      socket.on("chatuser-create", chatUserDispatch.createChatUser),
      socket.on("chatuser-update", chatUserDispatch.updateChatUser),
      socket.on("chatuser-getall", chatUserDispatch.getAllChatUser),
      //Listening to Sync Service
      socket.on("sync-update", (payload) => {
        console.log(payload);
        socketSyncService.listenForSyncInitiator();
      }),
      socket.on("sync-updateChatRoomAndMessages", (payload) => {
        console.log(payload);
        chatRoomDispatch.getAllChatRoom(payload.chatRoom);
        messageDispatch.getAllMessageOfChatRoom(payload.message);
      }),
    ];

    return () => {
      // performing cleanup
      unsubListeners.forEach(({ event, eventHandler }) => {
        socket.off(event, eventHandler);
      });
    };
  }, [
    messageDispatch,
    chatRoomDispatch,
    chatUserDispatch,
    socket,
    socketSyncService,
  ]);
};
