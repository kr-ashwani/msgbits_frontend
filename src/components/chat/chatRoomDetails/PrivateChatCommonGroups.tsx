import { ChatSvg } from "@/components/svg/chatSvg";
import Avatar from "@/components/utility/Avatar";
import { ChatRoomState } from "@/hooks/AppSelector/useChatRoomState";
import React from "react";

const PrivateChatCommonGroups = ({
  chatRoomState,
}: {
  chatRoomState: ChatRoomState;
}) => {
  const commonGroups = chatRoomState.getCommonGroupChat();

  return (
    <div className="">
      <div className="px-6 py-3">
        <p className="font-semibold">
          {commonGroups.length} group{commonGroups.length > 1 ? "s" : ""} in
          common
        </p>
      </div>
      <div>
        <div className="flex w-full cursor-pointer items-center gap-5 px-5 py-3 hover:bg-msg-hover-bg">
          <div className="relative flex h-10 w-10 items-center justify-center text-theme-color">
            <div className="absolute inset-0 rounded-full bg-theme-color opacity-10"></div>
            {ChatSvg("groupChatIcon")}
          </div>
          <div className="flex flex-col overflow-hidden">
            <p className="truncate text-base font-semibold">
              Create group with {chatRoomState.getChatRoomName().split(" ")[0]}
            </p>
          </div>
        </div>
        {commonGroups.map((chatRoom) => (
          <div
            key={chatRoom.chatRoomId}
            className="flex w-full cursor-pointer items-center gap-5 px-5 py-3 hover:bg-msg-hover-bg"
          >
            <div className="relative">
              <Avatar src={chatRoom.chatRoomPicture} size={40} />
            </div>
            <div className="flex grow flex-col overflow-hidden">
              <p className="truncate text-sm font-semibold">
                {chatRoom.chatName}
              </p>
              <p className="truncate text-xs font-medium text-msg-message">
                {chatRoomState
                  .getChatContainer()
                  .getChatMembersNameExceptYou(chatRoom.chatRoomId)
                  .reduce<string>(
                    (acc, memberName, i, arr) =>
                      acc +
                      memberName.split(" ")[0] +
                      (i < arr.length - 1 ? ", " : ""),
                    "",
                  )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivateChatCommonGroups;
