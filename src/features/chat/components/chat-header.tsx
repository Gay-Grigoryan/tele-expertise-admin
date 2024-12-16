import React from "react";
import DeleteModal from "@/common/components/delete-modal";
import Icon from "@/common/components/icon";
import { useModal } from "@/common/hooks/modal";

import Image from "next/image";
// import Button from "@/common/components/button";

interface Props {
  name: string;
  phone: string;
  openMedia: () => void;
  onDelete?: () => void;
  headerEnd?: React.ReactNode;
  onAttachCompany?: (price: number, contract: File) => void;
  onFinish?: (rating: number, description: string) => void;
  contract?: string;
}

export default function ChatHeader({ name, phone, openMedia, onDelete, headerEnd }: Props) {

  const { isOpen: showDeleteModal, closeModal: closeDeleteModal, openModal: openDeleteModal } = useModal();

  const handleDelete = () => {
    onDelete?.();
    closeDeleteModal();
  };

  return (
    <div className="flex items-center justify-between border-b border-gray-medium py-4">
      <div className="flex items-center gap-2">
        <div className="relative aspect-square w-10">
          <Image src="/images/user-placeholder.svg" alt="user image" layout="fill" className="rounded-full" />
        </div>
        <p className="font-regular text-p1 text-black">{name}</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="cursor-pointer rounded-lg border border-gray-medium p-3" onClick={openMedia}>
          <Icon name="media" size={16} />
        </div>
        <div  className="cursor-pointer rounded-lg border border-gray-medium p-3">
          <Icon name="phone" size={16} />
        </div>
        <div onClick={openDeleteModal} className="cursor-pointer rounded-lg border border-gray-medium p-3">
          <Icon name="trash" size={16} />
        </div>

        {headerEnd}
      </div>
      {showDeleteModal && <DeleteModal text="message" onClose={closeDeleteModal} onDelete={handleDelete} />}
    </div>
  );
}
