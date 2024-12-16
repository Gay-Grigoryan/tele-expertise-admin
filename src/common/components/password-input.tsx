"use client";
import React, { useState } from "react";
import Input, { InputProps } from "./input";
import Icon from "./icon";
import { enqueueSnackbar } from "notistack";

interface Props extends Omit<InputProps, "type"> {
  copy?: boolean;
}

const PasswordInput = React.forwardRef<HTMLInputElement, Props>(function PasswordInput({ copy, ...inputProps }, ref) {
  const [showPassword, setShowPassword] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText((inputProps.value as string) || "");
    enqueueSnackbar("Password copied to clipboard", { variant: "success" });
  }

  return (
    <Input
      {...inputProps}
      type={showPassword ? "text" : "password"}
      ref={ref}
      endIcons={
        <div className="flex h-full items-center justify-center gap-2">
          <div onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
            <Icon size={16} name={showPassword ? "eye-closed" : "eye-open"} />
          </div>
          {copy && (
            <div onClick={handleCopy} className="cursor-pointer">
              <Icon size={16} name="copy-gray" />
            </div>
          )}
        </div>
      }
    />
  );
});

export default PasswordInput;
