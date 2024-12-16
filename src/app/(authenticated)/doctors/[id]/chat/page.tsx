"use client";

import Api from "@/api";
import ChatContent from "@/features/chat/components/chat-content";
import ChatFiles from "@/features/chat/components/chat-files";
import { useDoctorChat } from "@/features/services/hooks";

export default function DoctorChat({ params }: { params: { id: string } }) {
  const { data } = Api.useApi(() => Api.doctors.GetAdmin(params.id), []);
  const doctor = data?.item;

  const { messages, sendMessage, showMedia, openMedia, hideMedia, onLoad, files } = useDoctorChat(params.id);

  if (!doctor) return null;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex flex-1 gap-4 rounded-lg">
        {showMedia ? (
          <ChatFiles files={files} name={doctor.name} phone={doctor.phone} hideMedia={hideMedia} />
        ) : (
          <>
            <ChatContent openMedia={openMedia} info={doctor} onLoad={onLoad} messages={messages} sendMessage={sendMessage} />
          </>
        )}
      </div>
    </div>
  );
}
