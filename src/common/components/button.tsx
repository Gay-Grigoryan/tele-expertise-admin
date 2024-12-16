"use client";

import Image from "next/image";
import React, { ButtonHTMLAttributes, PropsWithChildren, useContext, useState } from "react";

export type ButtonVariant = "filled" | "outlined" | "ghost";
export type ButtonColor = "primary" | "black" | "white";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  variant?: ButtonVariant;
  color?: ButtonColor;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loading?: boolean;
}

function Button({
  onClick,
  variant = "filled",
  color = "primary",
  loading = false,
  children,
  className,
  startIcon,
  endIcon,
  ...buttonAttributes
}: PropsWithChildren<Props>) {
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
        className={`
          box-border flex h-10 items-center justify-center gap-1 rounded-lg px-6 py-3 font-medium text-l2
          ${loading ? "px-10 py-2" : ""}
          ${
            variant === "filled"
              ? `${
                  color === "primary"
                    ? ` bg-gradient-primary ${
                        !disabled
                          ? "hover:hover:bg-gradient-primary-hover text-white active:bg-gradient-primary"
                          : "bg-gray-medium bg-none text-gray-dark"
                      }`
                    : ""
                }`
              : variant === "outlined"
              ? `${
                  color === "primary"
                    ? `border border-gray-dark text-black ${
                        !disabled
                          ? "hover:border-primary hover:bg-gradient-primary hover:text-white  active:border-none active:bg-gradient-primary active:text-white"
                          : "border-gray-medium text-gray-medium"
                      }`
                    : ""
                }`
              : variant === "ghost"
              ? `${
                  color === "primary"
                    ? `bg-white text-black ${!disabled ? "hover:text-black/70 active:text-primary" : "text-gray-medium"}`
                    : ""
                }`
              : ""
          }

          ${
            disabled
              ? variant === "filled"
                ? "!bg-gray-medium"
                : variant === "outlined"
                ? "!border-gray-300 opacity-40"
                : ""
              : ""
          }
          ${className}
        `}
        onClick={onClick}
        {...buttonAttributes}
        disabled={disabled || loading}
      >
        {loading ? (
          <div className="flex h-6 w-6 items-center">
            <Image src="/images/loading.gif" alt="loading gif" width={24} height={24} />
          </div>
        ) : (
          <>
            {startIcon}
            {children}
            {endIcon}
          </>
        )}
      </button>
    </ButtonContext.Provider>
  );
}

interface ButtonContext {
  color?: ButtonColor;
  variant?: ButtonVariant;
  hover?: boolean;
  pressed?: boolean;
}

export const ButtonContext = React.createContext<ButtonContext | undefined>(undefined);

export function useButtonContext() {
  return useContext(ButtonContext);
}

export default Button;
