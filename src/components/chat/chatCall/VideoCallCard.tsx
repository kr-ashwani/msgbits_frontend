import React, { useEffect, useRef } from "react";
import AudioCallCard from "./AudioCallCard";
import { MicOff, VideoOff } from "lucide-react";
import { ParticipantsDesc } from "@/schema/WebRTCSchema";
import { useUpdatableCallManager } from "@/hooks/chat/useUpdatableCallManager";

const VideoCallCard = ({ memberDesc }: { memberDesc: ParticipantsDesc }) => {
  const callManager = useUpdatableCallManager();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStream = callManager.getStreamByID(memberDesc.userId);

  useEffect(() => {
    if (videoRef.current && mediaStream) {
      videoRef.current.srcObject = mediaStream;
      if (memberDesc.userId === callManager.getLocalUserId()) {
        videoRef.current.muted = true; // Only mute local stream
      }
    }
  }, [mediaStream, callManager, memberDesc]);

  if (mediaStream) {
    return (
      <div className="relative flex aspect-video h-full w-full items-center justify-center overflow-hidden rounded-lg bg-gray-100">
        <div className="absolute inset-0 h-full w-full">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <div className="flex gap-1">
            {!memberDesc.videoEnabled && (
              <div className="rounded-full bg-theme-color p-2">
                <VideoOff className="h-4 w-4 text-white" />
              </div>
            )}
            {!memberDesc.audioEnabled && (
              <div className="rounded-full bg-theme-color p-2">
                <MicOff className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <AudioCallCard memberDesc={memberDesc} />;
  }
};

export default VideoCallCard;
