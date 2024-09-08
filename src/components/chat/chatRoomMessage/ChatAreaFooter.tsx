import { ChatSvg } from "@/components/svg/chatSvg";
import { MessageSvg } from "@/components/svg/MessageSvg";
import { useSocket } from "@/hooks/useSocket";
import React, { useRef, useState } from "react";
import { useAppSelector } from "@/lib/store/hooks";
import { TextMessage } from "@/chat/Message";
import { PrivateChatRoom } from "@/chat/ChatRoom";

const ChatAreaFooter = () => {
  const messageDiv = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<string>("");
  const { socketQueue } = useSocket();
  const user = useAppSelector((state) => state.auth.user);
  const selectedChat = useAppSelector((state) => state.chat.selectedChat);
  const chatRoom = useAppSelector((state) => state.chat.chatRoom);

  function sendMessage(message: string) {
    if (!user || !selectedChat.id) return;
    let chatRoomId = selectedChat.id;
    if (!chatRoom[chatRoomId]) {
      const chatRoom = new PrivateChatRoom([user._id, chatRoomId], user._id);
      chatRoomId = chatRoom.chatRoomId;
      socketQueue.emitChatRoom("chatroom-create", chatRoom.toObject());
    }
    const msg = new TextMessage(message, user._id, chatRoomId);
    socketQueue.emitChatRoomMessage(
      chatRoomId,
      "message-create",
      msg.toObject(),
    );

    setMessage("");
  }

  return (
    <div className="flex shrink-0 items-center gap-3 border-t-[1px] border-border-color p-3 px-4 lg:gap-4 lg:px-8">
      <div className="cursor-pointer">{ChatSvg("emoteIcon")}</div>
      <div className="cursor-pointer">{MessageSvg("ImageAttachment")}</div>
      <div className="cursor-pointer">{ChatSvg("attachment")}</div>
      <div className="relative max-h-28 grow overflow-y-auto overflow-x-hidden">
        <div
          className={`text-gray-400 absolute inset-0 items-center p-4 align-middle ${message ? "hidden" : "flex"}`}
          onClick={() => messageDiv.current?.focus()}
        >
          Type a message...
        </div>
        <div
          ref={messageDiv}
          className="inputMessage rounded-md border-none bg-input-bg p-3 text-base outline-none"
          contentEditable="true"
          onInput={(e) => setMessage(e.currentTarget.innerText)}
        ></div>
      </div>
      <div
        className="cursor-pointer text-theme-color"
        onClick={() => sendMessage(message)}
      >
        {ChatSvg("msgSend")}
      </div>
    </div>
  );
};

export default ChatAreaFooter;
