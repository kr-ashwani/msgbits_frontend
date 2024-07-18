"use client";

import { DisplayComponent } from "@/app/(protected)/chat/page";
import { MutableRefObject } from "react";

const ChatRoomContainer = ({
  displayComponent,
}: {
  displayComponent: MutableRefObject<DisplayComponent>;
}) => {
  return (
    <section className="h-full w-full bg-[#701a75]">
      <p>Chat Room Container</p>

      <button
        onClick={() =>
          displayComponent.current.chatRoomMessages &&
          displayComponent.current.chatRoomMessages(true)
        }
      >
        OPEN
      </button>
    </section>
  );
};

export default ChatRoomContainer;
