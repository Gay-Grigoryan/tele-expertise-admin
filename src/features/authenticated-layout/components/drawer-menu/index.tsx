"use client";

import React from "react";
import { drawerMenuPages, superAdminDrawerMenuPages } from "./drawer-menu-data";
import DrawerMenuItem from "./drawer-menu-item";
import { usePathname } from "next/navigation";
import UserInfo from "./user-info";
import useAuthStore from "@/features/auth/auth-store";

function DrawerMenu() {
  const pathname = usePathname();
  const { type } = useAuthStore(state => ({ type: state.info }));

  return (
    <div className="bg-gradient-gray h-full w-[300px] flex-1 bg-white">
      <div className="flex flex-col items-start gap-8">
        <UserInfo />
        <div className="w-full">
          {(type === "doctor" ? drawerMenuPages : superAdminDrawerMenuPages).map(page => {
            const hasSubItems = Boolean(page.subPages);
            const isActive = `/${pathname.split("/")[1]}` === page.path;
            return <DrawerMenuItem key={page.path} info={page} active={isActive} hasSubItems={hasSubItems} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default DrawerMenu;
