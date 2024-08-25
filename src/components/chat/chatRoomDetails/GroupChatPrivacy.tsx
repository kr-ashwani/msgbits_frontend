import { ChatSvg } from "@/components/svg/chatSvg";
import React from "react";

const GroupChatPrivacy = () => {
  return (
    <div className="pt-3">
      <div className="text-alert-red-500 flex cursor-pointer gap-4 px-8 py-4 hover:bg-msg-hover-bg">
        {ChatSvg("exitIcon")}
        <p className="font-semibold">Exit group</p>
      </div>
    </div>
  );
};

export default GroupChatPrivacy;
