import { useAppSelector } from "@/lib/store/hooks";
import { useCallManager } from "./useCallManager";

export function useUpdatableCallManager() {
  const callManager = useCallManager();
  // this will trigger comp to re-render and use updated callManager instance
  // callManager instance will never change through out the app lifecycle but its properties can be updated
  const updateCallUI = useAppSelector(
    (state) => state.chat.chatRoomData.updateCallUI,
  );

  return callManager;
}
