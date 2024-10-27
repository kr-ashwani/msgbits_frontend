"use client";
import ChatRoomDetails from "@/components/chat/chatRoomDetails/ChatRoomDetails";
import ChatRoomMessages from "@/components/chat/chatRoomMessage/ChatRoomMessages";
import ChatRoomWrapper from "@/components/chat/chatRoom/ChatRoomWrapper";
import useChatStyle from "@/hooks/useChatStyle";
import { useSetUpSocketListners } from "@/hooks/useSetUpSocketListners";
import StartUpSetup from "@/components/utility/StartUpSetup";
import ImagePreviewDrawer from "@/components/chat/chatRoomMessage/ImagePreviewDrawer";
import CallContainer from "@/components/chat/chatCall/CallContainer";

const Chat = () => {
  useChatStyle();
  useSetUpSocketListners();

  return (
    <main
      id="chat"
      className={`relative grid h-full w-full grid-cols-1 overflow-hidden font-manrope text-body-color md:grid-cols-[var(--chatRoomContainer-width)_1fr] md:divide-x-[1px] md:divide-[--border-color] lg:transition-all`}
    >
      <StartUpSetup />
      <ChatRoomWrapper />
      <ChatRoomMessages />
      <ChatRoomDetails />
      <CallContainer />
      <ImagePreviewDrawer />
    </main>
  );
};

export default Chat;
