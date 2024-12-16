import { useEffect, useRef, useState } from "react";

export function useDivElementSize(shouldUpdate: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (shouldUpdate && ref.current) {
      setWidth(ref.current.offsetWidth);
      setHeight(ref.current.offsetHeight);
    }
  }, [shouldUpdate]);

  return { ref, width, height };
}
