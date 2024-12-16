"use client";
import React, { useState } from "react";
import Image from "next/image";
import LoginForm, { LoginFormValues } from "@/features/auth/components/login-form";
import Api from "@/api";
import { enqueueSnackbar } from "notistack";
import { _UNAUTHORIZED_ } from "@/api/error-codes";
import useAuthStore, { UserType } from "@/features/auth/auth-store";
import { useRouter } from "next/navigation";
import { useAvoidAuthenticated } from "@/features/auth/auth-hooks";
import ApiSlice from "@/api/slice";

const HOME_PAGE = {
  doctor: "/doctor-chats",
  super_admin: "/doctors"
};

export default function Login() {
  const { userType, setToken, setInfo } = useAuthStore(state => ({
    userType: state.info,
    setToken: state.setToken,
    setInfo: state.setInfo
  }));
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useAvoidAuthenticated(HOME_PAGE[userType as UserType]);

  async function onSubmit(values: LoginFormValues) {
    setLoading(true);
    const { data, meta } = await Api.auth.Login(values);
    setLoading(false);
    if (meta.error) {
      if (meta.error.code === _UNAUTHORIZED_) {
        enqueueSnackbar("Wrong email or password", { variant: "error" });
      }
      return;
    }
    ApiSlice.setToken(data.token);
    setToken(data.token);
    setInfo(data.type);
    router.push(HOME_PAGE[data.type]);
  }

  return (
    <div className="flex flex-1 items-center justify-center shadow-md">
      <div className="flex w-[400px] flex-col gap-6 rounded-lg bg-white p-4">
        <div className="flex justify-center">
          <Image src="/images/MEDBRIDGE-2.png" width={190} height={50} alt="stone logo" />
        </div>
        <LoginForm onSubmit={onSubmit} loading={loading} />
      </div>
    </div>
  );
}
