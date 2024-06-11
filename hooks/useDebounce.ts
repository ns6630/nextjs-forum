import { useCallback, useEffect, useRef } from "react";

export type Callback = (...args: any[]) => unknown;

export function useDebounce(callback: Callback, delay: number) {
  const callbackRef = useRef<Callback>();
  callbackRef.current = callback;

  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const trigger = useCallback(
    // @ts-ignore
    (...args) => {
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => callbackRef.current?.(...args), delay);
    },
    [delay]
  );

  useEffect(() => () => clearTimeout(timeout.current), []);

  return trigger;
}
