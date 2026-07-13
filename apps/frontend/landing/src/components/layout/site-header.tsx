import Link from 'next/link';

import { LocaleSwitcher } from '@/components/chrome/locale-switcher';
import { ThemeToggle } from '@/components/chrome/theme-toggle';
import type { NavigationItem } from '@/config/navigation';
import { buildLocalizedPath } from '@/config/routes';
import type { Locale } from '@/config/site';

import { MainNav } from './main-nav';
import { MobileNav } from './mobile-nav';

type SiteHeaderLabels = {
  siteName: string;
  navigation: Record<NavigationItem['key'], string>;
  locale: Record<Locale, string>;
  theme: {
    light: string;
    dark: string;
    switchToLight: string;
    switchToDark: string;
  };
  mobileMenu: string;
  mobileClose: string;
};

type SiteHeaderProps = {
  locale: Locale;
  items: NavigationItem[];
  labels: SiteHeaderLabels;
};

export const SiteHeader = ({ locale, items, labels }: SiteHeaderProps) => (
  <header className="relative border-b border-border bg-background">
    <div className="mx-auto flex max-w-6xl items-center justify-between gap-md px-md py-md">
      <Link
        href={buildLocalizedPath(locale, 'home')}
        className="text-lg font-medium text-foreground"
      >
        {labels.siteName}
      </Link>

      <MainNav items={items} labels={labels.navigation} />

      <div className="flex items-center gap-sm">
        <LocaleSwitcher currentLocale={locale} labels={labels.locale} />
        <ThemeToggle labels={labels.theme} />
        <MobileNav
          items={items}
          labels={labels.navigation}
          menuLabel={labels.mobileMenu}
          closeLabel={labels.mobileClose}
        />
      </div>
    </div>
  </header>
);
