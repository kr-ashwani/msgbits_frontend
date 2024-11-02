import { useAppSelector } from "@/lib/store/hooks";
import { IWebRTCCallInfo } from "@/schema/WebRTCSchema";
import { useMemo } from "react";

export class ChatRoomCallSession {
  private activeChatRoomSession: IWebRTCCallInfo[];

  constructor(activeChatRoomSession: IWebRTCCallInfo[]) {
    this.activeChatRoomSession = activeChatRoomSession;
  }

  isActiveCall(chatRoomId: string) {
    return this.activeChatRoomSession.some(
      (state) => state.chatRoomId === chatRoomId,
    );
  }

  getCallInfo(chatRoomId: string) {
    for (let i = 0; i < this.activeChatRoomSession.length; i++)
      if (chatRoomId === this.activeChatRoomSession[i].chatRoomId)
        return this.activeChatRoomSession[i];
    return null;
  }
}

const useChatRoomCallSession = () => {
  const activeChatRoomCallSession = useAppSelector(
    (state) => state.chat.chatRoomData.activeChatRoomCalls,
  );

  return useMemo(
    () => new ChatRoomCallSession(activeChatRoomCallSession),
    [activeChatRoomCallSession],
  );
};

export { useChatRoomCallSession };
