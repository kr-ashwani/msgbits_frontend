import { ChatSvg } from "@/components/svg/chatSvg";
import Avatar from "@/components/utility/Avatar";
import { useSelectedChatDispatch } from "@/hooks/AppDispatcher/useSelectedChatDispatch";
import { useShowChatRoomDetailsDispatch } from "@/hooks/AppDispatcher/useShowChatRoomDetailsDispatch";
import { ChatRoomState } from "@/hooks/AppSelector/useChatRoomState";
import { useSelectedChatState } from "@/hooks/AppSelector/useSelectedChatState";

import React, { ReactNode } from "react";

function getChatMembersPictures(chatRoom: ChatRoomState) {
  const members = chatRoom.getChatRoomMembers();
  const membersLength = members.length;
  const userList: ReactNode[] = [];
  for (let i = 0; i < membersLength; i++) {
    const user = members[i];
    if (i === 3) {
      userList.push(
        <div
          key="sudoUser"
          className="relative ml-[-8px] flex h-10 w-10 items-center justify-center rounded-full border-2 border-theme-bg-color bg-button-bg-color text-sm font-medium text-theme-color"
        >
          +{membersLength - i}
        </div>,
      );
      break;
    }
    userList.push(
      <Avatar
        className="ml-[-8px] border-2 border-theme-bg-color"
        key={user._id}
        src={user.profilePicture}
        size={40}
      />,
    );
  }
  return userList;
}
const ChatAreaHeader = () => {
  const selectedChatDispatch = useSelectedChatDispatch();
  const chatRoom = useSelectedChatState().getChatState();
  const showChatRoomDispatch = useShowChatRoomDetailsDispatch();
  return (
    <div className="flex min-h-[65px] shrink-0 cursor-pointer items-center border-b-[1px] border-border-color px-3 lg:px-5">
      <div
        className="cursor-pointer py-4 md:hidden"
        onClick={() => selectedChatDispatch.setSelectedChat(null)}
      >
        {ChatSvg("backArrow")}
      </div>

      <div
        onClick={() => showChatRoomDispatch.toggleChatRoomDetails(true)}
        className="grow truncate py-2 pl-2 text-xl font-semibold"
      >
        {chatRoom?.getChatRoomName()}
      </div>
      <div
        className="flex py-2"
        onClick={() => showChatRoomDispatch.toggleChatRoomDetails(true)}
      >
        {chatRoom ? getChatMembersPictures(chatRoom) : null}
      </div>
    </div>
  );
};

export default ChatAreaHeader;
