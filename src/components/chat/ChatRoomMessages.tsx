"use client";
import { DisplayComponent } from "@/app/(protected)/chat/page";
import useLeftSwipeToClose from "@/hooks/useLeftSwipeToClose";
import { MutableRefObject, useEffect, useRef, useState } from "react";

const ChatRoomMessages = ({
  displayComponent,
}: {
  displayComponent: MutableRefObject<DisplayComponent>;
}) => {
  const [showComponent, setShowComponent] = useState(false);
  const comp = useRef<HTMLElement>(null);
  useLeftSwipeToClose(comp, displayComponent.current.chatRoomMessages);
  useEffect(() => {
    displayComponent.current.chatRoomMessages = setShowComponent;
  }, [displayComponent]);

  return (
    <section
      ref={comp}
      className={`absolute inset-0 h-full w-full bg-[#4338ca] transition-transform ${showComponent ? "translate-x-0" : "translate-x-full"}`}
    >
      <p>Chat Room Messages</p>
      <button
        onClick={() =>
          displayComponent.current.chatRoomDetails &&
          displayComponent.current.chatRoomDetails(true)
        }
      >
        OPEN
      </button>
      <button
        onClick={() =>
          displayComponent.current.chatRoomMessages &&
          displayComponent.current.chatRoomMessages(false)
        }
      >
        CLOSE
      </button>
    </section>
  );
};

export default ChatRoomMessages;
