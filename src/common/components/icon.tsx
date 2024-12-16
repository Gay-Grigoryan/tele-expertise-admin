"use client";

import { useIsMobile } from "../hooks/screen-sizes";
import Image from "next/image";
import { withClientOnly } from "./client-only";
import { useButtonContext } from "./button";

export interface IconProps {
  size?: number | { mobile: number; desktop: number };
  width?: number;
  height?: number;
  name: string;
  id?: string;
}

function Icon({
  size: sizeFromProps = 24,
  width: widthFromProps,
  height: heightFromProps,
  name: nameFromProps,
  ...imageProps
}: IconProps) {
  const isMobile = useIsMobile();
  const colorInButtonContext = useIconColorInButtonContext();

  const size = typeof sizeFromProps === "number" ? sizeFromProps : sizeFromProps[isMobile ? "mobile" : "desktop"];

  const width = widthFromProps || size;
  const height = heightFromProps || size;

  const name = colorInButtonContext ? `${nameFromProps}-${colorInButtonContext}` : nameFromProps;

  return <Image width="0" height="0" style={{ width, height }} alt="time icon" src={`/icons/${name}.svg`} {...imageProps} />;
}

function useIconColorInButtonContext() {
  const buttonContext = useButtonContext();
  if (!buttonContext) return undefined;

  const { color, hover, pressed, variant } = buttonContext;
  if (variant === "filled") {
    if (color === "primary") return "white";
  } else {
    if (color === "primary") {
      if (pressed) return "primary";
      if (hover) return "primary-700";
      return "primary";
    }
    return color;
  }
}

export default withClientOnly(Icon);
