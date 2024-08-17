import { setSelectedChatId } from "@/lib/store/features/chat/selectedChatSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { AppDispatch } from "@/lib/store/store";
import { useMemo } from "react";

class SelectedChatDispatcher {
  private dispatch: AppDispatch;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }
  setSelectedChat = (id: string | null) => {
    this.dispatch(setSelectedChatId(id));
  };
}
const useSelectedChatDispatch = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => new SelectedChatDispatcher(dispatch), [dispatch]);
};

export { useSelectedChatDispatch };
