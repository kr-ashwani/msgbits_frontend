import { useAppDispatch } from "@/lib/store/hooks";
import { AppDispatch } from "@/lib/store/store";

class SelectedChatDispatcher {
  private dispatch: AppDispatch;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }
}
const useSelectedChatDispatch = () => {
  const dispatch = useAppDispatch();

  return new SelectedChatDispatcher(dispatch);
};

export { useSelectedChatDispatch };
