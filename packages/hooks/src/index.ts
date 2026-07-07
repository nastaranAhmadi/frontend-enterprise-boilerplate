import { type RefObject, useEffect, useRef } from 'react';

/** Returns a stable ref that always holds the latest value. */
export function useLatest<T>(value: T): RefObject<T> {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref;
}

/** Invokes callback on unmount only. */
export function useUnmount(callback: () => void): void {
  const callbackRef = useLatest(callback);
  useEffect(() => {
    return () => {
      callbackRef.current();
    };
  }, [callbackRef]);
}
