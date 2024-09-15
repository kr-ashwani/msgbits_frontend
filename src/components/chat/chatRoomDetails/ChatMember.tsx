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

const PRESS_DELAY = 300;

const ChatMember: React.FC<{
  member: IUser;
  chatRoomState: ChatRoomState;
}> = ({ member, chatRoomState }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const longPressTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPress = useRef(false);

  const handlePointerDown = useCallback(() => {
    isLongPress.current = false;
    longPressTimeoutRef.current = setTimeout(() => {
      isLongPress.current = true;
      if (chatRoomState.getUserInfo()?._id !== member._id)
        setIsDropdownOpen(true);
    }, PRESS_DELAY); //  long press
  }, [chatRoomState, member._id]);

  const handlePointerUp = useCallback(() => {
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
    }
    if (!isLongPress.current) {
      setIsDropdownOpen(false);
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
    }
  }, []);

  const handleDropdownChange = useCallback((open: boolean) => {
    if (!open) {
      setIsDropdownOpen(false);
    }
  }, []);

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={handleDropdownChange}>
      <DropdownMenuTrigger asChild>
        <div
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          className="flex h-full w-full cursor-pointer select-none items-center gap-5 px-5 py-3 hover:bg-msg-hover-bg focus:bg-msg-hover-bg"
        >
          <div className="relative">
            <Avatar src={member.profilePicture} size={40} />
          </div>
          <div className="flex grow flex-col items-start overflow-hidden">
            <p className="truncate text-sm font-semibold">{member.name}</p>
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
