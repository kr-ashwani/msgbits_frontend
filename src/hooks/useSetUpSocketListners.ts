import { useEffect } from "react";
import { useMessageDispatch } from "./AppDispatcher/useMessageDispatch";
import { useChatRoomDispatch } from "./AppDispatcher/useChatRoomDispatch";
import { useSocket } from "./useSocket";
import { useChatUserDispatch } from "./AppDispatcher/useChatUserDispatch";
import { useSocketSyncService } from "./useSocketSyncService";
import { useSocketEmiterService } from "./useSocketEmiterService";
import { IMessage } from "@/schema/MessageSchema";
import { useUpdateSocketLastDisconnect } from "./useUpdateSocketLastDisconnect";

/**
 * All socket listeners for the App must be registered here
 */
export const useSetUpSocketListners = () => {
  useUpdateSocketLastDisconnect();
  const { socket } = useSocket();
  const messageDispatch = useMessageDispatch();
  const chatRoomDispatch = useChatRoomDispatch();
  const chatUserDispatch = useChatUserDispatch();
  const socketSyncService = useSocketSyncService();
  const socketService = useSocketEmiterService();

  useEffect(() => {
    const unsubListeners = [
      // Listening to all message events
      socket.on("message-create", (payload) => {
        messageDispatch.createMessage(payload);
        socketService.updateMsgStatus("delivered", payload);
      }),
      socket.on("message-delivered", messageDispatch.updateDeliveredTo),
      socket.on("message-seen", messageDispatch.updateSeenBy),
      socket.on("message-sent", messageDispatch.updateMsgSent),
      // Listening to all chatRoom events
      socket.on("chatroom-create", chatRoomDispatch.createChatRoom),
      socket.on("chatroom-addNewMembers", chatRoomDispatch.addNewMembers),
      socket.on("chatroom-leave", chatRoomDispatch.exitChatRoom),
      // Listening to all chatUser events
      socket.on("chatuser-create", chatUserDispatch.createChatUser),
      //Listening to Sync Service
      socket.on("sync-update", socketSyncService.listenForSyncInitiator),
      socket.on("sync-updateChatRoom:Messages:ChatUsers", (payload) => {
        //dispatch chatRoom, messages and chatUser
        chatRoomDispatch.setChatRooms(payload.chatRoom);
        messageDispatch.setMessagesOfChatRoom(payload.message);
        const totalMsg: IMessage[] = [];
        Object.values(payload.message).forEach((msgArr) =>
          totalMsg.push(...msgArr),
        );

        socketService.updateMsgStatus("delivered", totalMsg);
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
    socketService,
  ]);
};
