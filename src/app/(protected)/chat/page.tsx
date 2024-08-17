"use client";
import ChatRoomContainer from "@/components/chat/ChatRoomContainer";
import ChatRoomDetails from "@/components/chat/ChatRoomDetails";
import ChatRoomMessages from "@/components/chat/ChatRoomMessages";
import useChatStyle from "@/hooks/useChatStyle";
import { useSetUpSocketListners } from "@/hooks/useSetUpSocketListners";

const Chat = () => {
  useChatStyle();
  useSetUpSocketListners();

  return (
    <main
      id="chat"
      className={`relative grid h-full w-full grid-cols-1 overflow-hidden font-manrope md:grid-cols-[var(--chatRoomContainer-width)_1fr] md:divide-x-[1px] md:divide-[--border-color] lg:transition-all`}
    >
      <ChatRoomContainer />
      <ChatRoomMessages />
      <ChatRoomDetails />
    </main>
  );
};

export default Chat;
