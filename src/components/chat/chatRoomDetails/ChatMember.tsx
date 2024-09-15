import React, { useCallback, useRef, useState } from "react";
import Avatar from "@/components/utility/Avatar";
import { IUser } from "@/schema/userSchema";
import { ChatRoomState } from "@/hooks/AppSelector/useChatRoomState";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ChatMemberDropdown from "./ChatMemberDropdown";
import { capitalizeStr } from "@/utils/custom/capitalizeStr";

const ChatMember: React.FC<{
  member: IUser;
  chatRoomState: ChatRoomState;
}> = ({ member, chatRoomState }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = chatRoomState.getUserInfo();

  const handleShowDropdown = useCallback(() => {
    if (chatRoomState.getUserInfo()?._id !== member._id)
      setIsDropdownOpen(true);
  }, [chatRoomState, member]);

  const handleDropdownChange = useCallback((open: boolean) => {
    if (!open) {
      setIsDropdownOpen(false);
    }
  }, []);

  function getMemberName(member: IUser) {
    const { _id: memberId, name: memberName } = member;
    return user?._id === memberId ? "You" : capitalizeStr(memberName);
  }

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={handleDropdownChange}>
      <DropdownMenuTrigger asChild>
        <div
          onClick={handleShowDropdown}
          className="flex h-full w-full cursor-pointer select-none items-center gap-5 px-5 py-3 hover:bg-msg-hover-bg focus:bg-msg-hover-bg"
        >
          <div className="relative">
            <Avatar src={member.profilePicture} size={40} />
          </div>
          <div className="flex grow flex-col items-start overflow-hidden">
            <p className="truncate text-sm font-semibold">
              {getMemberName(member)}
            </p>
            <p className="truncate text-xs font-medium text-msg-message">
              {member.email}
            </p>
          </div>
          {chatRoomState.isChatRoomAdmin(member._id) && (
            <div className="relative flex items-center justify-center p-1 px-2">
              <div className="absolute inset-0 rounded-md bg-theme-color opacity-10"></div>
              <p className="text-xs font-medium text-theme-color">Admin</p>
            </div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full overflow-hidden p-[10px] font-manrope font-medium text-body-color">
        <ChatMemberDropdown member={member} chatRoomState={chatRoomState} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChatMember;
