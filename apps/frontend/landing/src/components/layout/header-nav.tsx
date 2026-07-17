'use client';

import { Dropdown, DropdownLink } from '@enterprise/ui';
import { Button } from '@enterprise/ui/button';
import Link from 'next/link';

import { ButtonLink } from '@/components/chrome/button-link';
import { buildLocalizedPath } from '@/config/routes';
import type { Locale } from '@/config/site';
import { createT } from '@/i18n/t';

import { BlogNavPanel } from './blog-nav-panel';
import { MenuNavPanel } from './menu-nav-panel';

type HeaderNavProps = {
  locale: Locale;
};

export const HeaderNav = ({ locale }: HeaderNavProps) => {
  const t = createT(locale);

  return (
    <nav aria-label="Main" className="hidden items-center gap-xs xl:flex">
      <Dropdown
        align="start"
        openOnHover
        size="large"
        menuClassName="flex max-h-[min(80vh,40rem)] min-w-[min(92vw,48rem)] w-[min(92vw,48rem)] flex-col overflow-hidden p-0"
        trigger={
          <Button type="button" variant="ghost" size="small" className="font-medium">
            {t('header.links.menu')}
          </Button>
        }
      >
        <MenuNavPanel locale={locale} />
      </Dropdown>

      <Dropdown
        align="start"
        openOnHover
        size="large"
        menuClassName="min-w-[min(92vw,32rem)] w-[min(92vw,32rem)] p-0"
        trigger={
          <Button type="button" variant="ghost" size="small" className="font-medium">
            {t('header.links.blog')}
          </Button>
        }
      >
        <BlogNavPanel locale={locale} />
      </Dropdown>

      <Link
        href={buildLocalizedPath(locale, 'contact')}
        className="rounded-md px-sm py-xs text-sm font-medium text-foreground transition-colors hover:bg-muted"
      >
        {t('header.links.contact')}
      </Link>
      <Link
        href={buildLocalizedPath(locale, 'faq')}
        className="rounded-md px-sm py-xs text-sm font-medium text-foreground transition-colors hover:bg-muted"
      >
        {t('header.links.faq')}
      </Link>
      <Link
        href={buildLocalizedPath(locale, 'gallery')}
        className="rounded-md px-sm py-xs text-sm font-medium text-foreground transition-colors hover:bg-muted"
      >
        {t('header.links.gallery')}
      </Link>

      <Dropdown
        align="start"
        openOnHover
        trigger={
          <Button type="button" variant="ghost" size="small" className="font-medium">
            {t('header.links.about')}
          </Button>
        }
      >
        <DropdownLink href={`${buildLocalizedPath(locale, 'about')}#philosophy`}>
          {t('header.about.philosophy')}
        </DropdownLink>
        <DropdownLink href={`${buildLocalizedPath(locale, 'about')}#chefs`}>
          {t('header.about.chefs')}
        </DropdownLink>
      </Dropdown>

      <div className="ms-sm flex items-center gap-sm border-s border-border ps-md">
        <ButtonLink
          href={buildLocalizedPath(locale, 'contact')}
          variant="ghost"
          className="px-md py-xs text-sm"
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
