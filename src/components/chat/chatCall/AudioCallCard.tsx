import Avatar from "@/components/utility/Avatar";
import { useChatUserState } from "@/hooks/AppSelector/useChatUserState";
import { useUpdatableCallManager } from "@/hooks/chat/useUpdatableCallManager";
import { ParticipantsDesc } from "@/schema/WebRTCSchema";
import { MicOff, VideoOff } from "lucide-react";
import React, { useEffect, useRef } from "react";

const AudioCallCard = ({ memberDesc }: { memberDesc: ParticipantsDesc }) => {
  const chatUser = useChatUserState();
  const user = chatUser.getUserById(memberDesc.userId);
  const callManager = useUpdatableCallManager();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaStream = callManager.getStreamByID(memberDesc.userId);
  useEffect(() => {
    if (audioRef.current && mediaStream) {
      audioRef.current.srcObject = mediaStream;
      if (memberDesc.userId === callManager.getLocalUserId()) {
        audioRef.current.muted = true; // Only mute local stream
      }
    }
  }, [mediaStream, memberDesc, callManager]);

  if (!user) return null;

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="shrink-0">
        <Avatar src={user.profilePicture} size={200} />
      </div>
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <div className="rounded-full bg-theme-color px-3 py-1">
          <span className="text-sm font-semibold text-white">{user.name}</span>
        </div>
        <audio
          ref={audioRef}
          autoPlay
          playsInline
          className="absolute hidden"
        ></audio>
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
};

export default AudioCallCard;
