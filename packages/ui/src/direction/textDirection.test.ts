import { describe, expect, it } from 'vitest';

import {
  getHorizontalNavigationKeys,
  mirrorTooltipPlacementForRtl,
  resolveTextDirection,
  resolveTextDirectionFromElement,
} from './textDirection';

describe('textDirection', () => {
  it('resolves explicit dir before provider and document', () => {
    expect(resolveTextDirection({ dir: 'rtl', providerDir: 'ltr' })).toEqual({
      dir: 'rtl',
      isRtl: true,
    });
  });

  it('falls back to provider dir', () => {
    expect(resolveTextDirection({ providerDir: 'rtl' })).toEqual({
      dir: 'rtl',
      isRtl: true,
    });
  });

  it('resolves dir from the nearest ancestor element', () => {
    const root = document.createElement('div');
    root.setAttribute('dir', 'rtl');
    const child = document.createElement('span');
    root.append(child);

    expect(resolveTextDirectionFromElement(child)).toBe('rtl');
  });

  it('mirrors tooltip placements in rtl', () => {
    expect(mirrorTooltipPlacementForRtl('left', true)).toBe('right');
    expect(mirrorTooltipPlacementForRtl('right-start', true)).toBe('left-end');
    expect(mirrorTooltipPlacementForRtl('top-start', true)).toBe('top-end');
    expect(mirrorTooltipPlacementForRtl('bottom', true)).toBe('bottom');
  });

  it('returns physical arrow keys for horizontal navigation', () => {
    expect(getHorizontalNavigationKeys(false)).toEqual({
      next: 'ArrowRight',
      previous: 'ArrowLeft',
    });
    expect(getHorizontalNavigationKeys(true)).toEqual({
      next: 'ArrowLeft',
      previous: 'ArrowRight',
    });
  });
});
