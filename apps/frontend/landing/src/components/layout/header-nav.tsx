'use client';

import { Dropdown } from '@enterprise/ui';
import { Button } from '@enterprise/ui/button';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

import { ButtonLink } from '@/components/chrome/button-link';
import { buildLocalizedPath } from '@/config/routes';
import type { Locale } from '@/config/site';
import { createT } from '@/i18n/t';

import { MenuNavPanel } from './menu-nav-panel';

type HeaderNavProps = {
  locale: Locale;
};

type NavDropdownTriggerProps = {
  open: boolean;
};

export const HeaderNav = ({ locale }: HeaderNavProps) => {
  const t = createT(locale);

  const linkClassName =
    'rounded-md px-sm py-xs text-sm font-medium text-white transition-colors hover:bg-white/10';

  return (
    <nav aria-label="Main" className="hidden items-center gap-xs xl:flex">
      <Dropdown
        align="start"
        openOnHover
        size="large"
        menuClassName="flex max-h-[min(80vh,40rem)] min-w-[min(92vw,48rem)] w-[min(92vw,48rem)] flex-col overflow-hidden p-0"
        trigger={({ open }: NavDropdownTriggerProps) => (
          <Button
            type="button"
            variant="ghost"
            size="small"
            className="gap-xs font-medium text-white hover:bg-white/10"
          >
            {t('header.links.menu')}
            <ChevronDown
              aria-hidden="true"
              className={[
                'h-3.5 w-3.5 shrink-0 text-white/70 transition-transform duration-normal',
                open ? 'rotate-180' : 'rotate-0',
              ].join(' ')}
              strokeWidth={1.5}
            />
          </Button>
        )}
      >
        <MenuNavPanel locale={locale} />
      </Dropdown>

      <Link href={buildLocalizedPath(locale, 'blog')} className={linkClassName}>
        {t('header.links.blog')}
      </Link>

      <Link href={buildLocalizedPath(locale, 'contact')} className={linkClassName}>
        {t('header.links.contact')}
      </Link>
      <Link href={buildLocalizedPath(locale, 'faq')} className={linkClassName}>
        {t('header.links.faq')}
      </Link>
      <Link href={buildLocalizedPath(locale, 'gallery')} className={linkClassName}>
        {t('header.links.gallery')}
      </Link>

      <Link href={buildLocalizedPath(locale, 'about')} className={linkClassName}>
        {t('header.links.about')}
      </Link>

      <div className="ms-sm flex items-center gap-sm border-s border-white/20 ps-md">
        <ButtonLink
          href={buildLocalizedPath(locale, 'contact')}
          variant="ghost"
          className="px-md py-xs text-sm text-white hover:bg-white/10"
        >
          {t('header.contact')}
        </ButtonLink>
        <ButtonLink
          href={buildLocalizedPath(locale, 'contact')}
          variant="filled"
          className="px-md py-xs text-sm"
        >
          {t('header.reserve')}
        </ButtonLink>
      </div>
    </nav>
  );
};
