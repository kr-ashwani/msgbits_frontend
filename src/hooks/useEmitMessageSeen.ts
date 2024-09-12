import { useEffect, useMemo, useRef } from "react";
import { MessageState } from "./AppSelector/useMessageState";
import { SelectedChatState } from "./AppSelector/useSelectedChatState";
import { useSocketEmiterService } from "./useSocketEmiterService";
import { IMessage } from "@/schema/MessageSchema";

export const useEmitMessageSeen = (
  messageStateArr: MessageState[],
  selectedChat: SelectedChatState,
) => {
  const chatRoomLastDeliveredMsg = useRef<{ [p in string]: string }>({});
  const [msgArr, chatRoom] = useMemo(
    () => [messageStateArr, selectedChat],
    [messageStateArr, selectedChat],
  );
  const socketService = useSocketEmiterService();

  useEffect(() => {
    const emitMsgArr: IMessage[] = [];
    let tempLastDeliveredMsg = "";
    const chatRoom = selectedChat.getSelectedChatId();
    if (!chatRoom) return;
    for (let i = msgArr.length - 1; i >= 0; i--) {
      const msg = msgArr[i];
      const rawMsg = msg.getRawMessage();
      if (!rawMsg) continue;
      if (chatRoom !== rawMsg.chatRoomId) continue;

      if (msg.messageId === chatRoomLastDeliveredMsg.current[chatRoom]) break;
      // It should be other user's message
      if (!msg.isMessageFromSelf()) {
        if (!tempLastDeliveredMsg && msg.isMessageAlreadySeen())
          tempLastDeliveredMsg = msg.messageId;

        emitMsgArr.push(rawMsg);
        if (!tempLastDeliveredMsg) tempLastDeliveredMsg = msg.messageId;
      }
    }
    if (tempLastDeliveredMsg)
      chatRoomLastDeliveredMsg.current[chatRoom] = tempLastDeliveredMsg;
    // emit all message which needs to be marked as delivered
    socketService.updateMsgStatus("seen", emitMsgArr);
  }, [msgArr, chatRoom, socketService, selectedChat]);
};
