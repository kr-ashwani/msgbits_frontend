"use client";
import React, { ReactNode, useMemo, useState } from "react";
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

  const callManager = useMemo(
    () => new CallManager(socket, socketQueue, user, dispatch),
    [socket, socketQueue, user, dispatch],
  );

  const value = callManager;

  return (
    <CallManagerContext.Provider value={value}>
      {children}
    </CallManagerContext.Provider>
  );
};
