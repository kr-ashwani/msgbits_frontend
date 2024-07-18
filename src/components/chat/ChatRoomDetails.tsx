"use client";
import { DisplayComponent } from "@/app/(protected)/chat/page";
import useLeftSwipeToClose from "@/hooks/useLeftSwipeToClose";
import { MutableRefObject, useState, useEffect, useRef } from "react";

const ChatRoomDetails = ({
  displayComponent,
}: {
  displayComponent: MutableRefObject<DisplayComponent>;
}) => {
  const [showComponent, setShowComponent] = useState(false);
  const comp = useRef<HTMLElement>(null);

  useLeftSwipeToClose(comp, displayComponent.current.chatRoomDetails);

  useEffect(() => {
    displayComponent.current.chatRoomDetails = setShowComponent;
  }, [displayComponent]);
  return (
    <section
      ref={comp}
      className={`absolute inset-0 h-full w-full bg-[#9d174d] transition-transform ${showComponent ? "translate-x-0" : "translate-x-full"}`}
    >
      <p>Chat Room Details</p>
      <button
        onClick={() =>
          displayComponent.current.chatRoomDetails &&
          displayComponent.current.chatRoomDetails(false)
        }
      >
        CLOSE
      </button>
    </section>
  );
};

export default ChatRoomDetails;
