import useSlide from "@/components/StackSlider/hooks/useSlide";
import { ChatSvg } from "@/components/svg/chatSvg";
import Avatar from "@/components/utility/Avatar";
import { ChatRoomState } from "@/hooks/AppSelector/useChatRoomState";
import React from "react";

const GroupChatMembers = ({
  chatRoomState,
}: {
  chatRoomState: ChatRoomState;
}) => {
  const chatMembers = chatRoomState.getChatRoomMembers();
  const slider = useSlide();

  return (
    <div className="">
      <div className="px-6 py-3">
        <p className="font-semibold">{chatMembers.length} Members</p>
      </div>

      <div>
        <div
          onClick={() => slider.trigerSlider("open", "AddUserToChatRoom")}
          className="flex w-full cursor-pointer items-center gap-5 px-5 py-3 hover:bg-msg-hover-bg"
        >
          <div className="relative flex h-10 w-10 items-center justify-center text-theme-color">
            <div className="absolute inset-0 rounded-full bg-theme-color opacity-10"></div>
            {ChatSvg("userAddicon")}
          </div>
          <div className="flex flex-col overflow-hidden">
            <p className="truncate text-base font-semibold">Add members</p>
          </div>
        </div>
        {chatMembers.map((member) => (
          <div
            key={member._id}
            className="flex w-full cursor-pointer items-center gap-5 px-5 py-3 hover:bg-msg-hover-bg"
          >
            <div className="relative">
              <Avatar src={member.profilePicture} size={40} />
            </div>
            <div className="flex grow flex-col overflow-hidden">
              <p className="truncate text-sm font-semibold">{member.name}</p>
              <p className="truncate text-xs font-medium text-msg-message">
                {member.email}
              </p>
            </div>
            {chatRoomState.isChatRoomAdmin(member._id) ? (
              <div className="relative flex items-center justify-center p-1 px-2">
                <div className="absolute inset-0 rounded-md bg-theme-color opacity-10"></div>
                <p className="text-xs font-medium text-theme-color">Admin</p>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupChatMembers;
