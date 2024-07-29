import { useSelectedChatDispatch } from "@/hooks/AppDispatcher/useSelectedChatDispatch";
import { IChatRoom } from "@/schema/ChatRoomSchema";
import React from "react";

const ChatRoom = ({ chatRoom }: { chatRoom: IChatRoom }) => {
  const selectChatDispatch = useSelectedChatDispatch();
  return (
    <div
      className="p-10"
      onClick={() => selectChatDispatch.setSelectedChat(chatRoom.chatRoomId)}
    >
      ChatRoom {chatRoom.chatRoomId}
    </div>
  );
};

export default ChatRoom;
