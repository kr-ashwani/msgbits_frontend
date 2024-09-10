import { useEffect } from "react";
import { useMessageDispatch } from "./AppDispatcher/useMessageDispatch";
import { useChatRoomDispatch } from "./AppDispatcher/useChatRoomDispatch";
import { useSocket } from "./useSocket";
import { useChatUserDispatch } from "./AppDispatcher/useChatUserDispatch";
import { useSocketSyncService } from "./useSocketSyncService";

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
    const unsubListeners = [
      // Listening to all message events
      socket.on("message-create", messageDispatch.createMessage),
      // Listening to all chatRoom events
      socket.on("chatroom-create", chatRoomDispatch.createChatRoom),
      // Listening to all chatUser events
      socket.on("chatuser-create", chatUserDispatch.createChatUser),
      //Listening to Sync Service
      socket.on("sync-update", socketSyncService.listenForSyncInitiator),
      socket.on("sync-updateChatRoom:Messages:ChatUsers", (payload) => {
        //dispatch chatRoom, messages and chatUser
        chatRoomDispatch.setChatRooms(payload.chatRoom);
        messageDispatch.setMessagesOfChatRoom(payload.message);
        chatUserDispatch.getAllChatUser(payload.chatUser);
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
