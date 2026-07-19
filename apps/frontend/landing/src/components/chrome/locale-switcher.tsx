'use client';

import { Dropdown, DropdownLink } from '@enterprise/ui';
import { Button } from '@enterprise/ui/button';
import { usePathname } from 'next/navigation';

import type { Locale } from '@/config/site';
import { locales } from '@/config/site';
import { swapLocaleInPath } from '@/lib/i18n/swap-locale-path';

type LocaleSwitcherProps = {
  currentLocale: Locale;
  labels: Record<Locale, string>;
};

const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  fa: '🇮🇷',
  de: '🇩🇪',
  ar: '🇸🇦',
};

export const LocaleSwitcher = ({ currentLocale, labels }: LocaleSwitcherProps) => {
  const pathname = usePathname();

  return (
    <Dropdown
      align="end"
      trigger={
        <Button
          type="button"
          variant="ghost"
          size="small"
          aria-label="Language"
          className="gap-xs px-sm text-white hover:bg-white/10"
        >
          <span aria-hidden="true" className="text-md leading-none">
            {localeFlags[currentLocale]}
          </span>
          <span className="hidden text-sm uppercase tracking-wide sm:inline">{currentLocale}</span>
        </Button>
      }
    >
      {locales.map((locale) => (
        <DropdownLink
          key={locale}
          href={swapLocaleInPath(pathname, locale)}
          hrefLang={locale}
          lang={locale}
          className={locale === currentLocale ? 'bg-muted font-medium' : undefined}
        >
          <span className="me-sm" aria-hidden="true">
            {localeFlags[locale]}
          </span>
          {labels[locale]}
        </DropdownLink>
      ))}
    </Dropdown>
  );
};
