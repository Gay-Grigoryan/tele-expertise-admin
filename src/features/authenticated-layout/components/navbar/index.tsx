"use client";

import React from "react";
import useDrawerStore from "../../drawer-store";
import IconButton from "@/common/components/icon-button";
import { Breadcrumb, breadcrumbs, pageTitles } from "./navbar-data";
import PageSpecificNavbarActions from "./page-specific-navbar-actions";
import Breadcrumbs from "./breadcrumbs";

function Navbar() {
  const { setIsDrawerOpen, isDrawerOpen, activePagePathname } = useDrawerStore(store => ({
    setIsDrawerOpen: store.setIsDrawerOpen,
    isDrawerOpen: store.isDrawerOpen,
    activePagePathname: store.activePagePathname
  }));

  function handleClick() {
    setIsDrawerOpen(!isDrawerOpen);
  }

  const breadcrumbInfo: Breadcrumb[] | undefined = breadcrumbs[activePagePathname || ""];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <IconButton onClick={handleClick} name={isDrawerOpen ? "hamburger" : "long-arrow-right"} color="black" size={24} />
          <h1 className="text-black-title font-bold text-h1">{pageTitles[activePagePathname || ""]}</h1>
        </div>
        <div>
          <PageSpecificNavbarActions />
        </div>
      </div>
      {breadcrumbInfo && (
        <div className="pl-[56px]">
          <Breadcrumbs items={breadcrumbInfo} />
        </div>
      )}
    </div>
  );
}

export default Navbar;
