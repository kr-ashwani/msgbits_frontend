import { setChatInputMessage } from "@/lib/store/features/chat/chatRoomDataSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useEffect, useRef } from "react";

export const useCacheInputMessage = (message: string) => {
  const cacheMessageInput = useRef({
    message: "",
    chatRoomId: "",
    repliedTo: null,
  });
  const selectedChat = useAppSelector((state) => state.chat.selectedChat);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!selectedChat.id) return;
    const cacheInput = cacheMessageInput.current;

    if (cacheInput.chatRoomId && cacheInput.chatRoomId !== selectedChat.id) {
      dispatch(setChatInputMessage(cacheInput));
      cacheMessageInput.current.chatRoomId = selectedChat.id;
      cacheMessageInput.current.chatRoomId = "";
    } else {
      cacheMessageInput.current.chatRoomId = selectedChat.id;
      cacheMessageInput.current.message = message;
    }
  }, [message, selectedChat, dispatch]);

  return null;
};
