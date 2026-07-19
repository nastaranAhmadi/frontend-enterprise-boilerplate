import type { Locale } from '@/config/site';
import type { MenuFoodCardLabels } from '@/features/menu/components/menu-food-card';
import { createT } from '@/i18n/t';
import type { MenuLabel } from '@/repositories/menu/menu.types';

export const getMenuFoodCardLabels = (locale: Locale): MenuFoodCardLabels => {
  const t = createT(locale);

  const labels = {
    bestSeller: t('menuPage.labels.bestSeller'),
    chefChoice: t('menuPage.labels.chefChoice'),
    new: t('menuPage.labels.new'),
    limited: t('menuPage.labels.limited'),
    todaysSpecial: t('menuPage.labels.todaysSpecial'),
  } satisfies Record<MenuLabel, string>;

  return {
    labels,
    calories: t('menuPage.calories'),
    protein: t('menuPage.protein'),
    prepTime: t('menuPage.prepTime'),
    spicy: t('menuPage.spicy'),
    mild: t('menuPage.mild'),
    favorite: t('menuPage.favorite'),
    favorited: t('menuPage.favorited'),
    compareComingSoon: t('menuPage.compareComingSoon'),
    addToCart: t('menuPage.addToCart'),
    added: t('menuPage.added'),
    nutritionLabel: t('menuPage.nutritionLabel'),
    ingredientsLabel: t('menuPage.ingredientsLabel'),
  };
};
