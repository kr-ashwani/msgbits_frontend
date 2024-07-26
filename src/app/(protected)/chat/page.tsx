"use client";
import ChatRoomContainer from "@/components/chat/ChatRoomContainer";
import ChatRoomDetails from "@/components/chat/ChatRoomDetails";
import ChatRoomMessages from "@/components/chat/ChatRoomMessages";
import useChatStyle from "@/hooks/useChatStyle";
import { useSetUpSocketListners } from "@/hooks/useSetUpSocketListners";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

export interface DisplayComponent {
  chatRoomMessages: Dispatch<SetStateAction<boolean>> | null;
  chatRoomDetails: Dispatch<SetStateAction<boolean>> | null;
}

const Chat = () => {
  useChatStyle();
  useSetUpSocketListners();
  const displayComponent = useRef<DisplayComponent>({
    chatRoomMessages: null,
    chatRoomDetails: null,
  });

  return (
    <main className="relative h-svh w-full grid-cols-1 overflow-hidden text-white">
      <ChatRoomContainer displayComponent={displayComponent} />
      <ChatRoomMessages displayComponent={displayComponent} />
      <ChatRoomDetails displayComponent={displayComponent} />
    </main>
  );
};

export default Chat;
