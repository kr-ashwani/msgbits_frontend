import Avatar from "@/components/utility/Avatar";
import { MessageState } from "@/hooks/AppSelector/useMessageState";
import { SelectedChatState } from "@/hooks/AppSelector/useSelectedChatState";
import { ReactNode } from "react";
import FileMessage from "../FileMessage";
import TextMessage from "../TextMessage";
import TimestampMessage from "../TimestampMessage";
import { MsgStatus, resetMsgStatus } from "./updateMsgStatusToDom";
import InfoMessage from "../InfoMessage";

function renderMessageWithType(messageState: MessageState): ReactNode {
  const rawMessage = messageState.getRawMessage();
  if (!rawMessage) return null;

  switch (rawMessage.type) {
    case "text":
      return <TextMessage messageState={messageState} />;
    case "info":
      return rawMessage.message === "TIMESTAMP" ? (
        <TimestampMessage messageState={messageState} />
      ) : (
        <InfoMessage messageState={messageState} />
      );
    case "file":
      return <FileMessage messageState={messageState} />;
    default:
      return null;
  }
}

export function renderMessages(
  messageStateArr: MessageState[],
  msgStatus: React.MutableRefObject<MsgStatus>,
  selectedChat: SelectedChatState,
): ReactNode {
  resetMsgStatus();

  const message: ReactNode[] = [];
  let userId: string = "xxxNULLxxx";

  messageStateArr.forEach((messageState) => {
    const user = messageState.getUser();
    const rawMessage = messageState.getRawMessage();
    if (!user || !rawMessage) return;

    const showAvatar =
      rawMessage.type === "info" ? false : userId !== rawMessage.senderId;
    const selfMessage = messageState.isMessageFromSelf();
    const msgId = rawMessage.messageId;

    const renderAvatar = () => {
      if (rawMessage.type === "info") return null;
      if (!selfMessage) {
        return showAvatar ? (
          Avatar({ src: user.profilePicture, size: 30 })
        ) : (
          <div className="h-[30px] w-[30px]"></div>
        );
      } else {
        return (
          <div
            id={msgId}
            className="relative flex h-[15px] w-[15px] items-center justify-center self-end pb-[5px] text-theme-color"
          ></div>
        );
      }
    };

    message.push(
      <div
        key={msgId}
        className={`flex w-full gap-1 ${selfMessage ? "flex-row-reverse gap-[6px]" : "md:gap-3"} ${
          showAvatar ? "mt-[10px]" : ""
        }`}
      >
        {renderAvatar()}
        {renderMessageWithType(messageState)}
      </div>,
    );

    if (showAvatar) userId = rawMessage.senderId;

    const status = messageState.getSelfMessageStatus(selectedChat);
    if (status) updateMsgStatus(status, msgStatus, msgId);
  });

  return message;
}
type Status = "pending" | "sent" | "seen" | "delivered";
const updateMsgStatus = (
  status: Status,
  msgStatus: React.MutableRefObject<MsgStatus>,
  messageId: string,
) => {
  const obj: Record<Status, keyof MsgStatus> = {
    pending: "lastPendingMsg",
    sent: "lastSentMsg",
    delivered: "lastDeliveredMsg",
    seen: "lastSeenMsg",
  };

  const entries = Object.entries(obj);
  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i];
    if (key === status) {
      msgStatus.current[value] = messageId;
      break;
    } else msgStatus.current[value] = null;
  }
};
