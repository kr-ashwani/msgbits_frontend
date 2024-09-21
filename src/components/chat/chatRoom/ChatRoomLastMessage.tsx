import { useChatTypingStatusState } from "@/hooks/AppSelector/useChatTypingStatusState";
import { MessageState } from "@/hooks/AppSelector/useMessageState";

import React, { useMemo } from "react";
import TypingIndicator from "../chatRoomMessage/TypingIndicator";

const ChatRoomLastMessage = ({
  messageState,
}: {
  messageState: MessageState;
}) => {
  const typingStatus = useChatTypingStatusState();
  const typingMessage = useMemo(() => {
    const member = typingStatus.getUser(messageState.getChatRoomId() ?? "");

    if (!member) return null;
    return member.userName === "You"
      ? "You are typing"
      : `${member.userName} is typing`;
  }, [typingStatus, messageState]);

  return (
    <div className="truncate">
      {typingMessage ? (
        <div className="flex items-center gap-[1px] pr-4">
          <div className="truncate">{typingMessage}</div>
          <TypingIndicator size="small" className="mt-[6px] pl-2" />
        </div>
      ) : (
        messageState.getMessageText()
      )}
    </div>
  );
};

export default ChatRoomLastMessage;
