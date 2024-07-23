import { SocketContext } from "@/context/SocketContext";
import { useContext } from "react";

export function useSocket() {
  return useContext(SocketContext);
}
