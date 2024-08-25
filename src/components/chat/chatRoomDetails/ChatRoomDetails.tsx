"use client";
import { StackSlider } from "@/components/StackSlider/StatckSlider";
import { ChatSvg } from "@/components/svg/chatSvg";
import { useShowChatRoomDetailsDispatch } from "@/hooks/AppDispatcher/useShowChatRoomDetailsDispatch";
import { useSelectedChatState } from "@/hooks/AppSelector/useSelectedChatState";
import { useShowChatRoomDetailsState } from "@/hooks/AppSelector/useShowChatRoomDetailsState";
import { useRightSwipeToggle } from "@/hooks/useRightSwipeToggle";
import { useToggleChatRoomDetails } from "@/hooks/useToggleChatRoomDetails";
import { useRef } from "react";
import AddUserToChatRoom from "./AddUserToChatRoom";
import ChatRoomDetailsInfo from "./ChatRoomDetailsInfo";

const ChatRoomDetails = () => {
  const component = useRef<HTMLElement>(null);
  useRightSwipeToggle(component, (state) => {
    if (state) showChatRoomDetailsDispatch.toggleChatRoomDetails(false);
  });
  const showChatRoomDetail = useShowChatRoomDetailsState();
  const showChatRoomDetailsDispatch = useShowChatRoomDetailsDispatch();
  const chatRoomState = useSelectedChatState().getChatState();

  useToggleChatRoomDetails(showChatRoomDetail);

  return (
    <StackSlider mainStackClass="h-full">
      <section
        id="chatRoomDetails"
        ref={component}
        className={`absolute inset-0 h-full w-[full] overflow-y-auto bg-[--theme-bg-color] transition-transform ${showChatRoomDetail.isChatRoomDetailsSelected() ? "max-lg:translate-x-0" : "max-lg:translate-x-full"} md:left-[--chatRoomContainer-width] lg:relative lg:left-0 lg:min-w-[--chatRoomDetail-width]`}
      >
        <div className="flex h-[65px] shrink-0 cursor-pointer items-center border-b-[1px] border-border-color px-3 py-3 lg:px-5">
          <div
            className="cursor-pointer"
            onClick={() =>
              showChatRoomDetailsDispatch.toggleChatRoomDetails(false)
            }
          >
            {ChatSvg("backArrow")}
          </div>

          <p className="grow pl-2 text-xl font-semibold">Chat Room Details</p>
        </div>
        {chatRoomState ? (
          <ChatRoomDetailsInfo chatRoomState={chatRoomState} />
        ) : null}
      </section>

      {chatRoomState ? (
        <AddUserToChatRoom
          name="AddUserToChatRoom"
          chatRoomState={chatRoomState}
        />
      ) : null}
    </StackSlider>
  );
};

export default ChatRoomDetails;
