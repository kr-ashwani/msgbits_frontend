import { useChatTypingStatusState } from "@/hooks/AppSelector/useChatTypingStatusState";
import { MessageState } from "@/hooks/AppSelector/useMessageState";

import React, { ReactNode, useMemo } from "react";
import TypingIndicator from "../chatRoomMessage/TypingIndicator";
import { useChatRoomCallSession } from "@/hooks/AppSelector/useChatRoomCallSession";
import { Phone } from "lucide-react";

function displayLastMessage(messageState: MessageState): ReactNode {
  const rawMessage = messageState.getRawMessage();

  if (!rawMessage) return "";

  if (rawMessage.type === "file" && rawMessage.file.fileName)
    return rawMessage.file.fileName;

  return messageState.getMessageText();
}

const ChatRoomLastMessage = ({
  messageState,
}: {
  messageState: MessageState;
}) => {
  const typingStatus = useChatTypingStatusState();
  const callSession = useChatRoomCallSession();

  const typingMessage = useMemo(() => {
    const member = typingStatus.getUser(messageState.getChatRoomId() ?? "");

    if (!member) return null;
    return member.userName === "You"
      ? "You are typing"
      : `${member.userName} is typing`;
  }, [typingStatus, messageState]);

  if (callSession.isActiveCall(messageState.getChatRoomId() || ""))
    return (
      <div className="truncate">
        <div className="flex items-center gap-[1px] pr-4">
          <Phone size={13} className="fill-green-500 text-green-500" />
          <div className="ml-1 truncate">Call in Progress...</div>
        </div>
      </div>
    );

  return (
    <div className="truncate">
      {typingMessage ? (
        <div className="flex items-center gap-[1px] pr-4">
          <div className="truncate">{typingMessage}</div>
          <TypingIndicator size="small" className="mt-[6px] pl-2" />
        </div>
      ) : (
        displayLastMessage(messageState)
      )}
    </div>
  );
};

export default ChatRoomLastMessage;
