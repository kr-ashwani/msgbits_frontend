import { useEffect } from "react";
import { useMessageDispatch } from "./AppDispatcher/useMessageDispatch";
import { useChatRoomDispatch } from "./AppDispatcher/useChatRoomDispatch";
import { useSocket } from "./useSocket";

/**
 * All socket listeners for the App must be registered here
 */
export const useSetUpSocketListners = () => {
  const socket = useSocket();
  const messageDispatch = useMessageDispatch();
  const chatRoomDispatch = useChatRoomDispatch();
  useEffect(() => {
    //message listeners
    socket.on("message-create", messageDispatch.createMessage);
    socket.on("message-create", messageDispatch.updateMessage);
    socket.on("message-chatroom", messageDispatch.getAllMessageOfChatRoom);

    //chatroom listeners
    socket.on("chatroom-create", chatRoomDispatch.createChatRoom);
    socket.on("chatroom-update", chatRoomDispatch.updateChatRoom);
    socket.on("chatroom-getall", chatRoomDispatch.getAllChatRoom);

    return () => {
      //message listeners
      socket.off("message-create", messageDispatch.createMessage);
      socket.off("message-create", messageDispatch.updateMessage);
      socket.off("message-chatroom", messageDispatch.getAllMessageOfChatRoom);
      //chatroom listeners
      socket.off("chatroom-create", chatRoomDispatch.createChatRoom);
      socket.off("chatroom-update", chatRoomDispatch.updateChatRoom);
      socket.off("chatroom-getall", chatRoomDispatch.getAllChatRoom);
    };
  }, [messageDispatch, chatRoomDispatch, socket]);
};
