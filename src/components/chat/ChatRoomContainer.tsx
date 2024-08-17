"use client";

import { useChatRoomState } from "@/hooks/AppSelector/useChatRoomState";
import ChatRoom from "./ChatRoom";

const ChatRoomContainer = () => {
  const chatRoom = useChatRoomState();
  console.log("chatRoomContainer");
  return (
    <section
      id="chatRoomContainer"
      className="h-full w-full bg-[--theme-bg-color]"
    >
      <p>Chat Room Container</p>
      {chatRoom.getChatRooms().map((chatRoom) => (
        <ChatRoom key={chatRoom.chatRoomId} chatRoom={chatRoom} />
      ))}
    </section>
  );
};

export default ChatRoomContainer;
