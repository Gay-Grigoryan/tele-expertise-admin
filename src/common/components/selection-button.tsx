"use client";

import React, { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  selected?: boolean;
}

function SelectionButton({ onClick, selected, className, children, ...buttonAttributes }: Props) {
  const { disabled } = buttonAttributes;
  return (
    <button
      className={`
        text-large text-black-title box-border rounded-lg border border-gray-50 px-2.5 py-3 font-medium
        ${!disabled ? "active:shadow-primary100_4 hover:border-gray-600 active:border-gray-50" : ""}
        ${selected ? "hover:!border-primary-700 !border-2 !border-primary" : ""}
        ${disabled ? "!text-gray-200" : ""}
        ${className}
      `}
      onClick={onClick}
      {...buttonAttributes}
    >
      {children}
    </button>
  );
}

export default SelectionButton;
