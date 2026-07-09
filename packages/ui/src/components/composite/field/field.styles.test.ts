import { describe, expect, it } from 'vitest';

import { FIELD_ROOT_CLASS, getFieldRootClassName } from './field.styles';

describe('getFieldRootClassName', () => {
  it('returns the default field root class', () => {
    expect(getFieldRootClassName({})).toBe(FIELD_ROOT_CLASS);
    expect(FIELD_ROOT_CLASS).toBe('flex flex-col gap-1');
  });

  it('appends a consumer className', () => {
    expect(getFieldRootClassName({ className: 'custom-field' })).toBe(
      'flex flex-col gap-1 custom-field',
    );
  });
});
