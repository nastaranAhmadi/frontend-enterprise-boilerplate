import { searchMenu } from '@/application/menu/search-menu';
import type { Locale } from '@/config/site';
import { getMenuFoodCardLabels } from '@/features/menu/get-menu-food-card-labels';
import type { MenuItem } from '@/repositories/menu/menu.types';

import { GallerySection } from './sections/GallerySection';
import { GuestExperiencesSection } from './sections/GuestExperiencesSection';
import { HeroSection } from './sections/HeroSection';
import { PhilosophySection } from './sections/PhilosophySection';
import { SeasonalSection } from './sections/SeasonalSection';
import { VisitUsSection } from './sections/VisitUsSection';

type LandingPageProps = {
  locale: Locale;
};

const HOME_FEATURED_COUNT = 6;

const pickHomeMenuItems = (items: MenuItem[]): MenuItem[] => {
  const seasonalOrSpecial = items.filter(
    (item) => item.category === 'seasonal' || item.labels.includes('todaysSpecial'),
  );

  if (seasonalOrSpecial.length >= 3) {
    return seasonalOrSpecial.slice(0, HOME_FEATURED_COUNT);
  }

  const seen = new Set(seasonalOrSpecial.map((item) => item.id));
  const fill = items.filter((item) => !seen.has(item.id));
  return [...seasonalOrSpecial, ...fill].slice(0, HOME_FEATURED_COUNT);
};

export const LandingPage = async ({ locale }: LandingPageProps) => {
  const catalog = await searchMenu(locale, {
    q: '',
    category: 'all',
    page: 1,
    pageSize: 48,
  });
  const featuredItems = pickHomeMenuItems(catalog.items);
  const cardLabels = getMenuFoodCardLabels(locale);

  return (
    <main id="main-content">
      <HeroSection locale={locale} />
      <SeasonalSection locale={locale} items={featuredItems} cardLabels={cardLabels} />
      <PhilosophySection locale={locale} />
      <GuestExperiencesSection locale={locale} />
      <GallerySection locale={locale} />
      <VisitUsSection locale={locale} />
    </main>
  );
};
