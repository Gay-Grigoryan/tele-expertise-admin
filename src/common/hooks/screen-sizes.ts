import { useEffect, useState } from "react";

const SCREEN_BREAKPOINTS = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280
};

function getIsMobile() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(`(max-width: ${SCREEN_BREAKPOINTS.md}px)`).matches;
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(getIsMobile());

  // Update isMobile on window resize
  useEffect(() => {
    function handleResize() {
      setIsMobile(getIsMobile());
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}
