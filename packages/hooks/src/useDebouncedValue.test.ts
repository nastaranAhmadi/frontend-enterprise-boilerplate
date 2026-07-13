import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useDebouncedValue } from './useDebouncedValue';

describe('useDebouncedValue', () => {
  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebouncedValue('alpha', 300));
    expect(result.current).toBe('alpha');
  });

  it('updates after the delay', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value, delayMs }) => useDebouncedValue(value, delayMs),
      { initialProps: { value: 'alpha', delayMs: 300 } },
    );

    rerender({ value: 'beta', delayMs: 300 });
    expect(result.current).toBe('alpha');

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe('beta');
    vi.useRealTimers();
  });
});
