'use client';

import { useMemo, useState } from 'react';

import type { Locale } from '@/config/site';
import { MenuAiChat } from '@/features/menu/components/menu-ai-chat';
import { MenuCategoryTabs } from '@/features/menu/components/menu-category-tabs';
import { MenuFoodCard, type MenuFoodCardLabels } from '@/features/menu/components/menu-food-card';
import { filterMenuItemsByCategory } from '@/features/menu/filter-menu-items';
import type { MenuCategory, MenuItem } from '@/repositories/menu/menu.types';

export type MenuExplorerLabels = MenuFoodCardLabels & {
  categoryLabel: string;
  categoryAll: string;
  categories: Record<MenuCategory, string>;
  empty: string;
  gridLabel: string;
  openAssistant: string;
  closeAssistant: string;
  assistantTitle: string;
  assistantSubtitle: string;
  assistantPlaceholder: string;
  assistantSend: string;
  assistantEmptyHint: string;
};

type MenuExplorerProps = {
  locale: Locale;
  items: MenuItem[];
  labels: MenuExplorerLabels;
};

export const MenuExplorer = ({ locale, items, labels }: MenuExplorerProps) => {
  const [category, setCategory] = useState<MenuCategory | 'all'>('all');
  const [favoritedIds, setFavoritedIds] = useState<Set<string>>(() => new Set());

  const filtered = useMemo(() => filterMenuItemsByCategory(items, category), [items, category]);

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

  const cardLabels: MenuFoodCardLabels = {
    labels: labels.labels,
    calories: labels.calories,
    protein: labels.protein,
    prepTime: labels.prepTime,
    spicy: labels.spicy,
    mild: labels.mild,
    favorite: labels.favorite,
    favorited: labels.favorited,
    compareComingSoon: labels.compareComingSoon,
    addToCart: labels.addToCart,
    added: labels.added,
    nutritionLabel: labels.nutritionLabel,
    ingredientsLabel: labels.ingredientsLabel,
  };

  return (
    <div className="flex w-full min-w-0 flex-col gap-lg">
      <MenuCategoryTabs
        category={category}
        categoryAll={labels.categoryAll}
        categoryLabel={labels.categoryLabel}
        categories={labels.categories}
        onCategoryChange={setCategory}
      />

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-border bg-surface px-md py-2xl text-center text-muted-foreground">
          {labels.empty}
        </p>
      ) : (
        <ul
          className="grid list-none grid-cols-1 gap-lg sm:grid-cols-2 sm:gap-xl lg:grid-cols-3 xl:grid-cols-4"
          aria-label={labels.gridLabel}
        >
          {filtered.map((item) => (
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
      )}

      <MenuAiChat
        labels={{
          openAssistant: labels.openAssistant,
          closeAssistant: labels.closeAssistant,
          title: labels.assistantTitle,
          subtitle: labels.assistantSubtitle,
          placeholder: labels.assistantPlaceholder,
          send: labels.assistantSend,
          emptyHint: labels.assistantEmptyHint,
        }}
      />
    </div>
  );
};
