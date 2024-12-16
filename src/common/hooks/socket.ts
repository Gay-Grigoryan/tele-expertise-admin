import ApiSlice from "@/api/slice";
import { ServiceTypes } from "@/features/services/enums";
import { SocketOptions } from "dgram";
import { useEffect, useState } from "react";
import io, { ManagerOptions, Socket } from "socket.io-client";

type MessageType = "text" | "file";

export interface Message {
  id: number;
  message: string | string[];
  type: MessageType;
  is_seen: boolean;
  date: string;
  is_mine: boolean;
  user_id: string;
  sender_id?:any;
  service_type?: ServiceTypes;
  creator?: "customer" | "company";
}

const useSocket = (path: string, query?: string, options?: Partial<ManagerOptions & SocketOptions>) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Create a new socket connection
    const newSocket = io(
      `${process.env.NEXT_PUBLIC_API_HOST}${path}?token=${ApiSlice.token || process.env.TEST_TOKEN}${query ? `&${query}` : ""}`,
      options
    );
    setSocket(newSocket);

    // Set connected state
    newSocket.on("connect", () => {
      setConnected(true);
    });

    newSocket.on("disconnect", () => {
      setConnected(false);
    });

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [path, query, options]);

  return { socket, connected };
};

export default useSocket;
