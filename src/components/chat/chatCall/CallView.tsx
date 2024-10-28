import React from "react";
import VideoCallCard from "./VideoCallCard";
import AudioCallCard from "./AudioCallCard";
import CallViewControls from "./CallViewControls";
import { useUpdatableCallManager } from "@/hooks/chat/useUpdatableCallManager";

function getCallLayout(num: number) {
  const classes = [
    "flex grow",
    "grid grid-rows-2 md:grid-cols-2 md:grid-rows-none",
    "grid grid-rows-2 custom-grid",
    "grid grid-rows-2 grid-cols-2",
  ];

  return classes[num - 1];
}

const CallView = () => {
  const callManager = useUpdatableCallManager();

  const callParticipants = callManager.getParticipants();
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-theme-bg-color">
      <div
        className={`h-full w-full gap-2 overflow-hidden p-2 ${getCallLayout(callParticipants.length)}`}
      >
        {callParticipants.map((memberDesc) =>
          memberDesc.videoEnabled && callManager.getCallType() === "video" ? (
            <VideoCallCard key={memberDesc.userId} memberDesc={memberDesc} />
          ) : (
            <AudioCallCard key={memberDesc.userId} memberDesc={memberDesc} />
          ),
        )}
      </div>
      <CallViewControls callManager={callManager} />
    </div>
  );
};

export default CallView;
