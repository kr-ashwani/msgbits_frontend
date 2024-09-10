import Avatar from "@/components/utility/Avatar";
import {
  MessageState,
  useMessageState,
} from "@/hooks/AppSelector/useMessageState";
import { useSelectedChatState } from "@/hooks/AppSelector/useSelectedChatState";

import React, { ReactNode, useMemo, useRef } from "react";
import TextMessage from "./TextMessage";
import TimestampMessage from "./TimestampMessage";
import FileMessage from "./FileMessage";
import { useChatViewScrollAnimation } from "@/hooks/useChatViewScrollAnimation";

function renderMessageWithType(messageState: MessageState): ReactNode {
  const rawMessage = messageState.getRawMessage();
  if (!rawMessage) return null;

  switch (rawMessage.type) {
    case "text":
      return <TextMessage messageState={messageState} />;
    case "timestamp":
      return <TimestampMessage messageState={messageState} />;
    case "file":
      return <FileMessage messageState={messageState} />;
    default:
      return null;
  }
}

function renderMessages(messageStateArr: MessageState[]): ReactNode {
  const message: ReactNode[] = [];

  let userId: string = "xxxNULLxxx";
  messageStateArr.forEach((messageState) => {
    const user = messageState.getUser();
    const rawMessage = messageState.getRawMessage();
    if (!user || !rawMessage) return;

    const showAvatar = userId === rawMessage.senderId ? false : true;
    message.push(
      <div
        key={rawMessage.messageId}
        className={`flex w-full gap-1 md:gap-3 ${messageState.isMessageFromSelf() ? "flex-row-reverse" : ""} ${showAvatar ? "mt-4" : ""}`}
      >
        <div className="mt-[4px]">
          {showAvatar ? (
            Avatar({ src: user.profilePicture, size: 30 })
          ) : (
            <div className="h-[30px] w-[30px]"></div>
          )}
        </div>
        {renderMessageWithType(messageState)}
      </div>,
    );
    if (showAvatar) userId = rawMessage.senderId;
  });

  return message;
}

const ChatAreaView = () => {
  const messageContainer = useMessageState();
  const selectedChat = useSelectedChatState();
  const messageStateArr = useMemo(() => {
    const selectedChatId = selectedChat.getSelectedChatId();
    return selectedChatId
      ? messageContainer.getAllMessages()[selectedChatId] || []
      : [];
  }, [messageContainer, selectedChat]);
  const chatView = useRef<HTMLDivElement>(null);
  useChatViewScrollAnimation(chatView, messageStateArr);

  return (
    <div
      ref={chatView}
      className="flex grow flex-col overflow-y-auto px-1 pb-5 pt-2 font-manrope md:px-5"
    >
      <div className="w-full grow"></div>
      {renderMessages(messageStateArr)}
    </div>
  );
};

export default ChatAreaView;
