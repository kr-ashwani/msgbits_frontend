import { useMessageState } from "@/hooks/AppSelector/useMessageState";
import { useSelectedChatState } from "@/hooks/AppSelector/useSelectedChatState";
import { useChatViewScrollAnimation } from "@/hooks/useChatViewScrollAnimation";
import { useMemo, useRef, useEffect } from "react";
import { renderMessages } from "./utils/renderMessage";
import {
  MsgStatus,
  resetMsgStatus,
  updateMsgStatusToDom,
} from "./utils/updateMsgStatusToDom";
import { useEmitMessageDelivered } from "@/hooks/useEmitMessageDelivered";

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
  const msgStatus = useRef<MsgStatus>(resetMsgStatus());
  useEmitMessageDelivered(messageStateArr, selectedChat);

  useEffect(() => {
    updateMsgStatusToDom(msgStatus.current, "show");
    const cloneStatus = { ...msgStatus.current };
    return () => updateMsgStatusToDom(cloneStatus, "hide");
  }, [selectedChat, messageStateArr]);
  return (
    <div
      ref={chatView}
      className="flex grow flex-col overflow-y-auto px-2 pb-5 pt-2 font-manrope md:px-2"
    >
      <div className="w-full grow"></div>
      {renderMessages(messageStateArr, msgStatus, selectedChat)}
    </div>
  );
};

export default ChatAreaView;
