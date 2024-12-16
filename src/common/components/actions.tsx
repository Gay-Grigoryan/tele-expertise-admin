import React from "react";
import Icon from "./icon";

interface Props {
  onChat?: () => void;
  onEdit?: () => void;
  onRemove?: () => void;
  onDetailed?: () => void;
}

export default function Actions({ onChat, onEdit, onRemove, onDetailed }: Props) {
  return (
    <div className="flex gap-2" onClick={e => e.preventDefault()}>
      {onChat && (
        <div className="cursor-pointer rounded-full bg-gray-light p-2" onClick={onChat}>
          <Icon name="chat" size={16} />
        </div>
      )}
      {onDetailed && (
        <div className="cursor-pointer rounded-full bg-gray-light p-2" onClick={onDetailed}>
          <Icon name="detailed" size={16} />
        </div>
      )}
      {onEdit && (
        <div className="cursor-pointer rounded-full bg-gray-light p-2" onClick={onEdit}>
          <Icon name="edit" size={16} />
        </div>
      )}
      {onRemove && (
        <div className="cursor-pointer rounded-full bg-gray-light p-2" onClick={onRemove}>
          <Icon name="trash" size={16} />
        </div>
      )}
    </div>
  );
}
