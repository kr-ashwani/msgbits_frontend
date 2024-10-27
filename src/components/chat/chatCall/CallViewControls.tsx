import { Mic, MicOff, Phone, Video, VideoOff } from "lucide-react";
import React from "react";
import CallViewControlsButton from "./CallViewControlsButon";
import { CallManager } from "@/service/webrtc/CallManager";

const CallViewControls = ({ callManager }: { callManager: CallManager }) => {
  const localMember = callManager.getLocalParticipant();

  if (!localMember) return null;
  return (
    <div className="flex h-20 shrink-0 items-center justify-center gap-7 border-t px-4">
      <CallViewControlsButton
        isOn={localMember.audioEnabled}
        onClick={() => callManager.toggleAudio()}
        activeIcon={Mic}
        inactiveIcon={MicOff}
      />

      {callManager.getCallType() === "video" && (
        <CallViewControlsButton
          isOn={localMember.videoEnabled}
          onClick={() => callManager.toggleVideo()}
          activeIcon={Video}
          inactiveIcon={VideoOff}
        />
      )}

      <button
        className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 transition-colors hover:bg-red-600"
        onClick={() => callManager.endCall()}
      >
        <Phone className="h-6 w-6 text-white" />
      </button>
    </div>
  );
};

export default CallViewControls;
