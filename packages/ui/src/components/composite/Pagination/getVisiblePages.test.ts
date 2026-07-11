import { describe, expect, it } from 'vitest';

import { getVisiblePages } from './getVisiblePages';

describe('getVisiblePages', () => {
  it('returns an empty list when there are no pages', () => {
    expect(getVisiblePages(1, 0, 1, 1)).toEqual([]);
  });

  it('returns a single page when totalPages is 1', () => {
    expect(getVisiblePages(1, 1, 1, 1)).toEqual([1]);
  });

  it('returns all pages when the total is small', () => {
    expect(getVisiblePages(2, 5, 1, 1)).toEqual([1, 2, 3, 4, 5]);
  });

  it('returns boundary and sibling pages with ellipses on both sides', () => {
    expect(getVisiblePages(10, 20, 1, 1)).toEqual([1, 'ellipsis', 9, 10, 11, 'ellipsis', 20]);
  });

  it('returns a right ellipsis when the current page is near the start', () => {
    expect(getVisiblePages(2, 20, 1, 1)).toEqual([1, 2, 3, 4, 5, 'ellipsis', 20]);
  });

  it('returns a left ellipsis when the current page is near the end', () => {
    expect(getVisiblePages(19, 20, 1, 1)).toEqual([1, 'ellipsis', 16, 17, 18, 19, 20]);
  });

  it('respects custom sibling and boundary counts', () => {
    expect(getVisiblePages(10, 30, 2, 2)).toEqual([
      1,
      2,
      'ellipsis',
      8,
      9,
      10,
      11,
      12,
      'ellipsis',
      29,
      30,
    ]);
  });
});
