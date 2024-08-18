"use client";

import { useChatRoomState } from "@/hooks/AppSelector/useChatRoomState";

import { useMemo } from "react";
import ChatRoom from "./ChatRoom";

const ChatRoomContainer = () => {
  const chatRoomState = useChatRoomState();

  const chatRoomList = useMemo(() => {
    const list = chatRoomState.getChatRooms();
    return list;
  }, [chatRoomState]);

  return (
    <section
      id="chatRoomContainer"
      className="relative flex w-full flex-col bg-[--theme-bg-color]"
    >
      {chatRoomList.map((chatRoomState, index) => (
        <ChatRoom
          index={index}
          key={chatRoomState.chatRoomId}
          chatRoomState={chatRoomState}
        />
      ))}
      <div
        className={`absolute h-chatRoom-height w-full shrink-0`}
        style={{
          transform: `translateY(calc(${chatRoomList.length} * var(--chatRoom-height)))`,
        }}
      ></div>
    </section>
  );
};

export default ChatRoomContainer;
