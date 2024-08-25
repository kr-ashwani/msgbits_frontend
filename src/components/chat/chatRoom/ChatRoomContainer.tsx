"use client";

import {
  ChatRoomState,
  useChatRoomState,
} from "@/hooks/AppSelector/useChatRoomState";

import { useEffect, useMemo, useState } from "react";
import ChatRoom from "./ChatRoom";

const ChatRoomContainer = ({ chatRoomSearch }: { chatRoomSearch: string }) => {
  const chatRoomContainerState = useChatRoomState();

  const originalChatRoomList = useMemo(() => {
    const list = chatRoomContainerState.getChatRooms();
    return list;
  }, [chatRoomContainerState]);

  const [chatRoomList, setChatRoomList] = useState<ChatRoomState[]>([]);

  useEffect(() => {
    if (chatRoomSearch)
      setChatRoomList(
        originalChatRoomList.reduce<ChatRoomState[]>((acc, chatRoomState) => {
          if (
            chatRoomState
              .getChatRoomName()
              .toLowerCase()
              .includes(chatRoomSearch.toLowerCase())
          )
            acc.push(chatRoomState);

          return acc;
        }, []),
      );
    else setChatRoomList(originalChatRoomList);
  }, [setChatRoomList, originalChatRoomList, chatRoomSearch]);

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
