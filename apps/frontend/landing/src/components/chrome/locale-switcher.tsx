'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { Locale } from '@/config/site';
import { getAlternateLocales, swapLocaleInPath } from '@/lib/i18n/swap-locale-path';

type LocaleSwitcherProps = {
  currentLocale: Locale;
  labels: Record<Locale, string>;
};

export const LocaleSwitcher = ({ currentLocale, labels }: LocaleSwitcherProps) => {
  const pathname = usePathname();
  const alternateLocales = getAlternateLocales(currentLocale);

  return (
    <nav aria-label="Language">
      <ul className="flex items-center gap-xs">
        {alternateLocales.map((locale) => (
          <li key={locale}>
            <Link
              href={swapLocaleInPath(pathname, locale)}
              className="rounded-sm px-sm py-xs text-sm text-muted-foreground transition-colors hover:text-foreground"
              hrefLang={locale}
              lang={locale}
            >
              {labels[locale]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
