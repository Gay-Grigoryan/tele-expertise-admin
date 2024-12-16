import React from "react";
import Input, { InputProps } from "./input";
import PasswordInput from "./password-input";
import { Controller, ControllerProps, FieldValues } from "react-hook-form";

interface Props<T extends FieldValues> extends InputProps {
  controllerProps: Omit<ControllerProps<T>, "render">;
}

export default function ValidationInput<T extends FieldValues>({ controllerProps, ...props }: Props<T>) {
  const isPasswordInput = props.type === "password";
  return (
    <div>
      <Controller
        {...controllerProps}
        render={({ field, fieldState }) => {
          return (
            <div className="flex flex-col gap-1">
              {isPasswordInput ? <PasswordInput {...field} {...props} /> : <Input {...field} {...props} />}
              <p className="h-4 pl-3 font-regular text-p4 font-light text-red">{fieldState.error?.message}</p>
            </div>
          );
        }}
      />
    </div>
  );
}
