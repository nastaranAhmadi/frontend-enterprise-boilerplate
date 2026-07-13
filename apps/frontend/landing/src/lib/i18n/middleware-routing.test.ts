import { describe, expect, it } from 'vitest';

import {
  hasInvalidLocalePrefix,
  hasLocalePrefix,
  resolveLocaleRedirectPath,
  shouldBypassLocaleMiddleware,
} from './middleware-routing';

describe('shouldBypassLocaleMiddleware', () => {
  it('bypasses API routes', () => {
    expect(shouldBypassLocaleMiddleware('/api/contact')).toBe(true);
    expect(shouldBypassLocaleMiddleware('/api/products/search')).toBe(true);
  });

  it('does not bypass localized pages', () => {
    expect(shouldBypassLocaleMiddleware('/en/contact')).toBe(false);
    expect(shouldBypassLocaleMiddleware('/about')).toBe(false);
  });
});

describe('hasLocalePrefix', () => {
  it('detects locale root and nested paths', () => {
    expect(hasLocalePrefix('/en')).toBe(true);
    expect(hasLocalePrefix('/fa/blog')).toBe(true);
  });

  it('rejects paths without a locale prefix', () => {
    expect(hasLocalePrefix('/')).toBe(false);
    expect(hasLocalePrefix('/about')).toBe(false);
  });
});

describe('resolveLocaleRedirectPath', () => {
  it('returns null for API routes', () => {
    expect(resolveLocaleRedirectPath('/api/contact')).toBeNull();
  });

  it('redirects root to default locale', () => {
    expect(resolveLocaleRedirectPath('/')).toBe('/en');
  });

  it('rewrites invalid pseudo-locale prefixes to the default locale', () => {
    expect(hasInvalidLocalePrefix('/xx/contact')).toBe(true);
    expect(resolveLocaleRedirectPath('/xx/contact')).toBe('/en/contact');
    expect(resolveLocaleRedirectPath('/xx')).toBe('/en');
  });

  it('prefixes non-locale paths with the default locale', () => {
    expect(resolveLocaleRedirectPath('/about')).toBe('/en/about');
  });

  it('returns null for valid localized paths', () => {
    expect(resolveLocaleRedirectPath('/fa/contact')).toBeNull();
  });
});
