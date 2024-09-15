import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useSelectedChatDispatch } from "@/hooks/AppDispatcher/useSelectedChatDispatch";
import { useShowChatRoomDetailsDispatch } from "@/hooks/AppDispatcher/useShowChatRoomDetailsDispatch";
import {
  ChatRoomState,
  useChatRoomState,
} from "@/hooks/AppSelector/useChatRoomState";
import { IUser } from "@/schema/userSchema";
import React from "react";

const ChatMemberDropdown = ({
  member,
  chatRoomState,
}: {
  member: IUser;
  chatRoomState: ChatRoomState;
}) => {
  const selectChatDispatch = useSelectedChatDispatch();
  const chatRoomContainer = useChatRoomState();
  const showChatRoomDetailDispatch = useShowChatRoomDetailsDispatch();
  const userName = member.name.split(" ")[0];

  function handleMessageAndViewUser(action: "View" | "Message") {
    const chatRoomId = chatRoomContainer.getPrivateChatWithMemberId(member._id);
    selectChatDispatch.setSelectedChat(chatRoomId || member._id);
    if (action === "Message")
      showChatRoomDetailDispatch.toggleChatRoomDetails(false);
  }
  return (
    <div className="flex min-w-36 max-w-40 flex-col space-y-1 overflow-hidden">
      <DropdownMenuItem
        className="truncate"
        onClick={() => handleMessageAndViewUser("Message")}
      >{`Message ${userName}`}</DropdownMenuItem>
      <DropdownMenuItem
        className="truncate"
        onClick={() => handleMessageAndViewUser("View")}
      >{`View ${userName}`}</DropdownMenuItem>
      {chatRoomState.isChatRoomAdmin() ? (
        <>
          {chatRoomState.isChatRoomAdmin(member._id) ? (
            <DropdownMenuItem className="truncate">
              Dismiss as admin
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem className="truncate">
              Make group Admin
            </DropdownMenuItem>
          )}
          <DropdownMenuItem className="truncate">{`Remove ${userName}`}</DropdownMenuItem>
        </>
      ) : null}
    </div>
  );
};

export default ChatMemberDropdown;
