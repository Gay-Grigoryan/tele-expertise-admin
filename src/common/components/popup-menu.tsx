import React, { useMemo, useState } from "react";
import Icon from "./icon";
import { useRouter } from "next/navigation";
import { useDivElementSize } from "../hooks/elements";

export interface PopupMenuItem {
  icon?: string;
  label: string;
  disabled?: boolean;
  labelClassName?: string;
  onClick?: () => void;
  href?: string;
}

interface Props {
  children: (handleAnchorElementClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void) => React.ReactNode;
  items?: PopupMenuItem[];
  content?: React.ReactNode;
}

function PopupMenu({ children, items, content }: Props) {
  const router = useRouter();
  const [anchorCoordinates, setAnchorCoordinates] = useState<{ x: number; y: number }>();
  const { ref: menuRef, width: menuWidth, height: menuHeight } = useDivElementSize(Boolean(anchorCoordinates));

  const menuCoordinates = useMemo(() => {
    if (!anchorCoordinates) {
      return;
    }
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const left = anchorCoordinates.x + menuWidth > screenWidth ? anchorCoordinates.x - menuWidth : anchorCoordinates.x;
    const top = anchorCoordinates.y + menuHeight > screenHeight ? anchorCoordinates.y - menuHeight : anchorCoordinates.y;

    return { left, top };
  }, [anchorCoordinates, menuWidth, menuHeight]);

  function handleAnchorElementClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    setAnchorCoordinates({ x: e.clientX, y: e.clientY });
  }

  function handleClickOnItem(item: PopupMenuItem) {
    if (item.disabled) return;

    if (item.href) {
      router.push(item.href);
    } else if (item.onClick) {
      setAnchorCoordinates(undefined);
      item.onClick();
    }
  }

  return (
    <div>
      {children(handleAnchorElementClick)}
      {menuCoordinates && (
        <div
          className="bg-black-title absolute left-0 top-0 z-10 h-[100dvh] w-screen bg-opacity-50"
          onClick={() => setAnchorCoordinates(undefined)}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: "fixed",
              top: menuCoordinates.top,
              left: menuCoordinates.left,
              width: "max-content"
            }}
            ref={menuRef}
          >
            {content ||
              (items && (
                <div className="rounded-[5px] bg-white p-4">
                  <div className="flex flex-col gap-3">
                    {items.map((item, i) => (
                      <div
                        key={`menu-${item.label}-${i}`}
                        className={`
                          flex cursor-pointer items-center gap-1 px-1.5 py-1 ${item.disabled ? "opacity-30" : ""}
                          hover:bg-primary-50
                        `}
                        onClick={() => handleClickOnItem(item)}
                      >
                        {item.icon && <Icon name={item.icon} size={24} />}
                        <p className={`text-black-title font-medium text-base ${item.labelClassName}`}>{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PopupMenu;
