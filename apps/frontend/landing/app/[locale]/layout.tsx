import { isRtlLocale, resolveDirFromLocale } from '@enterprise/ui/locale';
import type { Metadata } from 'next';
import { Inter, Playfair_Display, Vazirmatn } from 'next/font/google';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import { SiteShell } from '@/components/layout/site-shell';
import { OrganizationJsonLd } from '@/components/seo/organization-json-ld';
import { WebSiteJsonLd } from '@/components/seo/website-json-ld';
import { siteKeywords } from '@/config/seo';
import { isLocale, type Locale, locales } from '@/config/site';
import { defaultThemePreference } from '@/config/theme';
import { createT } from '@/i18n/t';
import { parseThemeCookie } from '@/lib/cookies/theme';
import { createRootMetadata } from '@/lib/seo/metadata';
import { resolveThemePreference, themeInitScript } from '@/lib/theme/theme-init-script';
import { AppProviders } from '@/providers/app-providers';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-family-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-family-serif',
});

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-family-sans',
});

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export const generateMetadata = async ({ params }: LocaleLayoutProps): Promise<Metadata> => {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    return {};
  }

  const t = createT(localeParam);

  return {
    ...createRootMetadata(localeParam),
    title: {
      default: t('metadata.siteTitle'),
      template: `%s | ${t('metadata.siteTitle')}`,
    },
    description: t('metadata.siteDescription'),
    keywords: [...siteKeywords],
  };
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;
  const t = createT(locale);
  const dir = resolveDirFromLocale(locale);
  const cookieStore = await cookies();
  const theme = resolveThemePreference(
    parseThemeCookie(cookieStore.get('enterprise-theme')?.value),
    defaultThemePreference,
  );
  const fontClassName = isRtlLocale(locale)
    ? vazirmatn.variable
    : `${inter.variable} ${playfair.variable}`;

  return (
    <html lang={locale} dir={dir} data-app="landing" data-theme={theme} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <OrganizationJsonLd locale={locale} />
        <WebSiteJsonLd locale={locale} />
      </head>
      <body className={fontClassName}>
        <AppProviders
          locale={locale}
          initialTheme={theme}
          routeTransitionMessage={t('routeTransition.message')}
        >
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:start-md focus:top-md focus:z-toast focus:rounded-md focus:bg-background focus:px-md focus:py-sm"
          >
            {t('common.skipToContent')}
          </a>
          <SiteShell locale={locale}>{children}</SiteShell>
        </AppProviders>
      </body>
    </html>
  );
}
