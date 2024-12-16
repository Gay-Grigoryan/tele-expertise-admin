import Image from "next/image";
import React, { InputHTMLAttributes, useRef, useState } from "react";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "children"> {
  containerClassName?: string;
  size?: number;
  label?: string;
  labelClassName?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { containerClassName, size = 16, label, labelClassName, ...checkboxProps },
  forwardedRef
) {
  const [checked, setChecked] = useState(checkboxProps.checked || false);
  const [hover, setHover] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  function handleChange() {
    setChecked(!checked);
    if (ref.current) {
      ref.current.click();
    }
  }
  return (
    <div className={`relative ${containerClassName}`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="flex flex-nowrap items-center gap-2">
        <div className="cursor-pointer">
          <Image
            alt="checkbox"
            src={
              checked
                ? "/images/checkbox_checked.svg"
                : hover
                ? "/images/checkbox_unchecked_hover.svg"
                : "/images/checkbox_unchecked.png"
            }
            width="0"
            height="0"
            style={{
              width: size,
              height: size
            }}
            onClick={handleChange}
            unoptimized
          />
        </div>
        {label && (
          <label
            className={`cursor-pointer font-regular text-p1 ${hover ? "text-black" : "text-gray-dark"} ${labelClassName}`}
            onClick={handleChange}
          >
            {label}
          </label>
        )}
      </div>
      <input
        type="checkbox"
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
        {...checkboxProps}
      />
    </div>
  );
});

export default Checkbox;
