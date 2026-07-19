'use client';

import { useState } from 'react';

import type { Locale } from '@/config/site';
import { useRevealOnScroll } from '@/features/landing/hooks/use-reveal-on-scroll';
import { MenuFoodCard, type MenuFoodCardLabels } from '@/features/menu/components/menu-food-card';
import { createT } from '@/i18n/t';
import type { MenuItem } from '@/repositories/menu/menu.types';

type SeasonalSectionProps = {
  locale: Locale;
  items: MenuItem[];
  cardLabels: MenuFoodCardLabels;
};

export const SeasonalSection = ({ locale, items, cardLabels }: SeasonalSectionProps) => {
  const t = createT(locale);
  const { ref, visible } = useRevealOnScroll();
  const [favoritedIds, setFavoritedIds] = useState<Set<string>>(() => new Set());

  const toggleFavorite = (id: string) => {
    setFavoritedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section id="seasonal" className="scroll-mt-24 bg-surface px-md py-2xl md:py-3xl">
      <div className="mx-auto max-w-[1280px]">
        <div
          ref={ref}
          className={`my-xl max-w-2xl transition-all duration-700 motion-reduce:transition-none ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <h2 className="text-3xl text-foreground md:text-4xl">{t('home.seasonal.title')}</h2>
          <p className="mt-sm text-muted-foreground">{t('home.seasonal.subtitle')}</p>
        </div>

        <ul className="grid list-none grid-cols-1 gap-lg sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <li key={item.id} className="min-w-0">
              <MenuFoodCard
                item={item}
                locale={locale}
                labels={cardLabels}
                favorited={favoritedIds.has(item.id)}
                onFavoriteToggle={toggleFavorite}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
