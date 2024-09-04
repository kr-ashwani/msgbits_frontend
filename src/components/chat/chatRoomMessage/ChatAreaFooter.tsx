import { ChatSvg } from "@/components/svg/chatSvg";
import { MessageSvg } from "@/components/svg/MessageSvg";
import React, { useRef, useState } from "react";

const ChatAreaFooter = () => {
  const messageDiv = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<string>("");

  return (
    <div className="flex shrink-0 items-center gap-3 border-t-[1px] border-border-color p-3 px-4 lg:gap-4 lg:px-8">
      <div className="cursor-pointer">{ChatSvg("emoteIcon")}</div>
      <div className="cursor-pointer">{MessageSvg("ImageAttachment")}</div>
      <div className="cursor-pointer">{ChatSvg("attachment")}</div>
      <div className="relative max-h-28 grow overflow-y-auto overflow-x-hidden">
        <div
          className={`text-gray-400 absolute inset-0 items-center p-4 align-middle ${message ? "hidden" : "flex"}`}
          onClick={() => messageDiv.current?.focus()}
        >
          Type a message...
        </div>
        <div
          ref={messageDiv}
          className="inputMessage bg-input-bg rounded-md border-none p-3 text-base outline-none"
          contentEditable="true"
          onInput={(e) => setMessage(e.currentTarget.innerText)}
        ></div>
      </div>
      <div className="cursor-pointer text-theme-color">
        {ChatSvg("msgSend")}
      </div>
    </div>
  );
};

export default ChatAreaFooter;
