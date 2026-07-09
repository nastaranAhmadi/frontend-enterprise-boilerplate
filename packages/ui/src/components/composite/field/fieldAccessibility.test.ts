import { describe, expect, it } from 'vitest';

import { buildAriaDescribedBy } from './fieldAccessibility';

describe('buildAriaDescribedBy', () => {
  it('returns undefined when no ids are provided', () => {
    expect(buildAriaDescribedBy()).toBeUndefined();
  });

  it('returns undefined when all ids are empty', () => {
    expect(buildAriaDescribedBy(undefined, undefined)).toBeUndefined();
  });

  it('returns a single id', () => {
    expect(buildAriaDescribedBy('bio-helper')).toBe('bio-helper');
  });

  it('joins helper and error ids', () => {
    expect(buildAriaDescribedBy('bio-helper', 'bio-error')).toBe('bio-helper bio-error');
  });

  it('skips undefined ids and merges consumer ids', () => {
    expect(buildAriaDescribedBy('bio-helper', undefined, 'external-description')).toBe(
      'bio-helper external-description',
    );
  });
});
