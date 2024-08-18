import React from "react";
import { useAppSelector } from "@/lib/store/hooks";
import { ChatSvg } from "@/components/svg/chatSvg";
import UserAvatar from "@/components/utility/UserAvatar";

const ChatRoomHeader = () => {
  const userState = useAppSelector((state) => state.auth.user);
  const userProfilePic = userState?.profilePicture || "";

  return (
    <div className="flex w-full items-center gap-4 px-2 py-5">
      <div className="text-theme-color">
        {ChatSvg("ChatHeaderLogo", { width: "40px", height: "40px" })}
      </div>
      <div className="relative grow text-setting-icon-color">
        <div className="absolute pt-1">
          {ChatSvg("search", { width: "20px", height: "20px" })}
        </div>
        <input
          className="w-full border-none px-2 pl-7 text-[15px] font-semibold text-body-color outline-none"
          placeholder="Search..."
        />
      </div>
      <div className="text-setting-icon-color">
        {ChatSvg("setting", { width: "25px", height: "25px" })}
      </div>
      <UserAvatar src={userProfilePic} size={40} />
    </div>
  );
};

export default ChatRoomHeader;
