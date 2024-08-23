"use client";
import { useSelectedChatDispatch } from "@/hooks/AppDispatcher/useSelectedChatDispatch";
import { useShowChatRoomDetailsDispatch } from "@/hooks/AppDispatcher/useShowChatRoomDetailsDispatch";
import { useSelectedChatState } from "@/hooks/AppSelector/useSelectedChatState";
import { useRightSwipeToggle } from "@/hooks/useRightSwipeToggle";
import { useRef } from "react";
import ChatAreaHeader from "./ChatAreaHeader";
import ChatAreaView from "./ChatAreaView";
import ChatAreaFooter from "./ChatAreaFooter";

const ChatRoomMessages = () => {
  const component = useRef<HTMLElement>(null);
  useRightSwipeToggle(component, (state) => {
    if (state) selectedChatDispatch.setSelectedChat(null);
  });
  const selectedChat = useSelectedChatState();
  const selectedChatDispatch = useSelectedChatDispatch();
  const showChatRoomDetailsDispatch = useShowChatRoomDetailsDispatch();

  return (
    <section
      id="chatRoomMessage"
      ref={component}
      className={`absolute inset-0 flex h-full w-full flex-col overflow-y-auto bg-[--theme-bg-color] transition-transform ${selectedChat.getSelectedChatRoom() ? "max-md:translate-x-0" : "max-md:translate-x-full"} md:relative`}
    >
      <ChatAreaHeader />
      <ChatAreaView />
      <ChatAreaFooter />
    </section>
  );
};

export default ChatRoomMessages;
