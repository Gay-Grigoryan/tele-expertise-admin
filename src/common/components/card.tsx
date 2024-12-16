import React, { PropsWithChildren } from "react";
import Icon from "./icon";
import StatusBox, { Status } from "./status-box";
import Actions from "./actions";

interface Props extends PropsWithChildren {
  className?: string;
  onClick?: () => void;
}

export default function Card({ children, className, onClick }: Props) {
  return (
    <div onClick={onClick} className={`flex flex-col gap-3 rounded-lg bg-white p-4 ${className}`}>
      {children}
    </div>
  );
}

Card.Title = function CardTitle({ title }: { title: string }) {
  return (
    <h4 title={title} className="overflow-hidden text-ellipsis font-medium text-h4 text-black">
      {title}
    </h4>
  );
};
Card.Description = function CardDescription({ description }: { description: string }) {
  return (
    <h2 title={description} className="overflow-hidden text-ellipsis font-regular text-h2 text-black">
      {description}
    </h2>
  );
};

Card.Item = function CardItem({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon name={icon} size={16} />
      <p title={text} className="overflow-hidden text-ellipsis font-regular text-p2 text-black">
        {text}
      </p>
    </div>
  );
};

Card.Footer = function CardFooter({ onApprove, onReject }: { onApprove: () => void; onReject: () => void }) {
  return (
    <div className="flex justify-end gap-2">
      <div className="cursor-pointer" onClick={onReject}>
        <Icon name="reject" size={32} />
      </div>
      <div className="cursor-pointer" onClick={onApprove}>
        <Icon name="approve" size={32} />
      </div>
    </div>
  );
};

Card.Actions = function CardActions({
  status,
  onChat,
  onEdit,
  onRemove
}: {
  status: Status;
  onChat?: () => void;
  onEdit?: () => void;
  onRemove?: () => void;
}) {
  return (
    <div className="flex justify-between">
      <StatusBox status={status} />
      <Actions onChat={onChat} onEdit={onEdit} onRemove={onRemove} />
    </div>
  );
};
