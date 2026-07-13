import type { Metadata } from 'next';

import { seoDefaults } from '@/config/seo';
import type { Locale } from '@/config/site';

import { buildAbsoluteUrl, buildLanguageAlternates } from './alternates';

type CreatePageMetadataInput = {
  locale: Locale;
  pathname: string;
  title: string;
  description: string;
  keywords?: readonly string[];
  noIndex?: boolean;
};

export const createPageMetadata = ({
  locale,
  pathname,
  title,
  description,
  keywords,
  noIndex = false,
}: CreatePageMetadataInput): Metadata => {
  const canonical = buildAbsoluteUrl(pathname);
  const languages = buildLanguageAlternates(locale, pathname);
  const ogImage = buildAbsoluteUrl(seoDefaults.ogImagePath);

  return {
    title,
    description,
    keywords: keywords ? [...keywords] : undefined,
    metadataBase: new URL(seoDefaults.siteUrl),
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: seoDefaults.siteName,
      locale,
      type: 'website',
      images: [
        {
          url: ogImage,
          width: seoDefaults.ogImageWidth,
          height: seoDefaults.ogImageHeight,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: seoDefaults.twitterHandle,
      images: [ogImage],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
  };
};

export const createRootMetadata = (locale: Locale): Metadata => {
  const pathname = `/${locale}`;

  return {
    metadataBase: new URL(seoDefaults.siteUrl),
    applicationName: seoDefaults.siteName,
    creator: seoDefaults.siteName,
    publisher: seoDefaults.siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: [{ url: seoDefaults.iconPath, type: 'image/svg+xml' }],
      apple: [{ url: seoDefaults.appleIconPath }],
    },
    manifest: '/manifest.webmanifest',
    alternates: {
      canonical: buildAbsoluteUrl(pathname),
      languages: buildLanguageAlternates(locale, pathname),
    },
  };
};
