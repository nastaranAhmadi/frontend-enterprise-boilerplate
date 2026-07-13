import type { MetadataRoute } from 'next';

import { seoDefaults } from '@/config/seo';
import { defaultLocale } from '@/config/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: seoDefaults.siteName,
    short_name: seoDefaults.siteName,
    description: 'Production-grade enterprise landing experience.',
    start_url: `/${defaultLocale}`,
    display: 'standalone',
    background_color: seoDefaults.backgroundColor,
    theme_color: seoDefaults.themeColor,
    lang: defaultLocale,
    icons: [
      {
        src: seoDefaults.iconPath,
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  };
}
