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
import { useEmitMessageSeen } from "@/hooks/useEmitMessageSeen";
import { useChatRoomDataDispatch } from "@/hooks/AppDispatcher/useChatRoomDataDispatch";
import { useRepliedToMessageState } from "@/hooks/AppSelector/useRepliedToMessageState";
import RepliedToMessageDrawer from "./RepliedToMessageDrawer";
import { useImagePreviewDispatch } from "@/hooks/AppDispatcher/useImagePreviewDispatch";

export const REPLIED_TO_HEIGHT = 100;
export const REPLIED_TO_DURATION = 250;

const ChatAreaView = () => {
  const messageContainer = useMessageState();
  const selectedChat = useSelectedChatState();
  const messageStateArr = useMemo(() => {
    const selectedChatId = selectedChat.getSelectedChatId();
    return selectedChatId
      ? messageContainer.getAllMessages()[selectedChatId] || []
      : [];
  }, [messageContainer, selectedChat]);

  const chatList = useRef<HTMLDivElement>(null);
  useChatViewScrollAnimation(chatList, messageStateArr);
  const msgStatus = useRef<MsgStatus>(resetMsgStatus());
  useEmitMessageSeen(messageStateArr, selectedChat);
  const chatRoomDataDispatch = useChatRoomDataDispatch();
  const repliedToMessageState = useRepliedToMessageState();
  const repliedMessage = useMemo(
    () => repliedToMessageState.getRepliedToMessage(),
    [repliedToMessageState],
  );
  const isAlreadyInReplyMode = useRef(false);
  const imagePreviewDispatch = useImagePreviewDispatch();

  useEffect(() => {
    updateMsgStatusToDom(msgStatus.current, "show");
    const cloneStatus = { ...msgStatus.current };
    return () => updateMsgStatusToDom(cloneStatus, "hide");
  }, [selectedChat, messageStateArr]);

  useEffect(() => {
    const chatView = chatList.current;
    if (!chatView) return;

    if (!repliedMessage) {
      chatView.style.scrollBehavior = "";
      chatView.scrollTop -= REPLIED_TO_HEIGHT;
      chatView.style.setProperty("height", `100%`);
      chatView.style.transform = `translateY(0px)`;
      chatView.style.scrollBehavior = "smooth";

      isAlreadyInReplyMode.current = false;
      return;
    }

    setTimeout(() => {
      if (isAlreadyInReplyMode.current) return;
      chatView.style.scrollBehavior = "";
      chatView.style.setProperty(
        "height",
        `calc(100% - ${REPLIED_TO_HEIGHT}px)`,
      );
      chatView.scrollTop += REPLIED_TO_HEIGHT;
      isAlreadyInReplyMode.current = true;
      chatView.style.scrollBehavior = "smooth";
    }, REPLIED_TO_DURATION);
    chatView.style.transform = `translateY(${-1 * REPLIED_TO_HEIGHT}px)`;
  }, [repliedMessage]);

  return (
    <div
      className={`relative z-[1] flex grow flex-col justify-end overflow-x-hidden overflow-y-hidden`}
    >
      <div
        ref={chatList}
        className={`chat-scroll-container relative z-[1] flex h-full flex-col overflow-y-auto overflow-x-hidden px-2 pb-5 pt-2 font-manrope md:px-2`}
        style={{
          transition: `transform ${REPLIED_TO_DURATION}ms cubic-bezier(0.1, 0.82, 0.25, 1)`,
        }}
      >
        <div key="XXX" className="w-full grow"></div>
        {renderMessages(
          messageStateArr,
          msgStatus,
          selectedChat,
          chatRoomDataDispatch,
          imagePreviewDispatch,
        )}
      </div>
      <RepliedToMessageDrawer repliedMessage={repliedMessage} />
    </div>
  );
};

export default ChatAreaView;
