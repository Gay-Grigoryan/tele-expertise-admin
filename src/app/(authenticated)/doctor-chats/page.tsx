"use client";
import React from "react";
import ChatContent from "@/features/chat/components/chat-content";
import ChatList from "@/features/chat/components/chat-list";
import ChatFiles from "@/features/chat/components/chat-files";
import { useServices } from "@/features/services/hooks";

export default function ServicesChat() {
  const {
    activeConversation,
    messages,
    openMedia,
    hideMedia,
    showMedia,
    sendMessage,
    conversations,
    // activeConversationCustomerInfo,
    onLoad,
    files,
    onActiveConversationChange
  } = useServices();

  const activeConversationCustomerInfo = conversations.find(el => el.doctor.id === activeConversation);

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex gap-2 rounded-lg bg-white px-4 py-2"></div>
      {!activeConversationCustomerInfo ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <p>There are no messages yet</p>
        </div>
      ) : (
        <div className="flex flex-1 gap-4 rounded-lg">
          {showMedia ? (
            <ChatFiles
              files={files}
              name={activeConversationCustomerInfo.doctor.name}
              phone={activeConversationCustomerInfo.doctor.phone}
              hideMedia={hideMedia}
            />
          ) : (
            <>
              <ChatList
                activeConversation={activeConversation}
                conversations={conversations}
                onSearchedValue={searchedValue => console.log(searchedValue)}
                searchedValue={""}
                onActiveConversationChange={onActiveConversationChange}
              />
              <ChatContent
                openMedia={openMedia}
                info={{ name: activeConversationCustomerInfo.doctor.name, phone: activeConversationCustomerInfo.doctor.phone }}
                onLoad={onLoad}
                messages={messages}
                sendMessage={sendMessage}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
