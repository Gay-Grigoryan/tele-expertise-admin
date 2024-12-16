import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Message from "./message";
import ChatHeader from "./chat-header";
import ChatFooter from "./chat-footer";
import { Message as TMessage } from "@/common/hooks/socket";
import Image from "next/image";
import { getFile, isImage } from "@/common/lib";
import { format } from "date-fns";
import Icon from "@/common/components/icon";

interface Props {
  messages: TMessage[];
  info: { name: string; phone: string };
  sendMessage: (message: string, files?: File[]) => void;
  onLoad: () => void;
  openMedia: () => void;
  onDelete?: () => void;
  headerEnd?: React.ReactNode;
  onAttachCompany?: (price: number, contract: File) => void;
  contract?: string;
  onFinish?: (rating: number, description: string) => void;
}

export default function ChatContent({
  messages,
  sendMessage,
  onLoad,
  openMedia,
  onDelete,
  info,
  headerEnd,
  onAttachCompany,
  contract,
  onFinish
}: Props) {
  const [messageValue, setMessageValue] = useState("");
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const topItemRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const previousScrollHeight = useRef<number>(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollTop === 0) {
      previousScrollHeight.current = containerRef.current?.scrollHeight || 0;
      onLoad();
    }
  };

  useEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current?.scrollHeight - previousScrollHeight.current);
  }, [messages]);

  useLayoutEffect(() => {
    previousScrollHeight.current = containerRef.current?.scrollHeight || 0;
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView(true);
    }, 300);
  }, []);

  const handleSendMessage = (files?: File[]) => {
    if (messageValue.trim() === "" && !files?.length) return;
    sendMessage(messageValue, files);
    setMessageValue("");
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView(true);
    }, 0);
  };

  return (
    <div className="flex flex-1 flex-col gap-y-6 rounded-lg bg-white px-4">
      <ChatHeader
        headerEnd={headerEnd}
        onDelete={onDelete}
        openMedia={openMedia}
        name={info.name}
        phone={info.phone}
        onAttachCompany={onAttachCompany}
        contract={contract}
        onFinish={onFinish}
      />
      <div
        ref={containerRef}
        className="no-scrollbar flex flex-1 basis-[0] flex-col gap-y-5 overflow-y-auto"
        onScroll={handleScroll}
      >
        <div className="flex h-2 w-full" ref={topItemRef} />
        {messages.map((message, i) =>
          message.type === "text" ? (
            <Message
              key={`${message.id}_${message.date}_${i}`}
              isMine={message.is_mine}
              date={new Date(message.date)}
              message={message.message as string}
            />
          ) : (
            <div
              className={`flex h-max w-full ${message.is_mine ? "justify-end " : ""}`}
              key={`${message.id}_${message.date}_${i}`}
            >
              <div
                className={`flex h-max max-w-max flex-col gap-2 rounded-lg ${
                  message.is_mine ? "bg-black" : "bg-gray-light"
                } px-3 py-2`}
              >
                <div className="flex flex-wrap gap-2">
                  {(message.message as string[]).map(msg => (
                    <div
                      key={msg}
                      className="relative aspect-square w-20 cursor-pointer rounded-lg"
                      onClick={() => window.open(getFile(msg))}
                    >
                      {isImage(msg) ? (
                        <Image alt="message file" src={getFile(msg)} layout="fill" className="rounded-lg" />
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center gap-1 rounded-lg border border-gray-medium px-3">
                          <Icon name={message.is_mine ? "doc-white" : "doc"} size={24} />
                          <p
                            className={`w-full truncate font-regular text-p4 ${
                              message.is_mine ? "text-gray-light" : "text-black"
                            }`}
                          >
                            {msg}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <p className={`font-regular text-p4 ${message.is_mine ? "text-end text-gray-medium" : "text-gray-dark"}`}>
                  {format(message.date, "dd/MM/yyyy, HH:mm")}
                </p>
              </div>
            </div>
          )
        )}
        <div ref={lastMessageRef} />
      </div>
      <ChatFooter messageValue={messageValue} onMessageValueChange={setMessageValue} sendMessage={handleSendMessage} />
    </div>
  );
}
