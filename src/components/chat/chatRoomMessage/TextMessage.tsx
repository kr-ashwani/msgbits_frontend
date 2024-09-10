import { MessageState } from "@/hooks/AppSelector/useMessageState";
import React from "react";

const TextMessage = ({ messageState }: { messageState: MessageState }) => {
  const rawMessage = messageState.getRawMessage();
  if (!rawMessage) return null;
  const selfMsg = messageState.isMessageFromSelf();

  return (
    <div
      className={`relative mt-[6px] max-w-[75%] whitespace-pre-wrap p-2 px-3 text-[15px] md:max-w-[60%] ${selfMsg ? "rounded-sender-chat-radus bg-theme-color text-white" : "rounded-user-chat-radius bg-chat-text-bg"}`}
    >
      <span className="hyphenate font-medium leading-[21px] md:text-sm">
        {rawMessage.message}
      </span>
      <span className="inline-block h-auto w-[54px]"></span>
      <div
        className={`absolute bottom-[2px] right-[12px] font-manrope text-[10px] font-medium ${selfMsg ? "text-white-200" : "text-msg-message"}`}
      >
        {messageState.getTime()}
      </div>
    </div>
  );
};

export default TextMessage;
