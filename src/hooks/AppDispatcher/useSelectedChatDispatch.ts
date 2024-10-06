import { setShowFileDiscardDialog } from "@/lib/store/features/chat/chatRoomDataSlice";
import { setSelectedChatId } from "@/lib/store/features/chat/selectedChatSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { AppDispatch } from "@/lib/store/store";
import { useMemo } from "react";

export class SelectedChatDispatcher {
  private dispatch: AppDispatch;
  private isInFilePreviewMode: boolean;

  constructor(dispatch: AppDispatch, isInFilePreviewMode: boolean) {
    this.dispatch = dispatch;
    this.isInFilePreviewMode = isInFilePreviewMode;
  }
  setSelectedChat = (id: string | null, newChatRoom: boolean = false) => {
    // if chat view is in File Preview mode then user cannot change selected chatroom
    if (this.isInFilePreviewMode && !newChatRoom)
      this.dispatch(setShowFileDiscardDialog(true));
    else this.dispatch(setSelectedChatId(id));
  };
  getDispatch() {
    return this.dispatch;
  }
}
const useSelectedChatDispatch = () => {
  const dispatch = useAppDispatch();
  const isInFilePreviewMode = useAppSelector(
    (state) => state.chat.chatRoomData.isInFilePreviewMode,
  );

  return useMemo(
    () => new SelectedChatDispatcher(dispatch, isInFilePreviewMode),
    [dispatch, isInFilePreviewMode],
  );
};

export { useSelectedChatDispatch };
