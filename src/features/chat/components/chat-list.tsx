import React from "react";
import Icon from "@/common/components/icon";
import Input from "@/common/components/input";
import Image from "next/image";
import { format } from "date-fns";
import { Conversation } from "../types";

interface Props {
  searchedValue: string;
  onSearchedValue: (value: string) => void;
  conversations: Conversation[];
  activeConversation: string;
  onActiveConversationChange: (id: string) => void;
}

export default function ChatList({
  onSearchedValue,
  searchedValue,
  conversations,
  activeConversation,
  onActiveConversationChange
}: Props) {
  return (
    <div className="flex h-full w-[320px] flex-col gap-[10px] rounded-lg bg-white">
      <div className="w-full px-4 py-3">
        <Input
          onChange={e => onSearchedValue(e.target.value)}
          value={searchedValue}
          placeholder="Name"
          endIcons={<Icon name="search" size={16} />}
          size={16}
        />
      </div>
      {conversations.map(conversation => (
        <ChatListItem
          onClick={() => onActiveConversationChange(conversation.doctor.id)}
          isActive={conversation.doctor.id === activeConversation}
          {...conversation}
          key={conversation.id}
        />
      ))}
    </div>
  );
}

interface ChatListItemProps extends Conversation {
  isActive: boolean;
  onClick: () => void;
}

function ChatListItem({ isActive, doctor, date, is_seen, message, onClick }: ChatListItemProps) {
  return (
    <div className="relative flex w-full cursor-pointer items-center gap-2 px-4 py-3" onClick={onClick}>
      <Image src="/images/user-placeholder.svg" className="rounded-full" width={40} height={40} alt="user image" />
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center justify-between">
          <p className="font-medium text-h4 text-black">{doctor.name}</p>
        </div>
        <div className="flex w-full items-center justify-between">
          <p className="w-[200px] truncate font-regular text-p2 text-gray-dark">{message || "File"}</p>
          <p className="font-regular text-p4 text-gray-dark">{format(new Date(date), "dd.MM")}</p>
        </div>
      </div>
      {isActive && <div className="absolute right-0 top-1/2 h-10 w-1 -translate-y-1/2 rounded-lg bg-gradient-primary" />}
    </div>
  );
}
