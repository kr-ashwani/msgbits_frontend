import React from "react";
import ChatRoomHeader from "./ChatRoomHeader";
import { StackSlider } from "../../StackSlider/StatckSlider";
import ChatRoomManager from "./ChatRoomManager";
import ChatRoomAddButton from "./ChatRoomAddButton";
import ChatRoomContainer from "./ChatRoomContainer";

const ChatRoomWrapper = () => {
  return (
    <StackSlider>
      <section
        id="chatRoomWrapper"
        className="scrollbar-thumb-gray-500 scrollbar-track-gray-200 h-full w-full overflow-y-scroll bg-[--theme-bg-color] scrollbar-thin scrollbar-track-rounded-full scrollbar-corner-rounded-full"
      >
        <ChatRoomHeader />
        <ChatRoomContainer />
        <ChatRoomAddButton />
      </section>
      <ChatRoomManager name="ChatRoomManager" />
    </StackSlider>
  );
};

export default ChatRoomWrapper;
