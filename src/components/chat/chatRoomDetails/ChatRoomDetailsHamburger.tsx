import useSlide from "@/components/StackSlider/hooks/useSlide";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChatRoomState } from "@/hooks/AppSelector/useChatRoomState";
import { EllipsisVertical } from "lucide-react";
import React from "react";

const ChatRoomDetailsHamburger = () => {
  const { trigerSlider } = useSlide();

  return (
    <div className="absolute right-0 top-0 cursor-pointer">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="p-2">
            <EllipsisVertical size={21} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full overflow-hidden p-[10px] font-manrope font-medium text-body-color">
          <DropdownMenuItem
            className="truncate"
            onClick={() => {
              trigerSlider("open", "EditChatRoomName");
            }}
          >{`Edit group name`}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ChatRoomDetailsHamburger;
