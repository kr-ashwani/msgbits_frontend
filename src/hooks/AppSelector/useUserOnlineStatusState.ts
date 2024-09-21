import { userOnlineStatusState } from "@/lib/store/features/chat/chatRoomDataSlice";
import { useAppSelector } from "@/lib/store/hooks";
import { useMemo } from "react";

export class UserOnlineStatusState {
  private userOnlineStatus;

  constructor(userOnlineStatus: userOnlineStatusState) {
    this.userOnlineStatus = userOnlineStatus;
  }

  getOnlineStatus(userId: string | null): boolean {
    if (!userId) return false;
    return this.userOnlineStatus[userId] ? true : false;
  }
}

const useUserOnlineStatusState = () => {
  const userOnlineStatus = useAppSelector(
    (state) => state.chat.chatRoomData.userOnlineStatus,
  );

  return useMemo(
    () => new UserOnlineStatusState(userOnlineStatus),
    [userOnlineStatus],
  );
};

export { useUserOnlineStatusState };
