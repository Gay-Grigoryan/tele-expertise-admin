import React from "react";
import Toggle from "./toggle";

interface Props {
  checked: boolean;
  onChange: () => void;
  text: string;
  checkedColorClassName?: string;
}

export default function ToggleButton({ checked, onChange, text, checkedColorClassName }: Props) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-gray-light px-4 py-3">
      <p className="font-regular text-l4 text-black">{text}</p>
      <Toggle checkedColorClassName={checkedColorClassName} checked={checked} onChange={onChange} />
    </div>
  );
}
