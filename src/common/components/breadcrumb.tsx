import Link from "next/link";
import React from "react";
import Icon from "./icon";

interface Props {
  prevPage: string;
  prevPageHref: string;
  currentPage: string;
}

export default function Breadcrumb({ currentPage, prevPage, prevPageHref }: Props) {
  return (
    <div className=" flex w-full items-center gap-2 rounded-xl bg-white px-4 py-3">
      <Link href={prevPageHref} className="font-regular text-l1 text-black/70">
        {prevPage}
      </Link>
      <Icon name="arrow-right-gray" size={16} />
      <p className="font-regular text-l1 text-black">{currentPage}</p>
    </div>
  );
}
