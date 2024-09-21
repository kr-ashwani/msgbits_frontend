import { setOnlineStatus } from "@/lib/store/features/chat/chatRoomDataSlice";
import { addChatUser } from "@/lib/store/features/chat/chatUserSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { AppDispatch } from "@/lib/store/store";
import { IChatUser } from "@/schema/ChatUserSchema";
import { useMemo } from "react";

class ChatUserDispatcher {
  private dispatch: AppDispatch;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }
  createChatUser = () => {};
  updateChatUser = () => {};
  getAllChatUser = (payload: IChatUser[]) => {
    if (payload.length) this.dispatch(addChatUser(payload));
  };
  getStatusUpdate = ({
    userId,
    status,
  }: {
    userId: string | string[];
    status: string;
  }) => {
    if (status === "online") {
      this.dispatch(
        setOnlineStatus({
          userId,
          status,
        }),
      );
    } else if (status === "offline") {
      this.dispatch(
        setOnlineStatus({
          userId,
          status,
        }),
      );
    }
  };

  getUserOnlineStatus = (userId: string[]) => {
    this.dispatch(
      setOnlineStatus({
        userId,
        status: "online",
      }),
    );
  };
}

const useChatUserDispatch = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => new ChatUserDispatcher(dispatch), [dispatch]);
};

export { useChatUserDispatch };
