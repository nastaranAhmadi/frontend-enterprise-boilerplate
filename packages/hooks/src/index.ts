import type { RefObject } from 'react';

export type UseLatestHook = <T>(value: T) => RefObject<T>;

export type UseUnmountHook = (callback: () => void) => void;
