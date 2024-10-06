import { ChatSvg } from "@/components/svg/chatSvg";
import React, { useLayoutEffect, useState } from "react";
import GroupChatMembers from "./GroupChatMembers";
import GroupChatPrivacy from "./GroupChatPrivacy";
import PrivateChatCommonGroups from "./PrivateChatCommonGroups";
import SharedPhotos from "./SharedPhotos";
import { ChatRoomState } from "@/hooks/AppSelector/useChatRoomState";
import AvatarUpdatable from "@/components/utility/AvatarUpdatable";
import StatusAvatar from "../user/StatusAvatar";
import { useChatRoomDispatch } from "@/hooks/AppDispatcher/useChatRoomDispatch";
import { useSocket } from "@/hooks/useSocket";
import ChatRoomDetailsHamburger from "./ChatRoomDetailsHamburger";

const ChatRoomDetailsInfo = ({
  chatRoomState,
}: {
  chatRoomState: ChatRoomState;
}) => {
  const [userSrc, setUserSrc] = useState(
    chatRoomState.getChatRoomPicture() || "",
  );
  const chatRoomDispatch = useChatRoomDispatch();
  const { socketQueue } = useSocket();

  useLayoutEffect(() => {
    const pic = chatRoomState.getChatRoomPicture();
    if (pic) setUserSrc(pic);
  }, [chatRoomState]);

  const rawChatRoom = chatRoomState.getRawChatRoom();
  const memberId = chatRoomState.getOtherUserIdInPrivateChat();
  if (!rawChatRoom) return null;

  function handleChatProfilePicChange(newUrl: string, fileId: string) {
    if (!rawChatRoom) return null;
    const updatedProfile = {
      chatRoomId: rawChatRoom.chatRoomId,
      updatedProfilePicture: newUrl,
      updatedName: null,
    };
    chatRoomDispatch.updateGroupChatProfilePicOrName(updatedProfile);
    // to server send fileId instead of url
    if (fileId) updatedProfile.updatedProfilePicture = fileId;
    socketQueue.emit("chatroom-updateChatNameOrPic", updatedProfile);
  }

  return (
    <div className="relative flex h-full shrink-0 flex-col gap-2 overflow-y-auto py-7">
      <div className="flex flex-col items-center gap-[10px] px-7">
        {rawChatRoom.type === "group" ? <ChatRoomDetailsHamburger /> : null}
        <div>
          {rawChatRoom.type === "private" ? (
            <StatusAvatar
              indicatorClass="bottom-[1%] right-[18%] w-4 h-4"
              userId={memberId}
              src={userSrc}
              size={120}
            />
          ) : (
            <AvatarUpdatable
              avatarClassName="text-white"
              imageUploadClass="bottom-0 right-[12%] h-8 w-8 p-1"
              src={userSrc}
              setSrc={setUserSrc}
              showBg={false}
              size={120}
              onSrcUrlChange={handleChatProfilePicChange}
            />
          )}
        </div>
        <div className="text-lg font-semibold">
          {chatRoomState.getChatRoomName()}
        </div>
        <div className="mt-[-5px] text-xs font-semibold text-msg-date">{`Created by ${chatRoomState?.getChatRoomCreatorName()}, ${chatRoomState?.getChatRoomCreatorDate()}`}</div>
        <div className="mt-[10px] flex w-full gap-2 text-theme-color">
          <div className="relative flex w-0 grow cursor-pointer items-center justify-center gap-2 py-3 text-sm font-medium">
            <div className="theme-color-Animation absolute inset-0 rounded-md bg-theme-color opacity-10"></div>
            {ChatSvg("callIcon")}
            <span>Call Group</span>
          </div>
          <div className="relative flex w-0 grow cursor-pointer items-center justify-center gap-2 py-3 text-sm font-medium">
            <div className="theme-color-Animation absolute inset-0 rounded-md bg-theme-color opacity-10"></div>
            {ChatSvg("videoIcon")}
            <span>Video Chat</span>
          </div>
        </div>
      </div>

      <div className="relative mx-6 flex pt-3 text-setting-icon-color">
        <input
          className="w-0 grow border-b-[1px] border-border-color py-3 pr-6 text-[15px] font-semibold text-body-color outline-none"
          placeholder="Search in Conversation"
        />
        <div className="absolute right-0 self-center">
          {ChatSvg("search", { width: "20px", height: "20px" })}
        </div>
      </div>

      <SharedPhotos />

      {rawChatRoom.type === "group" ? (
        <>
          <GroupChatMembers chatRoomState={chatRoomState} />
          <GroupChatPrivacy chatRoomState={chatRoomState} />
        </>
      ) : memberId ? (
        <PrivateChatCommonGroups memberId={memberId} />
      ) : null}

      <div className="h-16 w-full shrink-0"></div>
    </div>
  );
};

export default ChatRoomDetailsInfo;
