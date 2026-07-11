import { describe, expect, it } from 'vitest';

import { getToastViewportClassName } from './Toast.styles';

describe('Toast styles', () => {
  it('uses logical inset utilities for viewport positions', () => {
    expect(getToastViewportClassName({ position: 'top-start' })).toContain('start-md');
    expect(getToastViewportClassName({ position: 'top-start' })).not.toContain('left-md');
    expect(getToastViewportClassName({ position: 'top-end' })).toContain('end-md');
    expect(getToastViewportClassName({ position: 'top-end' })).not.toContain('right-md');
  });
});
