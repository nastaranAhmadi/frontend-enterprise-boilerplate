'use client';

import { BottomSheet } from '@enterprise/ui';
import { Button } from '@enterprise/ui/button';
import Link from 'next/link';
import { useState } from 'react';

import { ButtonLink } from '@/components/chrome/button-link';
import { ThemeAppearanceSwitch } from '@/components/chrome/theme-toggle';
import { buildLocalizedPath } from '@/config/routes';
import type { Locale } from '@/config/site';
import { createT } from '@/i18n/t';

type MobileNavProps = {
  locale: Locale;
};

const BurgerIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-5 w-5 fill-none stroke-current stroke-[1.75]"
  >
    <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
  </svg>
);

/**
 * Phase 1: flat destination links only.
 * Desktop mega-menu labels (header.menu / header.blog panels) are intentionally unused here.
 */
export const MobileNav = ({ locale }: MobileNavProps) => {
  const t = createT(locale);
  const [open, setOpen] = useState(false);

  const close = () => {
    setOpen(false);
  };

  const links = [
    { href: buildLocalizedPath(locale, 'menu'), label: t('header.links.menu') },
    { href: buildLocalizedPath(locale, 'blog'), label: t('header.links.blog') },
    { href: buildLocalizedPath(locale, 'contact'), label: t('header.links.contact') },
    { href: buildLocalizedPath(locale, 'faq'), label: t('header.links.faq') },
    { href: buildLocalizedPath(locale, 'gallery'), label: t('header.links.gallery') },
    { href: buildLocalizedPath(locale, 'about'), label: t('header.links.about') },
  ];

  return (
    <div className="xl:hidden">
      <Button
        type="button"
        variant="ghost"
        size="small"
        aria-expanded={open}
        aria-controls="mobile-navigation-sheet"
        aria-haspopup="dialog"
        aria-label={t('common.mobileMenu')}
        onClick={() => {
          setOpen(true);
        }}
      >
        <BurgerIcon />
      </Button>

      <BottomSheet
        open={open}
        onClose={close}
        title={t('common.mobileMenu')}
        size="auto"
        className="w-full max-w-none"
        footer={
          <div className="flex w-full flex-col gap-md">
            <ThemeAppearanceSwitch
              labels={{
                light: t('theme.light'),
                dark: t('theme.dark'),
                switchToLight: t('theme.switchToLight'),
                switchToDark: t('theme.switchToDark'),
              }}
            />
            <div className="flex w-full flex-col gap-sm">
              <ButtonLink
                href={buildLocalizedPath(locale, 'contact')}
                variant="filled"
                className="w-full min-h-11 justify-center whitespace-nowrap px-lg py-md text-md font-medium"
                onClick={close}
              >
                {t('header.reserve')}
              </ButtonLink>
              <ButtonLink
                href={buildLocalizedPath(locale, 'contact')}
                variant="outlined"
                className="w-full min-h-11 justify-center whitespace-nowrap px-lg py-md text-md font-medium"
                onClick={close}
              >
                {t('header.contact')}
              </ButtonLink>
            </div>
          </div>
        }
      >
        <nav id="mobile-navigation-sheet" aria-label="Main" className="flex flex-col gap-xs">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-sm py-md text-lg font-medium text-foreground transition-colors hover:bg-muted"
              onClick={close}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </BottomSheet>
    </div>
  );
};
