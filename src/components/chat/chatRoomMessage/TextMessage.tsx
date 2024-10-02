import { MessageState } from "@/hooks/AppSelector/useMessageState";
import React from "react";
import RepliedToMessage from "./RepliedToMessage";
import { cn } from "@/lib/utils";

const TextMessage = ({
  messageState,
  children,
  messageClassName = "",
  messageFrameClassName = "",
}: {
  messageState: MessageState;
  messageClassName?: string;
  messageFrameClassName?: string;
  children?: React.ReactNode;
}) => {
  const rawMessage = messageState.getRawMessage();

  if (!rawMessage) return null;
  const selfMsg = messageState.isMessageFromSelf();

  return (
    <div
      className={`theme-color-Animation relative mt-[6px] flex w-auto max-w-[80%] shrink-0 flex-col whitespace-pre-wrap text-[15px] md:max-w-[60%] ${selfMsg ? "theme-color-Animation rounded-sender-chat-radus bg-theme-color text-white" : "rounded-user-chat-radius bg-chat-text-bg"}`}
    >
      {rawMessage.repliedTo ? (
        <RepliedToMessage
          repliedMessage={messageState
            .getContainer()
            .getMessageById(rawMessage.repliedTo)}
          className={`mx-2 mt-2 h-[60px] p-2 pl-4 ${messageState.isMessageFromSelf() ? "" : ""}`}
        />
      ) : null}
      {/* components like images, videos and docs can be rendered here */}
      {children}

      <div
        className={cn(
          `${rawMessage.message ? "p-2" : "p-0"} flex px-3`,
          messageFrameClassName,
        )}
      >
        <div
          className={cn(
            `hyphenate min-h-4 font-medium leading-[21px] md:text-sm`,
            messageClassName,
          )}
        >
          <span>{rawMessage.message}</span>
          <span className="inline-block h-auto w-[54px]"></span>
        </div>
      </div>
      <div
        className={`absolute bottom-[2px] right-[12px] font-manrope text-[10px] font-medium ${selfMsg ? "text-white-200" : "text-msg-message"}`}
      >
        {messageState.getTime()}
      </div>
    </div>
  );
};

export default TextMessage;
