import React from "react";
import ChatRoomHeader from "./ChatRoomHeader";
import { StackSlider } from "../../StackSlider/StatckSlider";
import ChatRoomAddButton from "./ChatRoomAddButton";
import ChatRoomContainer from "./ChatRoomContainer";
import GroupChatCreate from "./GroupChatCreate";
import PrivateChatCreate from "./PrivateChatCreate";

const ChatRoomWrapper = () => {
  return (
    <StackSlider mainStackClass="h-full">
      <section
        id="chatRoomWrapper"
        className="scrollbar-thumb-gray-500 scrollbar-track-gray-200 h-full w-full overflow-y-scroll bg-[--theme-bg-color] scrollbar-thin scrollbar-track-rounded-full scrollbar-corner-rounded-full"
      >
        <ChatRoomHeader />
        <ChatRoomContainer />
        <ChatRoomAddButton />
      </section>
      <PrivateChatCreate name="PrivateChatCreate" />
      <GroupChatCreate name="GroupChatCreate" />
    </StackSlider>
  );
};

export default ChatRoomWrapper;
