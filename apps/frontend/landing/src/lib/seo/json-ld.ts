import { seoDefaults } from '@/config/seo';
import type { Locale } from '@/config/site';
import { getDictionary } from '@/i18n/get-dictionary';

export type OrganizationSchema = {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  description: string;
};

export type WebSiteSchema = {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
  inLanguage: Locale;
  description: string;
};

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export type BreadcrumbSchema = {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqPageSchema = {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
};

export type ArticleSchema = {
  '@context': 'https://schema.org';
  '@type': 'Article';
  headline: string;
  description: string;
  datePublished: string;
  author: {
    '@type': 'Organization';
    name: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    logo: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  mainEntityOfPage: {
    '@type': 'WebPage';
    '@id': string;
  };
};

type BuildArticleSchemaInput = {
  title: string;
  description: string;
  publishedAt: string;
  url: string;
};

export const buildOrganizationSchema = (locale: Locale): OrganizationSchema => {
  const dictionary = getDictionary(locale);

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: seoDefaults.siteName,
    url: seoDefaults.siteUrl,
    logo: buildAbsoluteAssetUrl(seoDefaults.ogImagePath),
    description: dictionary.metadata.organizationDescription,
  };
};

export const buildWebSiteSchema = (locale: Locale): WebSiteSchema => {
  const dictionary = getDictionary(locale);

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: dictionary.metadata.siteTitle,
    url: `${seoDefaults.siteUrl}/${locale}`,
    inLanguage: locale,
    description: dictionary.metadata.siteDescription,
  };
};

export const buildBreadcrumbSchema = (items: readonly BreadcrumbItem[]): BreadcrumbSchema => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: new URL(item.path, seoDefaults.siteUrl).toString(),
  })),
});

export const buildFaqPageSchema = (items: readonly FaqItem[]): FaqPageSchema => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
});

export const buildArticleSchema = ({
  title,
  description,
  publishedAt,
  url,
}: BuildArticleSchemaInput): ArticleSchema => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description,
  datePublished: publishedAt,
  author: {
    '@type': 'Organization',
    name: seoDefaults.siteName,
  },
  publisher: {
    '@type': 'Organization',
    name: seoDefaults.siteName,
    logo: {
      '@type': 'ImageObject',
      url: buildAbsoluteAssetUrl(seoDefaults.ogImagePath),
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': url,
  },
});

const buildAbsoluteAssetUrl = (assetPath: string): string =>
  new URL(assetPath, seoDefaults.siteUrl).toString();
