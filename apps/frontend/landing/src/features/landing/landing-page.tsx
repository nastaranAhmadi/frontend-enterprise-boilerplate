import type { Locale } from '@/config/site';

import { GallerySection } from './sections/GallerySection';
import { GuestExperiencesSection } from './sections/GuestExperiencesSection';
import { HeroSection } from './sections/HeroSection';
import { PhilosophySection } from './sections/PhilosophySection';
import { SeasonalSection } from './sections/SeasonalSection';
import { VisitUsSection } from './sections/VisitUsSection';

type LandingPageProps = {
  locale: Locale;
};

export const LandingPage = ({ locale }: LandingPageProps) => (
  <main id="main-content">
    <HeroSection locale={locale} />
    <SeasonalSection locale={locale} />
    <PhilosophySection locale={locale} />
    <GuestExperiencesSection locale={locale} />
    <GallerySection locale={locale} />
    <VisitUsSection locale={locale} />
  </main>
);
