import { showChatRoomDetails } from "@/lib/store/features/chat/showChatRoomDetails";
import { useAppDispatch } from "@/lib/store/hooks";
import { AppDispatch } from "@/lib/store/store";
import { useMemo } from "react";

class ShowChatRoomDetailsDispatcher {
  private dispatch: AppDispatch;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }

  toggleChatRoomDetails = (payload: boolean) => {
    this.dispatch(showChatRoomDetails(payload));
  };
}

const useShowChatRoomDetailsDispatch = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => new ShowChatRoomDetailsDispatcher(dispatch), [dispatch]);
};

export { useShowChatRoomDetailsDispatch };
