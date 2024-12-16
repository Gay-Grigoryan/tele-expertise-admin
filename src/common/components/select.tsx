"use client";

import React, { useState, useEffect, useRef } from "react";
import Icon from "./icon";

export interface Option {
  value: number;
  label: string;
}

export interface CustomSelectProps {
  label?: string;
  options: Option[];
  placeholder?: string;
  containerClassName?: string;
  className?: string;
  onChange?: (value: number | null) => void;
  selectedOption?: number | null;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  placeholder = "Select an option",
  containerClassName,
  className,
  selectedOption,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (value: number) => {
    setIsOpen(false);
    onChange && onChange(value === selectedOption ? null : value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectRef]);

  return (
    <div className={`relative w-full ${containerClassName}`} ref={selectRef}>
      {label && <label className="mb-2 block font-medium text-lg text-gray-700">{label}</label>}
      <div className="relative">
        <button
          type="button"
          className={`
            w-full cursor-default rounded-md border border-gray-dark bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-dark/0 sm:text-sm
            ${className}
          `}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`block truncate font-regular text-p1 ${!selectedOption ? "text-gray-medium" : "text-black"}`}>
            {selectedOption ? options.find(option => option.value === selectedOption)?.label : placeholder}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <Icon name="arrow-down" size={16} />
          </span>
        </button>

        {isOpen && options.length > 0 && (
          <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map(option => (
              <div
                key={option.value}
                className="relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-gray-100"
                onClick={() => handleOptionClick(option.value)}
              >
                <span
                  className={`block truncate font-regular ${selectedOption === option.value ? "text-black" : "text-black/70"}`}
                >
                  {option.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
