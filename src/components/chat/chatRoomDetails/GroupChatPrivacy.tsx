import { ChatSvg } from "@/components/svg/chatSvg";
import { Dialog } from "@/components/utility/Dialog";
import { ChatRoomState } from "@/hooks/AppSelector/useChatRoomState";
import { useChatService } from "@/hooks/chat/useChatService";
import { capitalizeStr } from "@/utils/custom/capitalizeStr";
import React, { useRef } from "react";

const GroupChatPrivacy = ({
  chatRoomState,
}: {
  chatRoomState: ChatRoomState;
}) => {
  const chatService = useChatService();
  const warningRef = useRef<HTMLDivElement>(null);

  function handleLeaveGroup() {
    if (chatRoomState.areYouTheOnlyAdmin()) return warningRef.current?.click();
    chatService.exitChatRoom(chatRoomState.chatRoomId);
  }
  return (
    <div className="pt-3">
      <Dialog
        description={`Do you want to leave the ${capitalizeStr(chatRoomState.getChatRoomName())} group?`}
        onConfirm={handleLeaveGroup}
        cancelButtonText="Go Back"
        confirmButtonText="Exit"
        confirmClassName="bg-alert-red-500"
      >
        <div className="flex cursor-pointer gap-4 px-8 py-4 text-alert-red-500 hover:bg-msg-hover-bg">
          {ChatSvg("exitIcon")}
          <p className="font-semibold">Exit group</p>
        </div>
      </Dialog>
      <Dialog
        title="Admin Action Required"
        description={`You are the only admin of the ${capitalizeStr(chatRoomState.getChatRoomName())} group. Please promote another member to admin before leaving or taking other actions.`}
        cancelButtonText="Cancel"
        confirmButtonText="Make admin"
      >
        <div ref={warningRef}></div>
      </Dialog>
    </div>
  );
};

export default GroupChatPrivacy;
