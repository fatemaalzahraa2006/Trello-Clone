import { useEffect, useCallback, useState } from "react";
import { io } from "socket.io-client";

//  Connects only when a board page uses the hook.
const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:3001", {
  autoConnect: false,
});

export const emitBoardEvent = (event, payload) => socket.emit(event, payload);

export function useBoardSocket(boardId) {
  const [connected, setConnected] = useState(socket.connected);

  useEffect(() => {
    const on = () => setConnected(true);
    const off = () => setConnected(false);
    socket.on("connect", on);
    socket.on("disconnect", off);
    return () => {
      socket.off("connect", on);
      socket.off("disconnect", off);
    };
  }, []);

  
  useEffect(() => {
    if (!socket.connected) socket.connect();
    const join = () => socket.emit("join-board", boardId);
    if (socket.connected) join();
    socket.on("connect", join); 
    return () => {
      socket.off("connect", join);
      socket.emit("leave-board", boardId);
    };
  }, [boardId]);


  const subscribe = useCallback((event, cb) => {
    socket.on(event, cb);
    return () => socket.off(event, cb);
  }, []);

  return { subscribe, connected };
}