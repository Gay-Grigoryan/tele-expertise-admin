import React, { useEffect, useState } from "react";
import IconButton from "@/common/components/icon-button";
import Input from "@/common/components/input";
import Image from "next/image";
import { fileToString, isImage } from "@/common/lib";
import Icon from "@/common/components/icon";

interface Props {
  messageValue: string;
  onMessageValueChange: (value: string) => void;
  sendMessage: (files?: File[]) => void;
}

export default function ChatFooter({ messageValue, onMessageValueChange, sendMessage }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [filesSrc, setFilesSrc] = useState<string[]>([]);

  const removeImage = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };
  const handleSendMessage = (files?: File[]) => {
    sendMessage(files);
    setFiles([]);
  };

  useEffect(() => {
    (async () => {
      const filesSrc = await Promise.all(files.map(file => fileToString(file)));
      setFilesSrc(filesSrc);
    })();
  }, [files]);

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      sendMessage();
    }
  };
  return (
    <div className="flex w-full items-center gap-4 border-t border-gray-medium py-4">
      <div className="h-12n relative w-12">
        <Image src="/images/doctor-user.png" layout="fill" className="rounded-full" alt="user image" />
      </div>
      <div className="flex flex-1">
        {filesSrc.length ? (
          <div className="flex gap-2">
            {filesSrc.map((file, i) => (
              <div key={i} className="group relative h-20 w-20">
                <div
                  className="absolute -right-1 -top-1 z-10 hidden cursor-pointer rounded-full bg-black p-1 group-hover:block"
                  onClick={() => removeImage(i)}
                >
                  <Icon name="close-white" size={8} />
                </div>
                {isImage(files?.[i]?.name || "") ? (
                  <Image src={file} layout="fill" className="rounded-lg" alt="file" />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-1 rounded-lg border border-gray-medium px-3">
                    <Icon name="doc" size={24} />
                    <p className="w-full truncate font-regular text-p4  text-black">{files?.[i]?.name}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <Input
            value={messageValue}
            onKeyDown={handleKeyDown}
            onChange={e => onMessageValueChange(e.target.value)}
            placeholder="Message..."
            className="border-none"
          />
        )}
      </div>
      <div className="flex gap-2">
        <input
          accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
          hidden
          ref={fileInputRef}
          type="file"
          multiple
          onChange={e => {
            setFiles(Array.from(e.target.files || []));
            e.target.value = "";
            e.preventDefault();
          }}
        />
        <IconButton
          onClick={() => fileInputRef.current?.click()}
          color="black"
          name="attach"
          size={16}
          disabled={!!messageValue}
          className="border border-gray-medium"
        />
        <IconButton
          disabled={!messageValue && !files.length}
          onClick={() => handleSendMessage(files)}
          color="black"
          name="send"
          size={16}
          className={`border border-gray-medium ${messageValue || files.length ? "bg-transparent" : "bg-gray-medium"}`}
        />
      </div>
    </div>
  );
}
