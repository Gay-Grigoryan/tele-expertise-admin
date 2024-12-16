import React from "react";
import Image from "next/image";

interface Props {
  adminName: string;
}

export default function AdminInfo({ adminName }: Props) {
  return (
    <div className="flex items-center gap-1 rounded-[40px] bg-gray-light p-2">
      <div className="relative aspect-square w-4">
        <Image layout="fill" src="/images/user-placeholder.svg" alt="admin image" />
      </div>
      <p className="font-regular text-p4 text-black">{adminName}</p>
    </div>
  );
}
