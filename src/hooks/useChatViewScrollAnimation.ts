import { useRef, useEffect } from "react";
import { MessageState } from "./AppSelector/useMessageState";
import { useAppSelector } from "@/lib/store/hooks";

export const useChatViewScrollAnimation = (
  chatView: React.RefObject<HTMLDivElement>,
  messageStateArr: MessageState[],
) => {
  const isMounted = useRef(false);
  const selectedChatId = useAppSelector((state) => state.chat.selectedChat);

  useEffect(() => {
    isMounted.current = false;
  }, [selectedChatId]);

  useEffect(() => {
    if (!messageStateArr.length) return;
    const chatViewComp = chatView.current;
    if (chatViewComp) {
      if (isMounted.current) chatViewComp.style.scrollBehavior = "smooth";
      else chatViewComp.style.scrollBehavior = "";

      chatViewComp.scrollTop = chatViewComp.scrollHeight;
    }
    if (!isMounted.current) isMounted.current = true;
  }, [messageStateArr.length, chatView]);
};
