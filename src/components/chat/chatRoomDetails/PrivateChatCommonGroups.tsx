import { ChatSvg } from "@/components/svg/chatSvg";
import Avatar from "@/components/utility/Avatar";
import { useChatRoomDataDispatch } from "@/hooks/AppDispatcher/useChatRoomDataDispatch";
import { useImagePreviewDispatch } from "@/hooks/AppDispatcher/useImagePreviewDispatch";
import { useSelectedChatDispatch } from "@/hooks/AppDispatcher/useSelectedChatDispatch";
import { useShowChatRoomDetailsDispatch } from "@/hooks/AppDispatcher/useShowChatRoomDetailsDispatch";
import { useChatRoomState } from "@/hooks/AppSelector/useChatRoomState";
import React from "react";

const PrivateChatCommonGroups = ({ memberId }: { memberId: string }) => {
  const chatContainer = useChatRoomState();
  const commonGroups = chatContainer.getCommonGroupChatById(memberId);
  const chatRoomDataDispatch = useChatRoomDataDispatch();
  const selectedChatDispatch = useSelectedChatDispatch();
  const showChatRoomDetailsDispatch = useShowChatRoomDetailsDispatch();
  const imagePreviewDispatch = useImagePreviewDispatch();

  function handleGroupCreation() {
    chatRoomDataDispatch.addNewGroupMembers([memberId]);

    // close any selected chat and toggle chatroom details
    selectedChatDispatch.setSelectedChat(null);
    showChatRoomDetailsDispatch.toggleChatRoomDetails(false);
  }

  function showGroupChat(chatRoomId: string) {
    selectedChatDispatch.setSelectedChat(chatRoomId);
    showChatRoomDetailsDispatch.toggleChatRoomDetails(false);
  }

  return (
    <div className="">
      <div className="px-6 py-3">
        <p className="font-semibold">
          {commonGroups.length} group{commonGroups.length > 1 ? "s" : ""} in
          common
        </p>
      </div>
      <div>
        <div
          onClick={handleGroupCreation}
          className="flex w-full cursor-pointer items-center gap-5 px-5 py-3 hover:bg-msg-hover-bg"
        >
          <div className="relative flex h-10 w-10 items-center justify-center text-theme-color">
            <div className="theme-color-Animation absolute inset-0 rounded-full bg-theme-color opacity-10"></div>
            {ChatSvg("groupChatIcon")}
          </div>
          <div className="flex flex-col overflow-hidden">
            <p className="truncate text-base font-semibold">
              Create group with {chatContainer.getChatRoomName(memberId)}
            </p>
          </div>
        </div>
        {commonGroups.map((chatRoom) => (
          <div
            onClick={() => showGroupChat(chatRoom.chatRoomId)}
            key={chatRoom.chatRoomId}
            className="flex w-full cursor-pointer items-center gap-5 px-5 py-3 hover:bg-msg-hover-bg"
          >
            <div className="relative">
              <Avatar
                onClick={(e) => {
                  e.stopPropagation();
                  imagePreviewDispatch.setImagePreview(
                    chatRoom.chatRoomPicture,
                  );
                }}
                src={chatRoom.chatRoomPicture}
                size={40}
              />
            </div>
            <div className="flex grow flex-col overflow-hidden">
              <p className="truncate text-sm font-semibold">
                {chatRoom.chatName}
              </p>
              <p className="truncate text-xs font-medium text-msg-message">
                {chatContainer
                  .getChatMembersNameExceptYou(chatRoom.chatRoomId)
                  .reduce<string>(
                    (acc, memberName, i, arr) =>
                      acc +
                      memberName.split(" ")[0] +
                      (i < arr.length - 1 ? ", " : ""),
                    "",
                  )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivateChatCommonGroups;
