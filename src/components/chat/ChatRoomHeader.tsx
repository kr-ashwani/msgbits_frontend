import React from "react";
import { ChatSvg } from "../svg/chatSvg";
import UserAvatar from "../utility/UserAvatar";
import { useAppSelector } from "@/lib/store/hooks";

const ChatRoomHeader = () => {
  const userState = useAppSelector((state) => state.auth.user);
  const userProfilePic = userState?.profilePicture || "";

  return (
    <div className="flex w-full items-center gap-4 p-2 py-5">
      <div className="text-theme-color">
        {ChatSvg("ChatHeaderLogo", { width: "40px", height: "40px" })}
      </div>
      <div className="text-setting-icon-color relative grow">
        <div className="absolute pt-1">
          {ChatSvg("search", { width: "20px", height: "20px" })}
        </div>
        <input
          className="text-body-color w-full border-none px-2 pl-7 text-[15px] font-semibold outline-none"
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
