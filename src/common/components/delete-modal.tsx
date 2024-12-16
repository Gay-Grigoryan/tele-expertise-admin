import Modal from "@/common/components/modal";
import ModalContent from "@/common/components/modal-content";

interface Props {
  onDelete: () => void;
  onClose: () => void;
  text: string;
}

export default function DeleteModal({ onClose, onDelete, text }: Props) {
  return (
    <Modal isOpen>
      <ModalContent
        className="w-[360px]"
        approveButtonTitle="Approve"
        cancelButtonTitle="Remove"
        onApprove={() => {
          onDelete();
          onClose();
        }}
        onClose={onClose}
      >
        <p className="text-center font-regular text-p1 text-black">Do you really want to delete this {text}</p>
      </ModalContent>
    </Modal>
  );
}
