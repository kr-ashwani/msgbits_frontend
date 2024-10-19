import { useSelectedChatDispatch } from "@/hooks/AppDispatcher/useSelectedChatDispatch";
import React, { useMemo } from "react";
import Avatar from "../../utility/Avatar";
import { ChatRoomState } from "@/hooks/AppSelector/useChatRoomState";
import { useMessageState } from "@/hooks/AppSelector/useMessageState";
import { useSelectedChatState } from "@/hooks/AppSelector/useSelectedChatState";
import { useChatUnreadMessages } from "@/hooks/chat/useChatUnreadMessages";
import ChatRoomLastMessage from "./ChatRoomLastMessage";
import StatusAvatar from "../user/StatusAvatar";
import { useImagePreview } from "@/context/ImagePreviewContext";

const ChatRoom = ({
  chatRoomState,
  index,
}: {
  chatRoomState: ChatRoomState;
  index: number;
}) => {
  const selectChatDispatch = useSelectedChatDispatch();
  const selectChatState = useSelectedChatState();
  const messageContainerState = useMessageState();
  const messageState = messageContainerState.getLastMessage(
    chatRoomState.getLastMessageId() || "",
  );
  const isChatSelected =
    selectChatState.getSelectedChatId() === chatRoomState.chatRoomId;

  const chatUnreadMsg = useChatUnreadMessages();
  const { setSingleImagePreview } = useImagePreview();

  const unreadMsgCount = useMemo(
    () => chatUnreadMsg.getUnreadMessages(chatRoomState.chatRoomId),
    [chatUnreadMsg, chatRoomState],
  );

  function viewChatPicture(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    e.stopPropagation();
    setSingleImagePreview(chatRoomState.getChatRoomPicture());
  }

  return (
    <div
      className={`absolute flex h-chatRoom-height w-full shrink-0 cursor-pointer items-center bg-theme-bg-color p-2 hover:bg-msg-hover-bg lg:p-4`}
      id={chatRoomState.chatRoomId}
      onClick={() =>
        selectChatDispatch.setSelectedChat(chatRoomState.chatRoomId)
      }
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`theme-color-Animation absolute bottom-0 left-[-8px] top-0 transition-transform duration-300 ${isChatSelected ? "translate-x-1" : "translate-x-0"} w-2 bg-theme-color`}
        ></div>
      </div>
      <div
        className={`theme-color-Animation absolute inset-0 overflow-hidden bg-theme-color ${isChatSelected ? "opacity-[0.08]" : "opacity-0"} transition-opacity duration-300`}
      ></div>
      <div
        className={`flex w-full gap-4 transition-transform duration-300 ${isChatSelected ? "translate-x-1" : "translate-x-0"}`}
      >
        {chatRoomState.getChatType() === "group" ? (
          <Avatar
            onClick={viewChatPicture}
            src={chatRoomState.getChatRoomPicture()}
            size={45}
          />
        ) : (
          <StatusAvatar
            onClick={viewChatPicture}
            userId={chatRoomState.getOtherUserIdInPrivateChat()}
            src={chatRoomState.getChatRoomPicture()}
            size={45}
          />
        )}
        <div className="w-full overflow-hidden">
          <div className="flex items-center gap-2 truncate pb-[2px] text-[16px] font-semibold">
            <span className="flex-grow truncate">
              {chatRoomState.getChatRoomName()}
            </span>
            {unreadMsgCount ? (
              <div className="theme-color-Animation mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-theme-color text-[11px] text-white">
                {unreadMsgCount}
              </div>
            ) : null}
          </div>
          <div className="flex items-center justify-between text-[14px] font-medium text-msg-message lg:text-[13px]">
            {messageState ? (
              <ChatRoomLastMessage messageState={messageState} />
            ) : null}
            <span className="whitespace-pre-wrap text-nowrap before:mr-0.5 before:content-['•']">
              {messageState?.getLastMessageTimeFromNow()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
