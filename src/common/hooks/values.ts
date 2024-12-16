import { useCallback, useState } from "react";

export function useBooleanValue(defaultValue = false) {
  const [value, setValue] = useState(defaultValue);
  const toggleValue = useCallback(() => setValue(v => !v), []);
  const makeTrue = useCallback(() => setValue(true), []);
  const makeFalse = useCallback(() => setValue(false), []);
  return { value, toggleValue, makeFalse, makeTrue };
}
