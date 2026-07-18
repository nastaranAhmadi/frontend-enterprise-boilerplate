import Link from 'next/link';

import { LocaleSwitcher } from '@/components/chrome/locale-switcher';
import { ThemeToggle } from '@/components/chrome/theme-toggle';
import { buildLocalizedPath } from '@/config/routes';
import type { Locale } from '@/config/site';
import { createT } from '@/i18n/t';

import { HeaderNav } from './header-nav';
import { MobileNav } from './mobile-nav';

type SiteHeaderProps = {
  locale: Locale;
};

export const SiteHeader = ({ locale }: SiteHeaderProps) => {
  const t = createT(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-md px-md py-md">
        <Link
          href={buildLocalizedPath(locale, 'home')}
          className="text-xl tracking-[0.18em] text-foreground"
        >
          {t('common.siteName')}
        </Link>

        <HeaderNav locale={locale} />

        <div className="flex items-center gap-xs sm:gap-sm">
          <LocaleSwitcher
            currentLocale={locale}
            labels={{
              en: t('locale.en'),
              fa: t('locale.fa'),
              de: t('locale.de'),
              ar: t('locale.ar'),
            }}
          />
          <ThemeToggle
            labels={{
              switchToLight: t('theme.switchToLight'),
              switchToDark: t('theme.switchToDark'),
            }}
            className="hidden xl:inline-flex"
          />
          <MobileNav locale={locale} />
        </div>
      </div>
    </header>
  );
};
