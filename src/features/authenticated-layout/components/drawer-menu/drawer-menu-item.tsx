import React, { useEffect, useMemo, useState } from "react";
import { DrawerMenuPage } from "./drawer-menu-data";
import Icon from "@/common/components/icon";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface Props {
  info: DrawerMenuPage;
  active: boolean;
  hasSubItems: boolean;
}

function DrawerMenuItem({ info, active, hasSubItems }: Props) {
  const [expanded, setExpanded] = useState(false);
  const subPages = useMemo(() => info.subPages, [info]);
  const [activeFullPath, setActiveFullPath] = useState("");
  const pathname = usePathname();
  const params = useSearchParams();
  const onItemClick = (e: React.MouseEvent) => {
    if (hasSubItems) {
      e.preventDefault();
      setExpanded(prev => !prev);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams();
    const parameters = Object.fromEntries(params.entries());
    Object.keys(parameters).forEach(param => query.set(param, parameters[param]));
    setActiveFullPath(`${pathname}${query.toString() && `?${query.toString()}`}`);
  }, [pathname, params]);

  return (
    <div>
      <Link href={info.path} onClick={onItemClick} className="h-full">
        <div className="flex items-center gap-3 py-3 pr-4">
          <div className={`h-[18px] w-1 rounded-lg ${active ? "bg-gradient-primary" : "bg-white"}`} />
          <div className="flex flex-1 gap-3">
            <div>
              <Icon name={active ? info.activeIcon : info.icon} size={16} />
            </div>
            <div>
              <p className={`font-regular text-l1 ${active ? "text-black" : "text-black/70"}`}>{info.title}</p>
            </div>
          </div>
          {hasSubItems && (
            <div>
              <Icon name="arrow-down-gray" size={16} />
            </div>
          )}
        </div>
      </Link>
      <div className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${expanded ? "max-h-96" : "max-h-0"}`}>
        <div className="pl-11">
          <ul className="flex list-disc flex-col gap-3">
            {subPages?.map(subPage => {
              const isSubPageActive = subPage.path === activeFullPath;

              return (
                <Link href={subPage.path} replace key={subPage.path}>
                  <li
                    className={`font-regular text-l4 ${
                      isSubPageActive ? " text-black marker:text-primary" : "text-black/70 marker:text-gray-dark"
                    }`}
                  >
                    {subPage.title}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DrawerMenuItem;
