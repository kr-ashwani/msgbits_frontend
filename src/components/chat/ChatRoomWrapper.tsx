import React from "react";
import ChatRoomHeader from "./ChatRoomHeader";
import ChatRoomContainer from "./ChatRoomContainer";

const ChatRoomWrapper = () => {
  return (
    <section
      id="chatRoomWrapper"
      className="scrollbar-thin scrollbar-corner-rounded-full scrollbar-thumb-gray-500 scrollbar-track-rounded-full scrollbar-track-gray-200 h-full w-full overflow-y-scroll bg-[--theme-bg-color]"
    >
      <ChatRoomHeader />
      <ChatRoomContainer />
    </section>
  );
};

export default ChatRoomWrapper;
