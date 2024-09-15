import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Dialog } from "@/components/utility/Dialog";
import { useSelectedChatDispatch } from "@/hooks/AppDispatcher/useSelectedChatDispatch";
import { useShowChatRoomDetailsDispatch } from "@/hooks/AppDispatcher/useShowChatRoomDetailsDispatch";
import {
  ChatRoomState,
  useChatRoomState,
} from "@/hooks/AppSelector/useChatRoomState";
import { useChatService } from "@/hooks/chat/useChatService";
import { IUser } from "@/schema/userSchema";
import { capitalizeStr } from "@/utils/custom/capitalizeStr";
import React, { useState } from "react";

type DialogAction = "makeAdmin" | "dismissAdmin" | "removeUser" | "default";
interface DialogContent {
  type: DialogAction;
  title: string;
  description: string;
  confirmButtonText: string;
  cancelButtonText: string;
}

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
  const [dialogContent, setDialogContent] = useState<DialogContent>(
    getChatMemberDialogContent("default"),
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const chatService = useChatService();

  function handleMessageAndViewUser(action: "View" | "Message") {
    const chatRoomId = chatRoomContainer.getPrivateChatWithMemberId(member._id);
    selectChatDispatch.setSelectedChat(chatRoomId || member._id);
    if (action === "Message")
      showChatRoomDetailDispatch.toggleChatRoomDetails(false);
  }

  function getChatMemberDialogContent(type: DialogAction): DialogContent {
    const baseDialog = {
      type,
      cancelButtonText: "Cancel",
      description: "",
      confirmButtonText: "",
      title: "Are you sure?",
    };

    switch (type) {
      case "makeAdmin":
        return {
          ...baseDialog,
          description: `Are you sure you want to make ${capitalizeStr(member.name)} the group admin?`,
          confirmButtonText: "Make admin",
        };
      case "dismissAdmin":
        return {
          ...baseDialog,
          description: `Are you sure you want to remove ${capitalizeStr(member.name)} as the group admin?`,
          confirmButtonText: "Remove admin",
        };
      case "removeUser":
        return {
          ...baseDialog,
          description: `Are you sure you want to remove ${capitalizeStr(member.name)} from the group?`,
          confirmButtonText: "Remove user",
        };
      default:
        return baseDialog;
    }
  }

  function handleDialogOpen(type: DialogAction, event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    setDialogContent(getChatMemberDialogContent(type));
    setIsDialogOpen(true);
  }

  function handleDialogClose(state: boolean) {
    setIsDialogOpen(false);
  }

  function handleSuccessDialogOperation(dialogContent: DialogAction) {
    switch (dialogContent) {
      case "makeAdmin":
        chatService.promoteToAdminInChatRoom(
          chatRoomState.chatRoomId,
          member._id,
          member.name,
        );
        break;
      case "dismissAdmin":
        chatService.demoteAdminInChatRoom(
          chatRoomState.chatRoomId,
          member._id,
          member.name,
        );
        break;
      case "removeUser":
        chatService.removeUserFromChatRoom(
          chatRoomState.chatRoomId,
          member._id,
          member.name,
        );
        break;
    }
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
            <DropdownMenuItem
              onClick={(e) => handleDialogOpen("dismissAdmin", e)}
              className="truncate"
            >
              Dismiss as admin
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={(e) => handleDialogOpen("makeAdmin", e)}
              className="truncate"
            >
              Make group Admin
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={(e) => handleDialogOpen("removeUser", e)}
            className="truncate"
          >{`Remove ${userName}`}</DropdownMenuItem>
        </>
      ) : null}
      <Dialog
        title={dialogContent.title}
        description={dialogContent.description}
        cancelButtonText={dialogContent.cancelButtonText}
        confirmButtonText={dialogContent.confirmButtonText}
        alertDialogProps={{
          onOpenChange: handleDialogClose,
          open: isDialogOpen,
        }}
        onConfirm={() => handleSuccessDialogOperation(dialogContent.type)}
        confirmClassName={
          ["removeUser", "dismissAdmin"].includes(dialogContent.type)
            ? "bg-alert-red-500"
            : ""
        }
      >
        {null}
      </Dialog>
    </div>
  );
};

export default ChatMemberDropdown;
