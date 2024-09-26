import { useChatRoomDataDispatch } from "@/hooks/AppDispatcher/useChatRoomDataDispatch";
import { MessageState } from "@/hooks/AppSelector/useMessageState";
import React from "react";
import { REPLIED_TO_DURATION, REPLIED_TO_HEIGHT } from "./ChatAreaView";
import RepliedToMessage from "./RepliedToMessage";
import { MessageSvg } from "@/components/svg/MessageSvg";

const RepliedToMessageDrawer = ({
  repliedMessage,
}: {
  repliedMessage: MessageState | null;
}) => {
  const chatRoomDataDispacth = useChatRoomDataDispatch();

  return (
    <div
      className="absolute left-0 right-0"
      style={{
        bottom: `${-1 * REPLIED_TO_HEIGHT}px`,
      }}
    >
      <div
        className={`flex w-full items-center bg-input-bg p-3`}
        style={{
          height: `${REPLIED_TO_HEIGHT}px`,
          transform: repliedMessage
            ? `translateY(${-1 * REPLIED_TO_HEIGHT}px)`
            : "",
          transition: `transform ${REPLIED_TO_DURATION}ms cubic-bezier(0.1, 0.82, 0.25, 1)`,
        }}
      >
        <RepliedToMessage repliedMessage={repliedMessage} />
        <div
          className="z-10 flex cursor-pointer items-center justify-center self-stretch p-3 px-4"
          onClick={() => {
            chatRoomDataDispacth.resetRepliedToMessage({
              chatRoomId: repliedMessage?.getChatRoomId() || "",
            });
          }}
        >
          {MessageSvg("xIcon")}
        </div>
      </div>
    </div>
  );
};

export default RepliedToMessageDrawer;
