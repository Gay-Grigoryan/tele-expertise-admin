import { useState } from "react";

export function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleModal = () => setIsModalOpen(prev => !prev);

  return { openModal, closeModal, toggleModal, isOpen: isModalOpen };
}
