"use client";
import { useSelectedChatDispatch } from "@/hooks/AppDispatcher/useSelectedChatDispatch";
import { useSelectedChatState } from "@/hooks/AppSelector/useSelectedChatState";
import { useRightSwipeToggle } from "@/hooks/useRightSwipeToggle";
import { useEffect, useRef } from "react";
import ChatAreaHeader from "./ChatAreaHeader";
import ChatAreaView from "./ChatAreaView";
import ChatAreaFooter from "./ChatAreaFooter";
import { useChatRoomDataDispatch } from "@/hooks/AppDispatcher/useChatRoomDataDispatch";
import { ImagePreviewProvider } from "@/context/ImagePreviewContext";

const ChatRoomMessages = () => {
  const component = useRef<HTMLElement>(null);
  useRightSwipeToggle(component, (state) => {
    if (state) selectedChatDispatch.setSelectedChat(null);
  });
  const selectedChat = useSelectedChatState();
  const selectedChatDispatch = useSelectedChatDispatch();
  const chatRoomDataDispatch = useChatRoomDataDispatch();

  useEffect(() => {
    const chatRoomId = selectedChat.getSelectedChatId();
    if (chatRoomId)
      chatRoomDataDispatch.resetUnreadMessages({
        chatRoomId,
      });
  }, [selectedChat, chatRoomDataDispatch]);

  return (
    <section
      id="chatRoomMessage"
      ref={component}
      className={`absolute inset-0 flex h-full w-full flex-col overflow-hidden bg-[--theme-bg-color] transition-transform ${selectedChat.getSelectedChatId() ? "max-md:translate-x-0" : "max-md:translate-x-full"} md:relative`}
    >
      <ImagePreviewProvider>
        <ChatAreaHeader />
        <ChatAreaView />
        <ChatAreaFooter />
      </ImagePreviewProvider>
    </section>
  );
};

export default ChatRoomMessages;
