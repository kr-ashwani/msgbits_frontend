"use client";
import ChatRoomContainer from "@/components/chat/ChatRoomContainer";
import ChatRoomDetails from "@/components/chat/ChatRoomDetails";
import ChatRoomMessages from "@/components/chat/ChatRoomMessages";
import useChatStyle from "@/hooks/useChatStyle";
import { useSetUpSocketListners } from "@/hooks/useSetUpSocketListners";
import { Dispatch, SetStateAction, useRef, useState } from "react";

export interface DisplayComponent {
  setShowchatRoomMessages: Dispatch<SetStateAction<boolean>> | null;
  setShowchatRoomDetails: Dispatch<SetStateAction<boolean>> | null;
}

const Chat = () => {
  useChatStyle();
  useSetUpSocketListners();
  const displayComponent = useRef<DisplayComponent>({
    setShowchatRoomDetails: null,
    setShowchatRoomMessages: null,
  });
  const [showChatRoomDetail, setShowChatRoomDetail] = useState(false);

  return (
    <main
      className={`relative grid h-svh w-full grid-cols-1 overflow-hidden text-white md:grid-cols-[var(--chatRoomContainer-width)_1fr] lg:transition-all ${showChatRoomDetail ? "lg:grid-cols-[var(--chatRoomContainer-width)_1fr_var(--chatRoomDetail-width)]" : "lg:grid-cols-[var(--chatRoomContainer-width)_1fr_0]"}`}
    >
      <ChatRoomContainer displayComponent={displayComponent.current} />
      <ChatRoomMessages
        displayComponent={displayComponent.current}
        setShowChatRoomDetail={setShowChatRoomDetail}
      />
      <ChatRoomDetails
        displayComponent={displayComponent.current}
        setShowChatRoomDetail={setShowChatRoomDetail}
      />
    </main>
  );
};

export default Chat;
