import React, { useState } from "react";
import ChatRoomHeader from "./ChatRoomHeader";
import { StackSlider } from "../../StackSlider/StatckSlider";
import ChatRoomAddButton from "./ChatRoomAddButton";
import ChatRoomContainer from "./ChatRoomContainer";
import GroupChatCreate from "./GroupChatCreate";
import PrivateChatCreate from "./PrivateChatCreate";
import Setting from "../user/Setting";
import Profile from "../user/Profile";
import { IUser } from "@/schema/userSchema";
import GroupChatFinalCreate from "./GroupChatFinalCreate";
import { ImagePreviewProvider } from "@/context/ImagePreviewContext";

export interface NewGroupType {
  name: string;
  members: IUser[];
}

const ChatRoomWrapper = () => {
  const [chatRoomSearch, setChatRoomSearch] = useState<string>("");
  const [newGroup, setNewGroup] = useState<NewGroupType>({
    name: "",
    members: [],
  });

  return (
    <StackSlider mainStackClass="h-full">
      <section
        id="chatRoomWrapper"
        className="h-full w-full bg-[--theme-bg-color]"
      >
        <ImagePreviewProvider>
          <ChatRoomHeader
            chatRoomSearch={chatRoomSearch}
            setChatRoomSearch={setChatRoomSearch}
          />
          <ChatRoomContainer chatRoomSearch={chatRoomSearch} />
          <ChatRoomAddButton />
        </ImagePreviewProvider>
      </section>
      <Setting name="Setting" />
      <Profile name="Profile" />
      <PrivateChatCreate name="PrivateChatCreate" />
      <GroupChatCreate
        newGroup={newGroup}
        setNewGroup={setNewGroup}
        name="GroupChatCreate"
      />
      <GroupChatFinalCreate
        newGroup={newGroup}
        setNewGroup={setNewGroup}
        name="GroupChatFinalCreate"
      />
    </StackSlider>
  );
};

export default ChatRoomWrapper;
