"use client";
import React, { ReactNode, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

export const SocketContext = React.createContext({} as Socket);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState(
    io(String(process.env.NEXT_PUBLIC_SERVER_URL), {
      autoConnect: false,
      withCredentials: true,
    }),
  );

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return <SocketContext.Provider value={socket}></SocketContext.Provider>;
};
