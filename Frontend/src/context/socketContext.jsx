import { useEffect, useState } from "react";
import SocketContext from "./socketContextConfig";
import { socket } from "./socketHook";

export function SocketProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Socket disconnected");
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      setIsConnected(false);
    });

    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
    };
  }, []);

  const sendMessage = (eventName, data) => {
    if (socket && isConnected) {
      socket.emit(eventName, data);
    } else {
      console.warn("Socket not connected, cannot send message");
    }
  };

  const receiveMessage = (eventName, callback) => {
    if (socket) {
      console.log(`Listening for event: ${eventName}`);
      socket.on(eventName, callback);
      return () => socket.off(eventName, callback);
    }
    return () => {};
  };

  const value = {
    socket,
    isConnected,
    sendMessage,
    receiveMessage,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}
