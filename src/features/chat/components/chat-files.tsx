import React from "react";
import Icon from "@/common/components/icon";
import Image from "next/image";
import { getFile, isImage } from "@/common/lib";
import { useModal } from "@/common/hooks/modal";

interface Props {
  hideMedia: () => void;
  files: string[];
  name: string;
  phone: string;
}

export default function ChatFiles({ name, phone, hideMedia, files }: Props) {
  const { isOpen: showPhoneModal, closeModal: closePhoneModal, openModal: openPhoneModal } = useModal();

  return (
    <div className="flex flex-1 flex-col gap-6 bg-white px-4">
      <div className="flex justify-between gap-6 border-b border-gray-medium py-4">
        <div className="flex items-center gap-2">
          <div className="relative h-10 w-10">
            <Image alt="user placeholder" src="/images/user-placeholder.svg" layout="fill" />
          </div>
          <p className="font-regular text-p1 text-black">{name}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="cursor-pointer rounded-lg border border-gray-medium p-3" onClick={hideMedia}>
            <Icon name="chat" size={16} />
          </div>
          <div className="cursor-pointer rounded-lg border border-gray-medium p-3" onClick={openPhoneModal}>
            <Icon name="phone" size={16} />
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-wrap content-start gap-3 overflow-auto">
        {files.map(el => (
          <div key={el} className="relative h-[120px] w-[120px] cursor-pointer" onClick={() => window.open(getFile(el))}>
            {isImage(el) ? (
              <Image src={getFile(el)} alt="chat file" layout="fill" className="rounded-lg" />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-1 rounded-lg border border-gray-medium px-3">
                <Icon name="doc" size={24} />
                <p className="w-full truncate font-regular text-p4  text-black">{el}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* {showPhoneModal && <PhoneModal phone={phone} onClose={closePhoneModal} />} */}
    </div>
  );
}
