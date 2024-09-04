import { MessageState } from "@/hooks/AppSelector/useMessageState";
import React from "react";

const TextMessage = ({ messageState }: { messageState: MessageState }) => {
  const rawMessage = messageState.getRawMessage();
  if (!rawMessage) return null;
  const selfMsg = messageState.isMessageFromSelf();

  return (
    <div
      className={`relative mt-3 max-w-[75%] p-3 text-[15px] md:max-w-[60%] md:p-4 ${selfMsg ? "rounded-sender-chat-radus bg-theme-color text-white" : "rounded-user-chat-radius bg-chat-text-bg"}`}
    >
      <span className="hyphenate font-medium leading-[21px] md:text-base">
        {rawMessage.message}
      </span>
      <span className="inline-block h-auto w-[68px]"></span>
      <div
        className={`absolute bottom-[6px] right-[14px] font-manrope text-xs font-medium ${selfMsg ? "text-white-200" : "text-msg-message"}`}
      >
        {messageState.getTime()}
      </div>
    </div>
  );
};

export default TextMessage;
