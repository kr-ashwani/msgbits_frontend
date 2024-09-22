import Avatar from "@/components/utility/Avatar";
import { MessageState } from "@/hooks/AppSelector/useMessageState";
import { SelectedChatState } from "@/hooks/AppSelector/useSelectedChatState";
import { ReactNode } from "react";
import FileMessage from "../FileMessage";
import TextMessage from "../TextMessage";
import TimestampMessage from "../TimestampMessage";
import { MsgStatus, resetMsgStatus } from "./updateMsgStatusToDom";
import InfoMessage from "../InfoMessage";
import SwipeableRightElement from "../SwipeableRightElement";
import MessageFrame from "./MessageFrame";
import { ChatRoomDataDispatch } from "@/hooks/AppDispatcher/useChatRoomDataDispatch";

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
  chatRoomDataDispatch: ChatRoomDataDispatch,
): ReactNode {
  msgStatus.current = resetMsgStatus();

  const message: ReactNode[] = [];
  let userId: string = "xxxNULLxxx";

  messageStateArr.forEach((messageState) => {
    const user = messageState.getSenderUser();
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
          Avatar({ src: user.profilePicture, size: 30, className: "mt-1" })
        ) : (
          <div className="h-[30px] w-[30px]"></div>
        );
      } else {
        return (
          <div className="status relative flex h-[15px] w-[15px] items-center justify-center self-end pb-[5px] text-theme-color"></div>
        );
      }
    };

    const renderMessageFrame = () => {
      return (
        <div
          className={`flex flex-grow flex-col overflow-hidden ${selfMessage ? "items-end" : "items-start"}`}
        >
          {renderUserInfo()}
          {renderMessageWithType(messageState)}
        </div>
      );
    };
    const renderUserInfo = () => {
      return showAvatar &&
        !selfMessage &&
        selectedChat.getChatState()?.getChatType() === "group" ? (
        <div className="w-52 translate-y-[2px] truncate text-xs font-semibold text-msg-message">
          {messageState.getSenderUser()?.name}
        </div>
      ) : null;
    };

    message.push(
      rawMessage.type === "info" ? (
        <MessageFrame
          key={msgId}
          msgId={msgId}
          renderAvatar={renderAvatar}
          renderMessageFrame={renderMessageFrame}
          showAvatar={showAvatar}
          selfMessage={selfMessage}
        />
      ) : (
        <SwipeableRightElement
          key={msgId}
          leftBufferPx={60}
          onReply={() => {
            chatRoomDataDispatch.setRepliedToMessage({
              chatRoomId: rawMessage.chatRoomId,
              messageId: msgId,
            });
          }}
        >
          <MessageFrame
            msgId={msgId}
            renderAvatar={renderAvatar}
            renderMessageFrame={renderMessageFrame}
            showAvatar={showAvatar}
            selfMessage={selfMessage}
          />
        </SwipeableRightElement>
      ),
    );

    // for which user avatar has been shown
    if (showAvatar) userId = rawMessage.senderId;
    // if message is info msg then reset userid
    if (rawMessage.type === "info") userId = "xxxNULLxxx";
    else {
      // as we only show avatar and status for non-info msg
      const status = messageState.getSelfMessageStatus(selectedChat);
      if (status) updateMsgStatus(status, msgStatus, msgId);
    }
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
