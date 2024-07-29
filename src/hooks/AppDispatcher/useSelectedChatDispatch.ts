import { setSelectedChatId } from "@/lib/store/features/chat/selectedChatSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { AppDispatch } from "@/lib/store/store";

class SelectedChatDispatcher {
  private dispatch: AppDispatch;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }
  setSelectedChat = (id: string | null) => {
    console.log(id);
    this.dispatch(setSelectedChatId(id));
  };
}
const useSelectedChatDispatch = () => {
  const dispatch = useAppDispatch();

  return new SelectedChatDispatcher(dispatch);
};

export { useSelectedChatDispatch };
