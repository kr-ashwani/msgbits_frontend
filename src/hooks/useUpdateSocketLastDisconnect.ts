import { useEffect } from "react";
import { useSocket } from "./useSocket";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { updateSocketLastDisconectedTime } from "@/lib/store/features/socket/socketSlice";

export function useUpdateSocketLastDisconnect() {
  const { socket } = useSocket();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsub = socket.onDisconnect(() => {
      dispatch(updateSocketLastDisconectedTime(new Date().toISOString()));
    });
    return () => socket.offDisconnect(unsub);
  }, [socket, dispatch]);
}
