import React from "react";
import { ChatSvg } from "../svg/chatSvg";

const ChatRoomAddButton = () => {
  return (
    <>
      <div className="sticky bottom-0 left-0 flex min-h-20 items-center justify-center bg-gradient-overlay-bg">
        <div className="absolute top-0 flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-full bg-theme-color shadow-chatAddBtn">
          <div className="scale-110">{ChatSvg("addBtn")}</div>
        </div>
      </div>
    </>
  );
};

export default ChatRoomAddButton;
