"use client";

import React, { InputHTMLAttributes, useEffect, useRef, useState } from "react";

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "children"> {
  containerClassName?: string;
  checkedColorClassName?: string;
}

const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
  { containerClassName, checkedColorClassName, ...toggleProps },
  forwardedRef
) {
  const checkedFromProps = toggleProps.checked || false;

  const [checked, setChecked] = useState(checkedFromProps);
  const checkedIsSyncedWithProps = checked === checkedFromProps;

  // sync checked state with props
  useEffect(() => {
    if (!checkedIsSyncedWithProps) setChecked(checkedFromProps);
  }, [checkedFromProps, checkedIsSyncedWithProps]);

  const ref = useRef<HTMLInputElement>(null);

  function handleChange() {
    setChecked(!checked);
    if (ref.current) {
      ref.current.click();
    }
  }

  return (
    <div className={`relative ${containerClassName}`}>
      <div
        className={`h-4 w-6 cursor-pointer  rounded-[100px] transition-all ${
          checked ? checkedColorClassName || "bg-gray-dark" : "border border-black bg-white"
        }`}
        onClick={handleChange}
      >
        <div
          className={`absolute aspect-square rounded-full transition-transform hover:outline hover:outline-8 hover:outline-[#6650a414] ${
            checked ? "translate-x-2 transform" : ""
          } ${!checked ? "left-1 top-[3px]  w-[10px] bg-gray-dark" : "left-1 top-[3px]  w-[10px] bg-white"}`}
        />
      </div>
      <input
        type="checkbox"
        id="toggle"
        className="hidden"
        ref={(elm: HTMLInputElement) => {
          if (typeof forwardedRef === "function") {
            forwardedRef(elm);
          } else if (forwardedRef) {
            forwardedRef.current = elm;
          }
          // make ref.current not readonly
          (ref as any).current = elm;
        }}
        {...toggleProps}
      />
    </div>
  );
});

export default Toggle;
