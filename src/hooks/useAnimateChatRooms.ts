import { sleep } from "@/utils/custom/sleep";
import { useEffect, useRef } from "react";
import { ChatRoomState } from "./AppSelector/useChatRoomState";

export const useAnimateChatRooms = (chatRoomList: ChatRoomState[]) => {
  const isMounted = useRef(false);

  useEffect(() => {
    async function animate() {
      if (!chatRoomList.length) return;

      if (isMounted.current) await sleep(50);

      chatRoomList.forEach((chatRoom, index, arr) => {
        const doc = document.getElementById(chatRoom.chatRoomId);
        if (doc)
          doc.style.cssText = `z-index:${arr.length - index}; ${isMounted.current ? "transition: transform 250ms ease-in-out" : ""};transform:translateY(calc(${index} * var(--chatRoom-height)));`;
      });

      if (!isMounted.current) isMounted.current = true;
    }
    animate();
  }, [chatRoomList]);
};
