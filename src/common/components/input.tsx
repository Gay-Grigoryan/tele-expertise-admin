"use client";

import React, { InputHTMLAttributes, useRef, useState } from "react";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "children" | "placeholder"> {
  label?: string;
  placeholder?: string | React.ReactNode;
  endIcons?: React.ReactNode;
  containerClassName?: string;
  onEndIconClick?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, placeholder, endIcons, containerClassName, className, onChange, onEndIconClick, ...inputProps },
  ref
) {
  const localRef = useRef<HTMLInputElement | null>(null);

  const [showCustomPlaceholder, setShowCustomPlaceholder] = useState(
    Boolean(typeof placeholder !== "string" && !inputProps.value && !inputProps.defaultValue)
  );
  const { disabled } = inputProps;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setShowCustomPlaceholder(Boolean(typeof placeholder !== "string" && !e.target.value));
    onChange?.(e);
  }

  return (
    <div className={`relative flex w-full flex-col ${containerClassName}`}>
      {label && (
        <label
          className={`text-large mb-[6px] font-medium ${disabled ? "text-gray-300" : "text-black-title"}`}
          htmlFor={inputProps.id}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={el => {
            localRef.current = el;
            if (typeof ref === "function") ref(el);
            else if (ref) ref.current = el;
          }}
          placeholder={typeof placeholder === "string" ? placeholder : undefined}
          className={`h-[41px] w-full
            rounded-lg border border-gray-dark px-3 py-[10px]
            font-regular
            text-p1
            text-black
            outline-none placeholder:text-gray-medium
            ${disabled ? "border-gray-medium text-gray-medium" : ""}
            ${endIcons ? "pr-10" : ""}
            ${className}
          `}
          type="text"
          onChange={e => handleChange(e)}
          {...inputProps}
        />
        {showCustomPlaceholder && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2" onClick={() => localRef.current?.focus()}>
            {placeholder}
          </div>
        )}
        {endIcons && (
          <div className="absolute right-3 top-1/2 h-max -translate-y-1/2" onClick={onEndIconClick}>
            {endIcons}
          </div>
        )}
      </div>
    </div>
  );
});

export default Input;
