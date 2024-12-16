import React from "react";
import Card from "@/common/components/card";
import Actions from "@/common/components/actions";
import Link from "next/link";
import { Admin } from "@/api/slices/doctors";
import useAuthStore from "@/features/auth/auth-store";
import Icon from "@/common/components/icon";

interface Props {
  admins: Admin[];
  onEdit?: (info: Admin) => void;
  onRemove?: (id: string) => void;
}

export default function AdminsGridView({ admins, onEdit, onRemove }: Props) {
  const { type } = useAuthStore(state => ({ type: state.info }));
  const isSuperAdmin = type === "super_admin";

  return (
    <div className="flex flex-1 flex-wrap content-start gap-3">
      {admins.map(admin => {
        return (
          <Card key={admin.id} className="h-max w-[calc(25%-12px)]">
            <div className="flex flex-col gap-2">
              <Card.Title title={admin.name} />
            </div>
            <div className="flex flex-col gap-2">
              <Card.Item text={admin.phone} icon="phone-active" />
            </div>
            <div className="border-t border-gray-light pt-3">
              <div className="flex justify-end">
                {isSuperAdmin ? (
                  <Actions onEdit={() => onEdit && onEdit(admin)} onRemove={() => onRemove && onRemove(admin.id)} />
                ) : (
                  <Link href={`/doctors/${admin.id}/chat`}>
                    <Icon name="chat" size={16} />
                  </Link>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
