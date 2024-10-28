"use client";
import React, { ReactNode, useEffect, useMemo } from "react";
import { useSocket } from "@/hooks/useSocket";
import { CallManager } from "@/service/webrtc/CallManager";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

export const CallManagerContext = React.createContext<CallManager>(
  {} as CallManager,
);

export const CallManagerProvider = ({ children }: { children: ReactNode }) => {
  const { socket, socketQueue } = useSocket();
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  if (!user) throw new Error("permission denied. User must be logged in");

  const callManager = useMemo(() => {
    const manager = new CallManager(socket, socketQueue, user, dispatch);
    return {
      instance: manager,
      cleanup: () => {
        try {
          manager.cleanup();
        } catch (error) {
          console.error("Error during CallManager cleanup:", error);
        }
      },
    };
  }, [socket, socketQueue, user, dispatch]);

  useEffect(() => {
    // performing cleanup
    return () => callManager?.cleanup();
  }, [callManager]);

  return (
    <CallManagerContext.Provider value={callManager.instance}>
      {children}
    </CallManagerContext.Provider>
  );
};
