import { ChatSvg } from "@/components/svg/chatSvg";
import { useSelectedChatDispatch } from "@/hooks/AppDispatcher/useSelectedChatDispatch";
import { useShowChatRoomDetailsDispatch } from "@/hooks/AppDispatcher/useShowChatRoomDetailsDispatch";
import { ChatRoomState } from "@/hooks/AppSelector/useChatRoomState";
import { useSelectedChatState } from "@/hooks/AppSelector/useSelectedChatState";

import React, { ReactNode } from "react";
import StatusAvatar from "../user/StatusAvatar";
import Avatar from "@/components/utility/Avatar";
import { Phone } from "lucide-react";
import { useChatRoomCallSession } from "@/hooks/AppSelector/useChatRoomCallSession";
import { useCallManager } from "@/hooks/chat/useCallManager";

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
          className="relative ml-[-12px] flex h-10 w-10 items-center justify-center rounded-full bg-button-bg-color text-sm font-medium text-theme-color"
        >
          +{membersLength - i}
        </div>,
      );
      break;
    }
    userList.push(
      chatRoom.getChatType() === "group" ? (
        <Avatar
          className="relative ml-[-12px]"
          key={user._id}
          src={user.profilePicture}
          size={35}
        />
      ) : (
        <StatusAvatar
          userId={user._id}
          className="relative ml-[-12px]"
          indicatorClass="right-[5%]"
          key={user._id}
          src={user.profilePicture}
          size={35}
        />
      ),
    );
  }
  return userList;
}
const ChatAreaHeader = () => {
  const selectedChatDispatch = useSelectedChatDispatch();
  const chatRoom = useSelectedChatState().getChatState();
  const showChatRoomDispatch = useShowChatRoomDetailsDispatch();
  const callSession = useChatRoomCallSession();
  const callManager = useCallManager();

  function handleJoinCall() {
    if (!chatRoom?.chatRoomId) return;
    const callInfo = callSession.getCallInfo(chatRoom.chatRoomId);
    if (!callInfo) return;

    callManager.answerCall({
      callId: callInfo.chatRoomId,
      from: "client",
      to: "server",
      callType: callInfo.callType,
    });
  }
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
        className="grow truncate py-2 pl-2 pr-[12px] text-xl font-semibold"
      >
        {chatRoom?.getChatRoomName()}
      </div>

      {chatRoom?.chatRoomId && callSession.isActiveCall(chatRoom.chatRoomId) ? (
        <div
          className="mr-[22px] flex items-center gap-1 rounded-lg bg-user-online px-2 py-[6px]"
          onClick={handleJoinCall}
        >
          <Phone size={16} className="fill-chat-bg text-chat-bg" />
          <div className="text-sm text-chat-bg">Join call</div>
        </div>
      ) : null}
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
