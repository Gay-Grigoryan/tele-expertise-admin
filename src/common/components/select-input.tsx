import React, { useEffect, useRef } from "react";
import Input, { InputProps } from "./input";
import { useModal } from "../hooks/modal";
import Icon from "./icon";

export interface SelectInputProps extends InputProps {
  options: { value: string; label: string }[];
  onEndIconChange: (value: string) => void;
  selectedOption: string;
}

export default function SelectInput({ options, onEndIconChange, selectedOption, ...props }: SelectInputProps) {
  const { isOpen, toggleModal: toggleSelect, closeModal: closeSelect } = useModal();
  const selectRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (value: string) => {
    closeSelect();
    onEndIconChange(value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        closeSelect();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectRef, closeSelect]);

  return (
    <div className="relative" ref={selectRef}>
      <Input {...props} onEndIconClick={toggleSelect} />
      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {options.map(option => (
            <div
              key={option.value}
              className="flex cursor-pointer select-none gap-2 py-2 pl-3 pr-9 hover:bg-gray-100"
              onClick={() => handleOptionClick(option.value)}
            >
              <Icon name={option.value} size={16} />
              <span
                className={`block truncate font-regular text-l5 ${
                  selectedOption === option.value ? "text-black" : "text-black/70"
                }`}
              >
                {option.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
