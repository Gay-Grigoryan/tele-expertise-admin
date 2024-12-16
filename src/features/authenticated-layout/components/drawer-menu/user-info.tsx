"use client";
import IconButton from "@/common/components/icon-button";
import { useModal } from "@/common/hooks/modal";
import useAuthStore from "@/features/auth/auth-store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import LogoutModal from "./logout-modal";

export default function UserInfo() {
  const { setToken, setInfo, type } = useAuthStore(state => ({
    setToken: state.setToken,
    setInfo: state.setInfo,
    type: state.info
  }));
  const router = useRouter();
  const isAdmin = type === "doctor";
  const { isOpen, openModal, closeModal } = useModal();

  const logout = () => {
    setToken(null);
    setInfo(null);
    router.push("/login");
    closeModal();
  };
  return (
    <div className="flex w-full items-center justify-between p-4 pb-2">
      <div className="flex items-center gap-2">
        <Image src={`/images/${"MEDBRIDGE-2.png"}`} alt="user avatar" width={32} height={32} />
        <p className="font-regular text-p2 text-black">{isAdmin ? "Doctor" : "Director"}</p>
      </div>
      <div className="flex items-center gap-2">
        <IconButton
          name="logout"
          color="black"
          width={16}
          height={16}
          className="!rounded-full bg-gray-light"
          onClick={openModal}
        />
      </div>
      <LogoutModal closeModal={closeModal} isOpen={isOpen} onApprove={logout} />
    </div>
  );
}
