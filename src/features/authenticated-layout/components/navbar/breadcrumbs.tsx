import Link from "next/link";
import { Breadcrumb } from "./navbar-data";
import React from "react";
import Icon from "@/common/components/icon";

interface Props {
  items: Breadcrumb[];
}

export default function Breadcrumbs({ items }: Props) {
  return (
    <div className="flex flex-nowrap items-center gap-2">
      {items.map((item, i) => (
        <div className="flex items-center gap-2 font-regular text-l1 text-black/70" key={`breadcrumb-${i}-${item.title}`}>
          {i !== 0 && <Icon name="arrow-right-gray" size={16} />}

          {item.path ? (
            <Link href={item.path} key={item.path}>
              <span>{item.title}</span>
            </Link>
          ) : (
            <span className="text-black">{item.title}</span>
          )}
        </div>
      ))}
    </div>
  );
}
