import { ChatSvg } from "@/components/svg/chatSvg";
import React from "react";
import GroupChatMembers from "./GroupChatMembers";
import GroupChatPrivacy from "./GroupChatPrivacy";
import PrivateChatCommonGroups from "./PrivateChatCommonGroups";
import SharedPhotos from "./SharedPhotos";
import { ChatRoomState } from "@/hooks/AppSelector/useChatRoomState";
import StatusAvatar from "../chatUser/StatusAvatar";

const ChatRoomDetailsInfo = ({
  chatRoomState,
}: {
  chatRoomState: ChatRoomState;
}) => {
  const rawChatRoom = chatRoomState.getRawChatRoom();
  const memberId = chatRoomState.getOtherUserIdInPrivateChat();
  if (!rawChatRoom) return null;

  return (
    <div className="flex h-full shrink-0 flex-col gap-2 overflow-y-auto py-7">
      <div className="flex flex-col items-center gap-[10px] px-7">
        <div>
          <StatusAvatar
            indicatorClass="bottom-[1%] right-[18%] w-4 h-4"
            userId={memberId}
            src={chatRoomState.getChatRoomPicture() || ""}
            size={120}
          />
        </div>
        <div className="text-lg font-semibold">
          {chatRoomState.getChatRoomName()}
        </div>
        <div className="mt-[-5px] text-xs font-semibold text-msg-date">{`Created by ${chatRoomState?.getChatRoomCreatorName()}, ${chatRoomState?.getChatRoomCreatorDate()}`}</div>
        <div className="mt-[10px] flex w-full gap-2 text-theme-color">
          <div className="relative flex w-0 grow cursor-pointer items-center justify-center gap-2 py-3 text-sm font-medium">
            <div className="absolute inset-0 rounded-md bg-theme-color opacity-10"></div>
            {ChatSvg("callIcon")}
            <span>Call Group</span>
          </div>
          <div className="relative flex w-0 grow cursor-pointer items-center justify-center gap-2 py-3 text-sm font-medium">
            <div className="absolute inset-0 rounded-md bg-theme-color opacity-10"></div>
            {ChatSvg("videoIcon")}
            <span>Video Chat</span>
          </div>
        </div>
      </div>

      <div className="relative mx-6 flex pt-3 text-setting-icon-color">
        <input
          className="w-0 grow border-b-[1px] border-border-color py-3 pr-6 text-[15px] font-semibold text-body-color outline-none"
          placeholder="Search in Conversation"
        />
        <div className="absolute right-0 self-center">
          {ChatSvg("search", { width: "20px", height: "20px" })}
        </div>
      </div>

      <SharedPhotos />

      {rawChatRoom.type === "group" ? (
        <>
          <GroupChatMembers chatRoomState={chatRoomState} />
          <GroupChatPrivacy chatRoomState={chatRoomState} />
        </>
      ) : memberId ? (
        <PrivateChatCommonGroups memberId={memberId} />
      ) : null}

      <div className="h-16 w-full shrink-0"></div>
    </div>
  );
};

export default ChatRoomDetailsInfo;
