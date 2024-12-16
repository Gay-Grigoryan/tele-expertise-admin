import React from "react";
import Modal from "@/common/components/modal";
import ModalContent from "@/common/components/modal-content";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  onApprove: () => void;
}

export default function LogoutModal({ closeModal, isOpen, onApprove }: Props) {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <ModalContent onApprove={onApprove} onClose={closeModal} approveButtonTitle="Approve" cancelButtonTitle="Reject">
        <div>
          <p className="text-center font-regular text-p1 text-black">Are you sure you want to log out?</p>
        </div>
      </ModalContent>
    </Modal>
  );
}
