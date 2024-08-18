"use client";

import { useChatRoomState } from "@/hooks/AppSelector/useChatRoomState";
import ChatRoom from "./ChatRoom";
import ChatRoomAddButton from "./ChatRoomAddButton";

const ChatRoomContainer = () => {
  const chatRoomState = useChatRoomState();

  return (
    <section
      id="chatRoomContainer"
      className="relative flex h-full w-full flex-col bg-[--theme-bg-color] p-2"
    >
      {chatRoomState.getChatRooms().map((chatRoomState) => (
        <ChatRoom
          key={chatRoomState.chatRoomId}
          chatRoomState={chatRoomState}
        />
      ))}
      <ChatRoomAddButton />
    </section>
  );
};

export default ChatRoomContainer;
