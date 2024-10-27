import React from "react";
import VideoCallCard from "./VideoCallCard";
import AudioCallCard from "./AudioCallCard";
import CallViewControls from "./CallViewControls";
import { useUpdatableCallManager } from "@/hooks/chat/useUpdatableCallManager";

const CallView = () => {
  const callManager = useUpdatableCallManager();

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-theme-bg-color">
      <div className="flex grow overflow-hidden">
        {callManager
          .getParticipants()
          .map((memberDesc) =>
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
