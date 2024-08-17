import { useSelectedChatDispatch } from "@/hooks/AppDispatcher/useSelectedChatDispatch";
import React from "react";
import UserAvatar from "../utility/UserAvatar";
import { ChatRoomState } from "@/hooks/AppSelector/useChatRoomState";
import { useMessageState } from "@/hooks/AppSelector/useMessageState";
import { useSelectedChatState } from "@/hooks/AppSelector/useSelectedChatState";

const ChatRoom = ({ chatRoomState }: { chatRoomState: ChatRoomState }) => {
  const selectChatDispatch = useSelectedChatDispatch();
  const selectChatState = useSelectedChatState();
  const messageContainerState = useMessageState();
  const messageState = messageContainerState.getMessageById(
    chatRoomState.getLastChatRoomMessage(),
  );
  const isChatSelected =
    selectChatState.getSelectedChatRoom()?.chatRoomId ===
    chatRoomState.chatRoomId;
  return (
    <div
      className={`relative h-chatRoom-height w-full p-2 lg:p-4`}
      onClick={() =>
        selectChatDispatch.setSelectedChat(chatRoomState.chatRoomId)
      }
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute bottom-0 left-[-8px] top-0 transition-transform duration-200 ${isChatSelected ? "translate-x-1" : "translate-x-0"} w-2 bg-theme-color`}
        ></div>
      </div>
      <div
        className={`flex w-full gap-4 transition-transform duration-200 ${isChatSelected ? "translate-x-1" : "translate-x-0"}`}
      >
        <UserAvatar src={chatRoomState.getChatRoomPicture()} size={45} />
        <div className="w-full overflow-hidden">
          <p className="pb-[1px] text-[16px] font-semibold">
            {chatRoomState.getChatRoomName()}
          </p>
          <div className="flex items-center justify-between text-sm font-medium text-msg-message">
            <span className="truncate">{messageState?.getMessageText()}</span>
            <span className="text-nowrap before:mr-0.5 before:content-['•']">
              {messageState?.getLastMessageTimeFromNow()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
