'use client';

import { Accordion } from '@enterprise/ui';
import Image from 'next/image';
import Link from 'next/link';

import { ButtonLink } from '@/components/chrome/button-link';
import { menuPreviewImages, type MenuThumbItem } from '@/config/menu-preview-data';
import { buildLocalizedPath } from '@/config/routes';
import type { Locale } from '@/config/site';
import { createT } from '@/i18n/t';

type MenuNavPanelProps = {
  locale: Locale;
  onNavigate?: () => void;
};

const ThumbRow = ({
  items,
  itemPath,
  locale,
  onNavigate,
}: {
  items: readonly MenuThumbItem[];
  itemPath: string;
  locale: Locale;
  onNavigate?: () => void;
}) => {
  const t = createT(locale);

  return (
    <ul className="grid grid-cols-2 gap-sm lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.key}>
          <Link
            href={buildLocalizedPath(locale, 'menu')}
            onClick={onNavigate}
            className="group flex items-center gap-sm rounded-md p-xs transition-colors hover:bg-muted"
          >
            <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
              <Image
                src={item.image}
                alt=""
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="48px"
              />
            </span>
            <span className="text-sm text-foreground">{t(`${itemPath}.${item.key}`)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export const MenuNavPanel = ({ locale, onNavigate }: MenuNavPanelProps) => {
  const t = createT(locale);

  return (
    <div className="flex h-full min-h-0 max-h-[min(70vh,36rem)] w-full flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-md pb-lg">
        <Accordion.Group>
          <Accordion defaultExpanded>
            <Accordion.Summary>{t('header.menu.drinks.label')}</Accordion.Summary>
            <Accordion.Details>
              <div className="flex flex-col gap-md">
                <div>
                  <p className="mb-xs text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                    {t('header.menu.drinks.cold')}
                  </p>
                  <ThumbRow
                    items={menuPreviewImages.drinks.cold}
                    itemPath="header.menu.drinks.items"
                    locale={locale}
                    onNavigate={onNavigate}
                  />
                </div>
                <div>
                  <p className="mb-xs text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                    {t('header.menu.drinks.hot')}
                  </p>
                  <ThumbRow
                    items={menuPreviewImages.drinks.hot}
                    itemPath="header.menu.drinks.items"
                    locale={locale}
                    onNavigate={onNavigate}
                  />
                </div>
              </div>
            </Accordion.Details>
          </Accordion>
        </Accordion.Group>

        <div className="mt-md flex flex-col gap-sm border-t border-border pt-md">
          <p className="text-sm font-medium text-foreground">{t('header.menu.snacks.label')}</p>
          <ThumbRow
            items={menuPreviewImages.snacks}
            itemPath="header.menu.snacks.items"
            locale={locale}
            onNavigate={onNavigate}
          />
        </div>

        <div className="mt-md flex flex-col gap-sm">
          <p className="text-sm font-medium text-foreground">{t('header.menu.appetizer.label')}</p>
          <ThumbRow
            items={menuPreviewImages.appetizer}
            itemPath="header.menu.appetizer.items"
            locale={locale}
            onNavigate={onNavigate}
          />
        </div>

        <div className="mt-md">
          <Accordion.Group>
            <Accordion>
              <Accordion.Summary>{t('header.menu.mainMeal.label')}</Accordion.Summary>
              <Accordion.Details>
                <div className="flex flex-col gap-md">
                  {(
                    [
                      ['breakfast', menuPreviewImages.mainMeal.breakfast],
                      ['salad', menuPreviewImages.mainMeal.salad],
                      ['pasta', menuPreviewImages.mainMeal.pasta],
                      ['pizza', menuPreviewImages.mainMeal.pizza],
                    ] as const
                  ).map(([key, items]) => (
                    <div key={key}>
                      <p className="mb-xs text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                        {t(`header.menu.mainMeal.${key}`)}
                      </p>
                      <ThumbRow
                        items={items}
                        itemPath="header.menu.mainMeal.items"
                        locale={locale}
                        onNavigate={onNavigate}
                      />
                    </div>
                  ))}
                </div>
              </Accordion.Details>
            </Accordion>

            <Accordion>
              <Accordion.Summary>{t('header.menu.desserts.label')}</Accordion.Summary>
              <Accordion.Details>
                <div className="flex flex-col gap-md">
                  <div>
                    <p className="mb-xs text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                      {t('header.menu.desserts.frozen')}
                    </p>
                    <ThumbRow
                      items={menuPreviewImages.desserts.frozen}
                      itemPath="header.menu.desserts.items"
                      locale={locale}
                      onNavigate={onNavigate}
                    />
                  </div>
                  <div>
                    <p className="mb-xs text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                      {t('header.menu.desserts.baked')}
                    </p>
                    <ThumbRow
                      items={menuPreviewImages.desserts.baked}
                      itemPath="header.menu.desserts.items"
                      locale={locale}
                      onNavigate={onNavigate}
                    />
                  </div>
                </div>
              </Accordion.Details>
            </Accordion>
          </Accordion.Group>
        </div>
      </div>

      <div className="relative shrink-0 border-t border-border bg-surface-elevated px-md py-md">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-8 h-8 bg-gradient-to-t from-surface-elevated to-transparent"
        />
        <ButtonLink
          href={buildLocalizedPath(locale, 'menu')}
          variant="filled"
          className="w-full justify-center shadow-sm"
          onClick={onNavigate}
        >
          {t('header.openMenuPage')}
        </ButtonLink>
      </div>
    </div>
  );
};
