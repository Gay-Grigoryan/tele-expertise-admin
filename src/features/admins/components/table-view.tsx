import React from "react";
import Icon from "@/common/components/icon";
import Actions from "@/common/components/actions";
import Link from "next/link";
import { Admin } from "@/api/slices/doctors";
import useAuthStore from "@/features/auth/auth-store";

interface Props {
  admins: Admin[];
  onEdit: (info: Admin) => void;
  onRemove: (id: string) => void;
}

export default function AdminsTableView({ admins, onEdit, onRemove }: Props) {
  const { type } = useAuthStore(state => ({ type: state.info }));

  const isSuperAdmin = type === "super_admin";

  return (
    <div className="flex flex-1 flex-col gap-2">
      {admins.map(admin => {
        return (
          <div key={admin.id} className="flex cursor-pointer items-center bg-white px-4 py-3">
            <div className="flex h-full flex-1 items-center gap-4">
              <h4 className="font-medium text-h4 text-black">{admin.name}</h4>
            </div>

            <div className="flex-1">
              <TableItem icon="phone-active" text={admin.phone} />
            </div>
            <div className="flex w-[128px] justify-end gap-2 pl-4">
              {isSuperAdmin ? (
                <Actions onEdit={() => onEdit && onEdit(admin)} onRemove={() => onRemove && onRemove(admin.id)} />
              ) : (
                <Link href={`/doctors/${admin.id}/chat`}>
                  <Icon name="chat" size={16} />
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface TableItemProps {
  icon: string;
  text: string;
}

function TableItem({ icon, text }: TableItemProps) {
  return (
    <div className="flex items-center gap-2">
      <Icon name={icon} size={16} />
      <p className="font-regular text-p2 text-black">{text}</p>
    </div>
  );
}
