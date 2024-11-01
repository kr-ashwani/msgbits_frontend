import { useAppSelector } from "@/lib/store/hooks";
import React, { useEffect } from "react";
import CallNotificationCard from "./CallNotificationCard";
import CallView from "./CallView";
import { useDispatch } from "react-redux";
import { useSocket } from "@/hooks/useSocket";
import { IWebRTCIncomingCall } from "@/schema/WebRTCSchema";
import { changeCallStatus } from "@/lib/store/features/chat/chatRoomDataSlice";

const CallContainer = () => {
  const callStatus = useAppSelector(
    (state) => state.chat.chatRoomData.callStatus,
  );
  const dispatch = useDispatch();
  const { socket } = useSocket();

  useEffect(() => {
    function handleIncomingCall(info: IWebRTCIncomingCall) {
      dispatch(
        changeCallStatus({
          status: "RINGING",
          info,
        }),
      );
    }

    socket.on("webrtc-incomingCall", handleIncomingCall);

    () => socket.off("webrtc-incomingCall", handleIncomingCall);
  }, [socket, dispatch]);

  if (callStatus.status === "RINGING") {
    const { info } = callStatus;
    return <CallNotificationCard callInfo={info} />;
  } else if (callStatus.status === "INCALL") return <CallView />;
  else return null;
};

export default CallContainer;
