import useSlide from "@/components/StackSlider/hooks/useSlide";
import { ChatSvg } from "@/components/svg/chatSvg";
import UserAvatar from "@/components/utility/UserAvatar";
import { useChatUserState } from "@/hooks/AppSelector/useChatUserState";
import React from "react";

const PrivateChatCreate = ({ name }: { name: string }) => {
  const slider = useSlide();
  const chatuser = useChatUserState();

  return (
    <div className="flex h-full flex-col gap-5 overflow-y-auto bg-chat-bg">
      <div className="flex items-center border-b-[1px] border-border-color bg-chat-bg py-3">
        <div
          className="ml-[-8px] cursor-pointer pl-3"
          onClick={() => slider.trigerSlider("close", "PrivateChatCreate")}
        >
          {ChatSvg("backArrow")}
        </div>

        <p className="text-xl font-semibold">Select User</p>
      </div>

      <div
        className="flex items-center gap-3 px-3"
        onClick={() => slider.trigerSlider("open", "GroupChatCreate")}
      >
        <div className="flex h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-full bg-theme-color text-white">
          {ChatSvg("groupChatIcon", { height: "30", width: "30" })}
        </div>
        <p className="text-[16px] font-semibold"> New Group Chat</p>
      </div>

      <div className="mb-3 px-3">
        <p className="text-[16px] font-semibold text-msg-message">
          Tap to start chatting
        </p>
        <div className="relative pt-3 text-setting-icon-color">
          <div className="absolute pt-1">
            {ChatSvg("search", { width: "20px", height: "20px" })}
          </div>
          <input
            className="w-full border-none px-2 pl-7 text-[15px] font-semibold text-body-color outline-none"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 px-3">
        {chatuser.getAllUsers().map((user) => {
          return (
            <div key={user._id} className="flex w-full items-center gap-3">
              <UserAvatar src={user.profilePicture} size={45} />
              <div className="flex flex-col overflow-hidden">
                <p className="truncate text-[16px] font-semibold">
                  {user.name}
                </p>
                <p className="truncate text-sm font-medium text-msg-message">
                  {user.email}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PrivateChatCreate;
