import { useEffect } from "react";
import { useMessageDispatch } from "./AppDispatcher/useMessageDispatch";
import { useChatRoomDispatch } from "./AppDispatcher/useChatRoomDispatch";
import { useSocket } from "./useSocket";
import { ListenerMapping } from "@/socket/socketManager/types";

type EventHandlerPair<K extends string, V> = { event: K; handler: V };
type EventHandlerPairArray<T> = {
  [K in Extract<keyof T, string>]: EventHandlerPair<K, T[K]>;
}[Extract<keyof T, string>];

/**
 * All socket listeners for the App must be registered here
 */
export const useSetUpSocketListners = () => {
  const socket = useSocket();
  const messageDispatch = useMessageDispatch();
  const chatRoomDispatch = useChatRoomDispatch();

  useEffect(() => {
    const eventHandlerMap: EventHandlerPairArray<ListenerMapping>[] = [
      // message listener event
      { event: "message-create", handler: messageDispatch.createMessage },
      { event: "message-update", handler: messageDispatch.updateMessage },
      {
        event: "message-chatroom",
        handler: messageDispatch.getAllMessageOfChatRoom,
      },
      // chatroom listener event
      { event: "chatroom-create", handler: chatRoomDispatch.createChatRoom },
      { event: "chatroom-update", handler: chatRoomDispatch.updateChatRoom },
      { event: "chatroom-getall", handler: chatRoomDispatch.getAllChatRoom },
    ];

    // socket.on will return unsub function
    const unsubMap = eventHandlerMap.map(({ event, handler }) => ({
      event,
      unsub: socket.on(event, handler) || undefined,
    }));

    return () => {
      unsubMap.forEach(({ event, unsub }) => {
        // performing cleanup
        socket.off(event, unsub);
      });
    };
  }, [messageDispatch, chatRoomDispatch, socket]);
};
