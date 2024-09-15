import { useSelectedChatDispatch } from "@/hooks/AppDispatcher/useSelectedChatDispatch";
import React from "react";
import Avatar from "../../utility/Avatar";
import { ChatRoomState } from "@/hooks/AppSelector/useChatRoomState";
import { useMessageState } from "@/hooks/AppSelector/useMessageState";
import { useSelectedChatState } from "@/hooks/AppSelector/useSelectedChatState";

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
          className={`absolute bottom-0 left-[-8px] top-0 transition-transform duration-300 ${isChatSelected ? "translate-x-1" : "translate-x-0"} w-2 bg-theme-color`}
        ></div>
      </div>
      <div
        className={`absolute inset-0 overflow-hidden bg-theme-color ${isChatSelected ? "opacity-[0.08]" : "opacity-0"} transition-opacity duration-300`}
      ></div>
      <div
        className={`flex w-full gap-4 transition-transform duration-300 ${isChatSelected ? "translate-x-1" : "translate-x-0"}`}
      >
        <Avatar src={chatRoomState.getChatRoomPicture()} size={45} />
        <div className="w-full overflow-hidden">
          <p className="truncate whitespace-pre-wrap pb-[1px] text-[16px] font-semibold">
            {chatRoomState.getChatRoomName()}
          </p>
          <div className="flex items-center justify-between text-[14px] font-medium text-msg-message lg:text-[13px]">
            <span className="truncate">{messageState?.getMessageText()}</span>
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
