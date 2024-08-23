import React, { useState } from "react";
import ChatRoomHeader from "./ChatRoomHeader";
import { StackSlider } from "../../StackSlider/StatckSlider";
import ChatRoomAddButton from "./ChatRoomAddButton";
import ChatRoomContainer from "./ChatRoomContainer";
import GroupChatCreate from "./GroupChatCreate";
import PrivateChatCreate from "./PrivateChatCreate";
import Setting from "../chatUtilities/Setting";
import Profile from "../chatUtilities/Profile";

const ChatRoomWrapper = () => {
  const [chatRoomSearch, setChatRoomSearch] = useState<string>("");

  return (
    <StackSlider mainStackClass="h-full">
      <section
        id="chatRoomWrapper"
        className="scrollbar-thumb-gray-500 scrollbar-track-gray-200 h-full w-full overflow-y-scroll bg-[--theme-bg-color] scrollbar-thin scrollbar-track-rounded-full scrollbar-corner-rounded-full"
      >
        <ChatRoomHeader
          chatRoomSearch={chatRoomSearch}
          setChatRoomSearch={setChatRoomSearch}
        />
        <ChatRoomContainer chatRoomSearch={chatRoomSearch} />
        <ChatRoomAddButton />
      </section>
      <Setting name="Setting" />
      <Profile name="Profile" />
      <PrivateChatCreate name="PrivateChatCreate" />
      <GroupChatCreate name="GroupChatCreate" />
    </StackSlider>
  );
};

export default ChatRoomWrapper;
