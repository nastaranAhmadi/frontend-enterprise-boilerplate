import { describe, expect, it } from 'vitest';

import { isRtlLocale, resolveDirFromLocale, resolveLangFromLocale } from './locale';

describe('locale helpers', () => {
  it('detects rtl locales', () => {
    expect(isRtlLocale('fa')).toBe(true);
    expect(isRtlLocale('fa-IR')).toBe(true);
    expect(isRtlLocale('ar_SA')).toBe(true);
    expect(isRtlLocale('en')).toBe(false);
    expect(isRtlLocale('en-US')).toBe(false);
  });

  it('resolves direction from locale', () => {
    expect(resolveDirFromLocale('en')).toBe('ltr');
    expect(resolveDirFromLocale('fa-IR')).toBe('rtl');
  });

  it('resolves language subtag from locale', () => {
    expect(resolveLangFromLocale('en-US')).toBe('en');
    expect(resolveLangFromLocale('fa_IR')).toBe('fa');
  });
});
