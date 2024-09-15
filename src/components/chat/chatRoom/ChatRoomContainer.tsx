"use client";
import {
  ChatRoomState,
  useChatRoomState,
} from "@/hooks/AppSelector/useChatRoomState";

import { useEffect, useMemo, useState } from "react";
import ChatRoom from "./ChatRoom";
import { useAnimateChatRooms } from "@/hooks/useAnimateChatRooms";

const ChatRoomContainer = ({ chatRoomSearch }: { chatRoomSearch: string }) => {
  const chatRoomContainerState = useChatRoomState();
  const originalChatRoomList = useMemo(() => {
    const list = chatRoomContainerState.getChatRooms();
    return list;
  }, [chatRoomContainerState]);

  const [chatRoomList, setChatRoomList] = useState<ChatRoomState[]>([]);
  useAnimateChatRooms(chatRoomList);

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

    // sorted by updatedAt desc
    setChatRoomList((state) =>
      [...state].sort((a, b) => b.getUpdatedTime() - a.getUpdatedTime()),
    );
  }, [setChatRoomList, originalChatRoomList, chatRoomSearch]);

  return (
    <section
      id="chatRoomContainer"
      className="relative z-0 flex h-full w-full flex-col overflow-y-auto bg-[--theme-bg-color]"
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
      <div
        className="absolute h-16 w-full shrink-0"
        style={{
          transform: `translateY(calc(${chatRoomList.length + 1} * var(--chatRoom-height)))`,
        }}
      ></div>
    </section>
  );
};

export default ChatRoomContainer;
