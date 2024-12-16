import React from "react";
import ValidationInput from "@/common/components/ValidationInput";
import Button from "@/common/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" })
});

export type LoginFormValues = z.infer<typeof schema>;

interface Props {
  onSubmit: (values: LoginFormValues) => void;
  loading: boolean;
}

export default function LoginForm({ onSubmit, loading }: Props) {
  const { handleSubmit, control } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-full flex-col gap-2">
        <ValidationInput
          controllerProps={{ control: control, name: "email" }}
          placeholder="Էլ․ հասցե"
          className="w-full"
          type="email"
        />
        <ValidationInput
          controllerProps={{ control: control, name: "password" }}
          placeholder="Գաղտնաբառ"
          className="w-full"
          type="password"
        />
      </div>
      <div className="w-full">
        <Button type="submit" className="w-full" loading={loading}>
          Log In
        </Button>
      </div>
    </form>
  );
}
