"use client";
import { SocketManager } from "@/socket/socketManager/SocketManager";
import SocketSingleton from "@/socket/socketManager/SocketSingleton";
import { SocketEmitterQueue } from "@/service/socketQueue/SocketEmitterQueue";
import React, { ReactNode, useEffect, useRef } from "react";

export const SocketContext = React.createContext(
  {} as {
    socket: SocketManager;
    socketQueue: SocketEmitterQueue;
  },
);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socket = useRef(SocketSingleton.getInstance());
  const socketQueue = useRef(new SocketEmitterQueue(socket.current));

  useEffect(() => {
    socket.current.connect();
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      socket.current.disconnect();
    };
  }, []);

  const value = {
    socket: socket.current,
    socketQueue: socketQueue.current,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
