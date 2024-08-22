import UserAvatar from "@/components/utility/UserAvatar";
import { useShowChatRoomDetailsDispatch } from "@/hooks/AppDispatcher/useShowChatRoomDetailsDispatch";
import { useChatRoomState } from "@/hooks/AppSelector/useChatRoomState";
import {
  ChatUserState,
  useChatUserState,
} from "@/hooks/AppSelector/useChatUserState";
import {
  SelectedChatState,
  useSelectedChatState,
} from "@/hooks/AppSelector/useSelectedChatState";
import React, { ReactNode } from "react";

function getChatMembersPictures(
  selectedChatState: SelectedChatState,
  chatUserState: ChatUserState,
) {
  const userList: ReactNode[] = [];
  const selectedChat = selectedChatState.getSelectedChatRoom();
  const membersLength = selectedChat ? selectedChat.members.length : 0;
  for (let i = 0; i < membersLength; i++) {
    const userId = selectedChat?.members[i] || "";
    if (i === 3) {
      userList.push(
        <div className="border-theme-bg-color bg-button-bg-color relative ml-[-5px] flex h-[32px] w-[32px] items-center justify-center rounded-full border-2 text-sm font-medium text-theme-color">
          +{membersLength - i}
        </div>,
      );
      break;
    }
    userList.push(
      <UserAvatar
        className="border-theme-bg-color ml-[-5px] border-2"
        key={userId}
        src={chatUserState.getUserById(userId)?.profilePicture || ""}
        size={32}
      />,
    );
  }
  return userList;
}
const ChatAreaHeader = () => {
  const selectedChatState = useSelectedChatState();
  const chatRoomContainer = useChatRoomState();
  const selectedChat = chatRoomContainer.getChatRoomById(
    selectedChatState.getSelectedChatRoom()?.chatRoomId || "",
  );
  const chatUserState = useChatUserState();
  const showChatRoom = useShowChatRoomDetailsDispatch();
  return (
    <div className="sticky left-0 right-0 top-0 flex h-[72px] shrink-0 cursor-pointer items-center px-3 py-5 lg:px-5">
      <div
        onClick={() => showChatRoom.toggleChatRoomDetails(true)}
        className="grow truncate text-lg font-semibold"
      >
        {selectedChat?.getChatRoomName()}
      </div>
      <div className="flex">
        {getChatMembersPictures(selectedChatState, chatUserState)}
      </div>
    </div>
  );
};

export default ChatAreaHeader;
