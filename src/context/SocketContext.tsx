"use client";
import { SocketManager } from "@/socket/socketManager/SocketManager";
import SocketSingleton from "@/socket/socketManager/SocketSingleton";
import React, { ReactNode, useEffect, useRef } from "react";

export const SocketContext = React.createContext({} as SocketManager);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socket = useRef(SocketSingleton.getInstance());

  useEffect(() => {
    socket.current.connect();
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      socket.current.disconnect();
      //document.getElementsByTagName("body")[0].classList.remove("chatStyle");
    };
  }, []);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
