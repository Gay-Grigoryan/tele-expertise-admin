"use client";
import { PropsWithChildren } from "react";
import ReactModal, { Props as ModalProps } from "react-modal";

ReactModal.setAppElement("#modal-root");

export default function Modal({ children, ...modalProps }: PropsWithChildren<ModalProps>) {
  return (
    <ReactModal
      {...modalProps}
      className="fixed left-0 top-0 z-10 h-[100dvh] w-screen"
      style={{ overlay: { background: "transparent" } }}
    >
      <div className="flex h-full w-full items-center justify-center bg-black/30" onClick={modalProps.onRequestClose}>
        <div onClick={e => e.stopPropagation()}>{children}</div>
      </div>
    </ReactModal>
  );
}
