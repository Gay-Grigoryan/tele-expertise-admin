"use client";

import React, { ButtonHTMLAttributes, useState } from "react";
import { ButtonContext, ButtonVariant, ButtonColor } from "./button";
import Icon, { IconProps } from "./icon";

export type IconButtonSize = "regular" | "xs";

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "name">, IconProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  variant?: Exclude<ButtonVariant, "filled">;
  color?: ButtonColor;
  buttonSize?: IconButtonSize;
}

const buttonSizeInPx: Record<IconButtonSize, number> = {
  regular: 40,
  xs: 24
};

function IconButton({
  onClick,
  variant = "ghost",
  color = "primary",
  className,
  name,
  size,
  width,
  height,
  buttonSize = "regular",
  ...buttonAttributes
}: Props) {
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);

  const { disabled } = buttonAttributes;

  return (
    <ButtonContext.Provider value={{ color, hover, pressed, variant }}>
      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onTouchStart={() => setPressed(true)}
        onTouchEnd={() => setPressed(false)}
        style={{
          width: buttonSizeInPx[buttonSize],
          height: buttonSizeInPx[buttonSize]
        }}
        className={`
          box-border flex items-center justify-center gap-1 rounded-lg p-1 font-medium text-base
          ${
            variant === "outlined"
              ? `${
                  color === "primary"
                    ? `border border-primary text-primary ${
                        !disabled
                          ? "hover:border-primary-700 hover:text-primary-700 active:shadow-primary100_4 active:border-primary active:text-primary"
                          : ""
                      }`
                    : "border-gray-dark"
                }`
              : variant === "ghost"
              ? `${
                  color === "primary"
                    ? `text-primary ${
                        !disabled
                          ? "hover:bg-primary-50 hover:text-primary-700 active:shadow-primary100_4 active:text-primary"
                          : ""
                      }`
                    : ""
                }`
              : ""
          }

          ${
            disabled
              ? variant === "ghost"
                ? "opacity-40"
                : variant === "outlined"
                ? "border-gray-medium"
                : "border-gray-dark"
              : ""
          }
          ${className}
        `}
        onClick={onClick}
        {...buttonAttributes}
      >
        <Icon name={name} width={width} height={height} size={size} />
      </button>
    </ButtonContext.Provider>
  );
}

export default IconButton;
