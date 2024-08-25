import { ChatSvg } from "@/components/svg/chatSvg";
import UserAvatar from "@/components/utility/UserAvatar";
import React from "react";
import GroupChatMembers from "./GroupChatMembers";
import GroupChatPrivacy from "./GroupChatPrivacy";
import PrivateChatCommonGroups from "./PrivateChatCommonGroups";
import SharedPhotos from "./SharedPhotos";
import { ChatRoomState } from "@/hooks/AppSelector/useChatRoomState";

const ChatRoomDetailsInfo = ({
  chatRoomState,
}: {
  chatRoomState: ChatRoomState;
}) => {
  const rawChatRoom = chatRoomState.getRawChatRoom();
  if (!rawChatRoom) return null;

  return (
    <div className="flex flex-col gap-2 py-7">
      <div className="flex flex-col items-center gap-[10px] px-7">
        <div>
          <UserAvatar
            src={chatRoomState.getChatRoomPicture() || ""}
            size={60}
          />
        </div>
        <div className="text-lg font-semibold">
          {chatRoomState.getChatRoomName()}
        </div>
        <div className="text-msg-date mt-[-5px] text-xs font-semibold">{`Created by ${chatRoomState?.getChatRoomCreatorName()}, ${chatRoomState?.getChatRoomCreatorDate()}`}</div>
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
          <GroupChatPrivacy />
        </>
      ) : (
        <PrivateChatCommonGroups chatRoomState={chatRoomState} />
      )}
    </div>
  );
};

export default ChatRoomDetailsInfo;
