import React from "react";
import useDrawerStore from "../../drawer-store";
import Button from "@/common/components/button";
import Link from "next/link";
import Icon from "@/common/components/icon";

function PageSpecificNavbarActions() {
  const { activePagePathname } = useDrawerStore(store => ({ activePagePathname: store.activePagePathname }));

  if (activePagePathname === "users") return <NavbarActionsForUsersPage />;

  return <></>;
}

function NavbarActionsForUsersPage() {
  return (
    <Link href="/users/new">
      <Button startIcon={<Icon name="plus" size={16} />}>Add New User</Button>
    </Link>
  );
}

export default PageSpecificNavbarActions;
