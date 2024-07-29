"use client";
import { DisplayComponent } from "@/app/(protected)/chat/page";
import useLeftSwipeToggle from "@/hooks/useLeftSwipeToggle";
import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";

const ChatRoomDetails = ({
  displayComponent,
  setShowChatRoomDetail,
}: {
  displayComponent: DisplayComponent;
  setShowChatRoomDetail: Dispatch<SetStateAction<boolean>>;
}) => {
  const [showComponent, setShowComponent] = useState(false);
  const comp = useRef<HTMLElement>(null);

  useLeftSwipeToggle(comp, displayComponent.setShowchatRoomDetails);

  useEffect(() => {
    displayComponent.setShowchatRoomDetails = setShowComponent;
  }, [displayComponent]);
  return (
    <section
      id="chatRoomDetails"
      ref={comp}
      className={`absolute inset-0 h-full w-[full] transition-transform ${showComponent ? "max-lg:translate-x-0" : "max-lg:translate-x-full"} md:left-[--chatRoomContainer-width] lg:relative lg:left-0 lg:min-w-[--chatRoomDetail-width]`}
    >
      <p>Chat Room Details</p>
      <button
        onClick={() => {
          displayComponent.setShowchatRoomDetails &&
            displayComponent.setShowchatRoomDetails(false);
          setShowChatRoomDetail(false);
        }}
      >
        CLOSE
      </button>
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
