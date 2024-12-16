import React from "react";

export enum Status {
  approved = "approved",
  rejected = "rejected"
}

interface Props {
  status: Status;
}

export const colors: Record<Status, string> = {
  approved: "bg-yellow",
  rejected: "bg-red"
};
const texts: Record<Status, string> = {
  approved: "Հաստատված",
  rejected: "Մերժված"
};

export default function StatusBox({ status }: Props) {
  return (
    <div className="flex h-[30px] items-center gap-1 rounded-[40px] bg-gray-light p-2 pr-3">
      <div className={`h-3 w-3 rounded-full ${colors[status]}`} />
      <p className="font-regular text-p4 font-[300] text-black">{texts[status]}</p>
    </div>
  );
}
