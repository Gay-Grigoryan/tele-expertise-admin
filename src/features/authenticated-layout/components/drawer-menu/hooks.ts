import Api from "@/api";
import { Notification } from "@/api/slices/doctors";
import useSocket from "@/common/hooks/socket";
import { useEffect, useState } from "react";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { socket } = useSocket("/admin-notifications");

  const getNotifications = async () => {
    const { data } = await Api.admins.GetNotifications();
    if (data.items.length) {
      setNotifications(data.items);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("new_notification", (notification: Notification) => setNotifications(prev => [notification, ...prev]));
      return () => {
        socket.off("new_notification");
      };
    }
  }, [socket]);
  return { notifications, refetchNotifications: getNotifications };
};
