import { ChatSvg } from "@/components/svg/chatSvg";
import React, { useRef, useState } from "react";

const ChatAreaFooter = () => {
  const messageDiv = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<string>("");
  return (
    <div className="flex min-h-16 shrink-0 items-center gap-3 p-5 px-8">
      <div className="cursor-pointer">{ChatSvg("emoteIcon")}</div>
      <div className="cursor-pointer">{ChatSvg("attachment")}</div>
      <div className="relative max-h-24 grow overflow-y-auto overflow-x-hidden">
        <div
          className={`absolute inset-0 p-2 text-slate-gray ${message ? "hidden" : "block"}`}
          onClick={() => messageDiv.current?.focus()}
        >
          Type a message...
        </div>
        <div
          ref={messageDiv}
          className="inputMessage border-none p-2 outline-none"
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
