import { useContext } from "react";
import { io } from "socket.io-client";
import SocketContext from "./socketContextConfig.js";

const SOCKET_URL = "http://localhost:3000";

// Create and export socket instance
export const socket = io(SOCKET_URL, {
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  autoConnect: true,
  transports: ["websocket", "polling"],
});

// Custom hook for using socket context
export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
}
