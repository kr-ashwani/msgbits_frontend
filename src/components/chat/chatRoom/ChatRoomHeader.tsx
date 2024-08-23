import React from "react";
import { useAppSelector } from "@/lib/store/hooks";
import { ChatSvg } from "@/components/svg/chatSvg";
import UserAvatar from "@/components/utility/UserAvatar";
import useSlide from "@/components/StackSlider/hooks/useSlide";

const ChatRoomHeader = ({
  chatRoomSearch,
  setChatRoomSearch,
}: {
  chatRoomSearch: string;
  setChatRoomSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const userState = useAppSelector((state) => state.auth.user);
  const userProfilePic = userState?.profilePicture || "";
  const slider = useSlide();

  return (
    <div className="flex w-full items-center gap-4 border-b-[1px] border-border-color px-2 py-5">
      <div className="text-theme-color">
        {ChatSvg("ChatHeaderLogo", { width: "40px", height: "40px" })}
      </div>
      <div className="relative grow text-setting-icon-color">
        <div className="absolute pt-1">
          {ChatSvg("search", { width: "20px", height: "20px" })}
        </div>
        <input
          value={chatRoomSearch}
          onChange={(e) => setChatRoomSearch(e.target.value)}
          className="w-full border-none px-2 pl-7 text-[15px] font-semibold text-body-color outline-none"
          placeholder="Search..."
        />
      </div>
      <div
        className="cursor-pointer text-setting-icon-color"
        onClick={() => slider.trigerSlider("open", "Setting")}
      >
        {ChatSvg("setting", { width: "25px", height: "25px" })}
      </div>
      <UserAvatar
        onClick={() => slider.trigerSlider("open", "Profile")}
        src={userProfilePic}
        size={40}
        className="cursor-pointer"
      />
    </div>
  );
};

export default ChatRoomHeader;
