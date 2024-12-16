import React, { PropsWithChildren } from "react";
import Button from "./button";
import Icon from "./icon";

interface Props extends PropsWithChildren {
  cancelButtonTitle: string;
  approveButtonTitle: string;
  disableApproveButton?: boolean;
  onClose: () => void;
  onApprove: () => void;
  className?: string;
  title?: string;
}

export default function ModalContent({
  title,
  cancelButtonTitle,
  approveButtonTitle,
  children,
  onClose,
  onApprove,
  className,
  disableApproveButton
}: Props) {
  return (
    <div className={`rounded-lg bg-white p-4 ${className}`}>
      <div className={`flex w-full ${title ? "justify-between" : "justify-end"}`}>
        {title && <p className="font-regular text-p1 text-black">{title}</p>}
        <div className="cursor-pointer" onClick={onClose}>
          <Icon name="close" size={16} />
        </div>
      </div>
      <div className="pb-6 pt-4">{children}</div>
      <div className="flex items-center gap-2">
        <Button onClick={onClose} variant="outlined" className="w-1/2">
          {cancelButtonTitle}
        </Button>
        <Button disabled={disableApproveButton} onClick={onApprove} className="w-1/2">
          {approveButtonTitle}
        </Button>
      </div>
    </div>
  );
}
