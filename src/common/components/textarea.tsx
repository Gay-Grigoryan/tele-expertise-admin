import React from "react";

interface Props extends React.HTMLProps<HTMLTextAreaElement> {
  max?: number;
  value: string;
}

export default function Textarea({ max = 400, value, ...props }: Props) {
  return (
    <div className="relative h-full w-full">
      <textarea
        className="flex !h-full w-full resize-none rounded-lg border border-gray-medium p-3 outline-none"
        placeholder="Նկարագրություն"
        maxLength={max}
        value={value}
        {...props}
      />
      <div className="absolute bottom-3 right-3 flex justify-end">
        <p className="font-regular text-p4 text-gray-dark">
          {value.length} / {max}
        </p>
      </div>
    </div>
  );
}
