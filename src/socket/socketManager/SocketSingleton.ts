import { io } from "socket.io-client";
import { SocketManager } from "./SocketManager";

const SOCKET_URL = String(process.env.NEXT_PUBLIC_SOCKET_URL);

console.log(SOCKET_URL);
class SocketSingleton {
  private static instance: SocketManager | null = null;

  public static getInstance(): SocketManager {
    if (!SocketSingleton.instance) {
      const socket = io(SOCKET_URL, {
        autoConnect: false,
        withCredentials: true,
        //path: "/api/socket.io", // Changed this line
      });
      SocketSingleton.instance = new SocketManager(socket);
    }
    return SocketSingleton.instance;
  }
}

export default SocketSingleton;
