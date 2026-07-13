import { useCallback, useRef } from 'react';

import { useLatest } from './useLatest';
import { useUnmount } from './useUnmount';

export const useDebounce = <TArgs extends unknown[]>(
  callback: (...args: TArgs) => void,
  delayMs: number,
): ((...args: TArgs) => void) => {
  const callbackRef = useLatest(callback);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useUnmount(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }
  });

  return useCallback(
    (...args: TArgs) => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delayMs);
    },
    [callbackRef, delayMs],
  );
};
