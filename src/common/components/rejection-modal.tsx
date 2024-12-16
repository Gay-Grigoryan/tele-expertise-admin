import React, { useState } from "react";
import Modal from "./modal";
import ModalContent from "./modal-content";
import Textarea from "./textarea";

interface Props {
  onApprove: (description: string) => void;
  onClose: () => void;
  title: string;
}

export default function RejectionModal({ onApprove, onClose, title }: Props) {
  const [description, setDescription] = useState("");
  return (
    <Modal isOpen>
      <ModalContent
        approveButtonTitle="Հաստատել"
        cancelButtonTitle="Չեղարկել"
        onApprove={() => onApprove(description)}
        onClose={onClose}
        title={title}
        className="w-[400px]"
      >
        <div className="flex h-[190px] flex-1 flex-col">
          <Textarea
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
          />
        </div>
      </ModalContent>
    </Modal>
  );
}
