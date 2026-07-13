import { describe, expect, it } from 'vitest';

import {
  buildAbsoluteUrl,
  buildCanonicalUrl,
  buildLanguageAlternates,
  buildLocalizedBlogPostPath,
} from './alternates';

describe('buildAbsoluteUrl', () => {
  it('resolves paths against the configured site URL', () => {
    expect(buildAbsoluteUrl('/en/about')).toBe('http://localhost:4200/en/about');
  });
});

describe('buildCanonicalUrl', () => {
  it('builds localized canonical URLs for route keys', () => {
    expect(buildCanonicalUrl('en', 'contact')).toBe('http://localhost:4200/en/contact');
    expect(buildCanonicalUrl('fa', 'home')).toBe('http://localhost:4200/fa');
  });
});

describe('buildLocalizedBlogPostPath', () => {
  it('builds blog post paths per locale', () => {
    expect(buildLocalizedBlogPostPath('en', 'hello-world')).toBe('/en/blog/hello-world');
  });
});

describe('buildLanguageAlternates', () => {
  it('maps all locales and x-default for a localized path', () => {
    const alternates = buildLanguageAlternates('en', '/en/contact');

    expect(alternates.en).toBe('http://localhost:4200/en/contact');
    expect(alternates.fa).toBe('http://localhost:4200/fa/contact');
    expect(alternates['x-default']).toBe('http://localhost:4200/en/contact');
  });

  it('preserves nested segments when swapping locale', () => {
    const alternates = buildLanguageAlternates('fa', '/fa/blog/my-post');

    expect(alternates.en).toBe('http://localhost:4200/en/blog/my-post');
    expect(alternates.fa).toBe('http://localhost:4200/fa/blog/my-post');
  });
});
