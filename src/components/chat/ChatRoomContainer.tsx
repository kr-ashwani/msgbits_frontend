"use client";

import { DisplayComponent } from "@/app/(protected)/chat/page";

const ChatRoomContainer = ({
  displayComponent,
}: {
  displayComponent: DisplayComponent;
}) => {
  return (
    <section id="chatRoomContainer" className="h-full w-full">
      <p>Chat Room Container</p>

      <button
        onClick={() =>
          displayComponent.setShowchatRoomMessages &&
          displayComponent.setShowchatRoomMessages(true)
        }
      >
        OPEN
      </button>
    </section>
  );
};

export default ChatRoomContainer;
