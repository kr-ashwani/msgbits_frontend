import React, { useEffect, useRef } from "react";
import { Phone } from "lucide-react";
import { useChatRoomState } from "@/hooks/AppSelector/useChatRoomState";
import { SafeImage } from "@/components/utility/SafeImage";
import { sleep } from "@/components/StackSlider/utils/sleep";
import { useCallManager } from "@/hooks/chat/useCallManager";
import { useChatUserState } from "@/hooks/AppSelector/useChatUserState";
import { IWebRTCIncomingCall } from "@/schema/WebRTCSchema";

const CallNotificationCard = ({
  callInfo,
}: {
  callInfo: IWebRTCIncomingCall;
}) => {
  const chatRoomContainerState = useChatRoomState();
  const chatUser = useChatUserState();
  const notificationCardRef = useRef<HTMLDivElement>(null);
  const callManager = useCallManager();

  const { callId, callType, from } = callInfo;

  useEffect(() => {
    setTimeout(() => {
      if (notificationCardRef.current) {
        notificationCardRef.current.classList.remove("-translate-y-24");
        notificationCardRef.current.classList.add("translate-y-2");
      }
    }, 0);
  }, []);

  const chatRoomName = chatRoomContainerState.getChatRoomName(callId);
  const chatRoomPicture = chatRoomContainerState.getChatRoomPictureById(callId);
  const chatRoomType = chatRoomContainerState
    .getChatRoomById(callId)
    .getChatType();

  async function handleCall(type: "Accept" | "Reject") {
    if (type === "Accept") {
      callManager.answerCall(callInfo);
    }
    if (type === "Reject") {
      if (notificationCardRef.current) {
        notificationCardRef.current.classList.remove("translate-y-2");
        notificationCardRef.current.classList.add("-translate-y-24");
      }

      await sleep(300);
      callManager.declineCall();
    }
  }

  return (
    <div
      className="absolute left-1/2 top-0 z-50 w-full max-w-md -translate-x-1/2 -translate-y-24 !border-l-0 transition-transform"
      ref={notificationCardRef}
    >
      <div className="flex items-center gap-3 rounded-full bg-white px-4 py-3 shadow-lg">
        {/* Caller Image */}
        <SafeImage
          src={chatRoomPicture}
          alt={chatRoomName}
          className="h-12 w-12 rounded-full object-cover"
          width="48"
          height="48"
        />

        {/* Call Info */}
        <div className="flex grow flex-col overflow-hidden">
          <span className="truncate text-[16px] font-semibold">
            {chatRoomName}
          </span>
          <span className="truncate text-[14px] font-medium text-msg-message lg:text-[13px]">
            {`${chatUser.getUserById(from)?.name} is calling you...`}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 transition-colors hover:bg-green-600"
            aria-label="Accept call"
            onClick={() => handleCall("Accept")}
          >
            <Phone
              className="h-6 w-6 -rotate-90"
              strokeWidth={2.5}
              fill="#fff"
              style={{ color: "transparent" }}
            />
          </button>

          <button
            className="flex h-12 w-12 items-center justify-center rounded-full bg-alert-red-500 transition-colors hover:bg-red-600"
            aria-label="Decline call"
            onClick={() => handleCall("Reject")}
          >
            <Phone
              className="h-6 w-6 rotate-[135deg]"
              strokeWidth={2.5}
              fill="#fff"
              style={{ color: "transparent" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallNotificationCard;
