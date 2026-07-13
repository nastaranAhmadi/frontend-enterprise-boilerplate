import { env } from './env';
import { siteName } from './site';

export const seoDefaults = {
  siteName,
  siteUrl: env.siteUrl,
  twitterHandle: '@enterprise',
  iconPath: '/icon.svg',
  appleIconPath: '/icon.svg',
  ogImagePath: '/og-image.svg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  themeColor: '#0f172a',
  backgroundColor: '#ffffff',
} as const;

export const siteKeywords = [
  'enterprise',
  'frontend',
  'design system',
  'next.js',
  'react',
] as const;
