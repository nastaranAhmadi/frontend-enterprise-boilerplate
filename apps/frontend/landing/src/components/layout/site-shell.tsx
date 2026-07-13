import type { ReactNode } from 'react';

import { getNavigationItems } from '@/config/navigation';
import type { Locale } from '@/config/site';
import { getDictionary } from '@/i18n/get-dictionary';

import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';

type SiteShellProps = {
  locale: Locale;
  children: ReactNode;
};

export const SiteShell = ({ locale, children }: SiteShellProps) => {
  const dictionary = getDictionary(locale);
  const navigationItems = getNavigationItems(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader
        locale={locale}
        items={navigationItems}
        labels={{
          siteName: dictionary.common.siteName,
          navigation: dictionary.navigation,
          locale: dictionary.locale,
          theme: dictionary.theme,
          mobileMenu: dictionary.common.mobileMenu,
          mobileClose: dictionary.common.mobileClose,
        }}
      />
      {children}
      <SiteFooter
        locale={locale}
        labels={{
          copyright: dictionary.footer.copyright,
          terms: dictionary.footer.terms,
          contact: dictionary.footer.contact,
        }}
      />
    </div>
  );
};
