"use client";
import { useShowChatRoomDetailsDispatch } from "@/hooks/AppDispatcher/useShowChatRoomDetailsDispatch";
import { useShowChatRoomDetailsState } from "@/hooks/AppSelector/useShowChatRoomDetailsState";
import { useRightSwipeToggle } from "@/hooks/useRightSwipeToggle";
import { useToggleChatRoomDetails } from "@/hooks/useToggleChatRoomDetails";
import { useRef } from "react";

const ChatRoomDetails = () => {
  const component = useRef<HTMLElement>(null);
  useRightSwipeToggle(component, null, (state) => {
    if (state) showChatRoomDetailsDispatch.toggleChatRoomDetails(false);
  });
  const showChatRoomDetail = useShowChatRoomDetailsState();
  const showChatRoomDetailsDispatch = useShowChatRoomDetailsDispatch();
  useToggleChatRoomDetails(showChatRoomDetail);

  return (
    <section
      id="chatRoomDetails"
      ref={component}
      className={`absolute inset-0 h-full w-[full] overflow-y-auto bg-[--theme-bg-color] transition-transform ${showChatRoomDetail.isChatRoomDetailsSelected() ? "max-lg:translate-x-0" : "max-lg:translate-x-full"} md:left-[--chatRoomContainer-width] lg:relative lg:left-0 lg:min-w-[--chatRoomDetail-width]`}
    >
      <p>Chat Room Details</p>
      <p
        onClick={() => showChatRoomDetailsDispatch.toggleChatRoomDetails(false)}
      >
        CLOSE
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
        veritatis impedit animi totam distinctio labore? In, quisquam. Esse
        nihil minima earum adipisci aliquam repudiandae tempore, unde a beatae
        maxime qui nisi incidunt ipsum ea necessitatibus delectus eum? Cumque
        repellendus aliquid est optio, voluptates, repellat eum animi
        repudiandae suscipit ipsa sint odit quis. Ad sint quae quas harum
        placeat. Modi quos eaque alias earum quibusdam, odio sunt veritatis esse
        voluptatem officia, qui doloribus porro dolorum voluptas incidunt
        obcaecati aspernatur consequuntur reiciendis tempora, libero illum
        quaerat aut! Nulla officia modi reiciendis sapiente adipisci voluptate
        tempore eveniet, iste, alias ipsum praesentium dolorem maiores!
      </p>
    </section>
  );
};

export default ChatRoomDetails;
