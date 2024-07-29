import { showChatRoomDetails } from "@/lib/store/features/chat/showChatRoomDetails";
import { useAppDispatch } from "@/lib/store/hooks";
import { AppDispatch } from "@/lib/store/store";

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

  return new ShowChatRoomDetailsDispatcher(dispatch);
};

export { useShowChatRoomDetailsDispatch };
