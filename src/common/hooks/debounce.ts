import { useEffect, useRef, useState } from "react";
import { useCallbackRef } from "./callbacks";

export const useDebouncedValue = <T>(receivedValue: T, delay = 0, callback?: () => void) => {
  const [value, setValue] = useState<T>(receivedValue);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>();

  const callbackRef = useCallbackRef(() => callback?.());

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setValue(receivedValue);
      callbackRef.current();
    }, delay);
  }, [receivedValue, delay, callbackRef]);

  return value;
};
