import { ChatSvg } from "@/components/svg/chatSvg";
import UserAvatar from "@/components/utility/UserAvatar";
import { useSelectedChatDispatch } from "@/hooks/AppDispatcher/useSelectedChatDispatch";
import { useShowChatRoomDetailsDispatch } from "@/hooks/AppDispatcher/useShowChatRoomDetailsDispatch";
import {
  SelectedChatRoomState,
  useSelectedChatRoomState,
} from "@/hooks/AppSelector/useSelectedChatRoomState";
import React, { ReactNode } from "react";

function getChatMembersPictures(selectedChatRoom: SelectedChatRoomState) {
  const members = selectedChatRoom.getChatRoomMembers();
  const membersLength = members.length;
  const userList: ReactNode[] = [];
  for (let i = 0; i < membersLength; i++) {
    const user = members[i];
    if (i === 3) {
      userList.push(
        <div
          key="sudoUser"
          className="relative ml-[-5px] flex h-[32px] w-[32px] items-center justify-center rounded-full border-2 border-theme-bg-color bg-button-bg-color text-sm font-medium text-theme-color"
        >
          +{membersLength - i}
        </div>,
      );
      break;
    }
    userList.push(
      <UserAvatar
        className="ml-[-5px] border-2 border-theme-bg-color"
        key={user._id}
        src={user.profilePicture}
        size={32}
      />,
    );
  }
  return userList;
}
const ChatAreaHeader = () => {
  const selectedChatDispatch = useSelectedChatDispatch();
  const selectedChatRoom = useSelectedChatRoomState();
  const showChatRoom = useShowChatRoomDetailsDispatch();
  return (
    <div className="sticky left-0 right-0 top-0 flex h-[65px] shrink-0 cursor-pointer items-center border-b-[1px] border-border-color px-3 py-3 lg:px-5">
      <div
        className="cursor-pointer sm:hidden"
        onClick={() => selectedChatDispatch.setSelectedChat(null)}
      >
        {ChatSvg("backArrow")}
      </div>

      <div
        onClick={() => showChatRoom.toggleChatRoomDetails(true)}
        className="grow truncate pl-2 text-xl font-semibold"
      >
        {selectedChatRoom.getChatRoomName()}
      </div>
      <div className="flex">{getChatMembersPictures(selectedChatRoom)}</div>
    </div>
  );
};

export default ChatAreaHeader;
