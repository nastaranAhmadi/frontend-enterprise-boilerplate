import { useDebounce } from './useDebounce';
import { useDebouncedValue } from './useDebouncedValue';
import { useLatest } from './useLatest';
import { useUnmount } from './useUnmount';

export { useDebounce, useDebouncedValue, useLatest, useUnmount };

export type UseDebounceHook = typeof useDebounce;
export type UseDebouncedValueHook = typeof useDebouncedValue;
export type UseLatestHook = typeof useLatest;
export type UseUnmountHook = typeof useUnmount;
