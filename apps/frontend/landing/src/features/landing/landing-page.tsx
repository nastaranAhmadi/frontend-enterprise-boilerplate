import type { Locale } from '@/config/site';

import { CtaSection } from './sections/CtaSection';
import { FeaturesSection } from './sections/FeaturesSection';
import { HeroSection } from './sections/HeroSection';

type LandingPageProps = {
  locale: Locale;
};

export const LandingPage = ({ locale }: LandingPageProps) => (
  <main id="main-content">
    <HeroSection locale={locale} />
    <FeaturesSection locale={locale} />
    <CtaSection locale={locale} />
  </main>
);
