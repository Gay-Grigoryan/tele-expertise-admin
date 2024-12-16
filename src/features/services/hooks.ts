import useSocket, { Message } from "@/common/hooks/socket";
import Api from "@/api";
import { useDebouncedValue } from "@/common/hooks/debounce";
import { useModal } from "@/common/hooks/modal";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ServiceTypes } from "../services/enums";
import { useSnackbar } from "notistack";
import { startGlobalLoading, stopGlobalLoading } from "@/common/components/global-loading-provider";
import { Conversation } from "../chat/types";
import { useRouter, useSearchParams } from "next/navigation";

export const useServices = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("user_id");
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState("");
  const [activeConversationCustomerInfo, setActiveConversationCustomerInfo] = useState<Conversation>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(0);

  const isFirstRender = useRef(true);
  const { socket } = useSocket("/doctor-chat");
  const { isOpen: showMedia, closeModal: hideMedia, openModal: openMedia } = useModal();
  const { enqueueSnackbar } = useSnackbar();
  const { push: navigateTo } = useRouter();

  const fetchConversations = useCallback(async () => {
    setLoading(true);
    const { data, meta } = await Api.doctors.GetDoctorConversations();
    setLoading(false);
    if (!meta.error) {
      setConversations(data.items.map((el: { doctor: { id: string; }; is_seen: any; }) => ({ ...el, is_seen: el.doctor.id === activeConversation ? true : el.is_seen })));
    } else {
      enqueueSnackbar("Տեխնիկական Խնդիր փորձեք մի փոքր ուշ", { variant: "error" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeConversation]);

  useEffect(() => {
    fetchConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: files } = Api.useApi(
    () => (activeConversation && showMedia ? Api.doctors.GetChatFiles(activeConversation) : Api.error()),
    [activeConversation, showMedia]
  );

  const onLoad = () => {
    setPage(prev => Math.min(prev + 1, pagesCount));
  };

  const handleActiveConversationChange = (id: string) => {
    if (isFirstRender.current) isFirstRender.current = false;
    if (id === activeConversation) {
      return;
    }
    // navigateTo(`/services?type=${chatType}&user_id=${id}`);
    setPage(1);
    setMessages([]);
    setActiveConversation(id);
    setActiveConversationCustomerInfo(conversations.find(el => el.doctor.id === id));
  };

  useEffect(() => {
    if (conversations.length && !loading) {
      const activeConversationId =
        isFirstRender.current && userId ? userId : activeConversation || conversations?.[0]?.doctor?.id;
      handleActiveConversationChange(activeConversationId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversations, loading]);

  const fetchMessages = useCallback(
    async () => {
      if (activeConversation) {
        const { data, meta } = await Api.doctors.GetMessages(activeConversation, page);
        if (meta.error) {
          enqueueSnackbar("Տեխնիկական խնդիր փորձեք մի փոքր ուշ", { variant: "error" });
        } else {
          setMessages(prev => [...data.items, ...prev]);
          setPagesCount(data.pages);
          // socket?.emit("read_messages", { service_type: chatType, user_id: activeConversation });
          setConversations(prev => prev.map(el => (el.doctor.id === activeConversation ? { ...el, is_seen: true } : el)));
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeConversation, page]
  );

  useEffect(() => {
    if (activeConversation) {
      fetchMessages();
    }
  }, [activeConversation, page, fetchMessages]);

  useEffect(() => {
    if (socket) {
      // Listen for incoming messages
      socket.on("message", (msg: Message) => {
        if (msg.sender_id === activeConversation) {
          console.log("add message");

          setMessages(prev => [...prev, msg]);
          fetchConversations();
        }
      });

      // Clean up event listener on unmount
      return () => {
        socket.off("message");
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, fetchConversations, activeConversation]);

  const sendMessage = (message: string, uploadedFiles?: File[]) => {
    if (socket) {
      if (!uploadedFiles?.length) {
        socket.emit("message", { message, receiver_id: activeConversation });
        setMessages(prev => [
          ...prev,
          {
            id: messages[messages.length - 1].id + 1,
            message,
            type: "text",
            is_seen: true,
            date: new Date().toISOString(),
            is_mine: true,
            user_id: activeConversation
          }
        ]);
      }
      // } else sendFiles(uploadedFiles!);
    }
  };

  return {
    activeConversation,
    messages,
    setMessages,
    sendMessage,
    showMedia,
    openMedia,
    hideMedia,
    activeConversationCustomerInfo,
    loading,
    onLoad,
    onActiveConversationChange: handleActiveConversationChange,
    conversations,
    files: (files?.items || []).map(el => el.file)
  };
};
export const useDoctorChat = (doctor_id: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(0);

  const { socket } = useSocket("/doctor-chat");
  const { isOpen: showMedia, closeModal: hideMedia, openModal: openMedia } = useModal();
  const { enqueueSnackbar } = useSnackbar();

  const { data: files } = Api.useApi(
    () => (doctor_id && showMedia ? Api.doctors.GetChatFiles(doctor_id) : Api.error()),
    [doctor_id, showMedia]
  );

  const onLoad = () => {
    setPage(prev => Math.min(prev + 1, pagesCount));
  };

  const fetchMessages = useCallback(
    async () => {
      if (doctor_id) {
        const { data, meta } = await Api.doctors.GetMessages(doctor_id, page);
        if (meta.error) {
          enqueueSnackbar("Տեխնիկական խնդիր փորձեք մի փոքր ուշ", { variant: "error" });
        } else {
          setMessages(prev => [...data.items, ...prev]);
          setPagesCount(data.pages);
          // socket?.emit("read_messages", { service_type: chatType, user_id: activeConversation });
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [doctor_id, page]
  );

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    if (socket) {
      // Listen for incoming messages
      socket.on("message", (msg: Message) => {
        if (msg.sender_id === doctor_id) {
          console.log("add message");

          setMessages(prev => [...prev, msg]);
        }
      });

      // Clean up event listener on unmount
      return () => {
        socket.off("message");
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const sendMessage = (message: string, uploadedFiles?: File[]) => {
    if (socket) {
      if (!uploadedFiles?.length) {
        socket.emit("message", { message, receiver_id: doctor_id });

        setMessages(prev => [
          ...prev,
          {
            date: new Date().toISOString(),
            id: (messages[messages.length - 1]?.id || Math.random()) + 1,
            is_mine: true,
            is_seen: true,
            message,
            type: "text",
            user_id: doctor_id
          }
        ]);
      }
 
    }
  };

  return {
    messages,
    setMessages,
    sendMessage,
    showMedia,
    openMedia,
    hideMedia,
    onLoad,
    files: (files?.items || []).map(el => el.file)
  };
};
