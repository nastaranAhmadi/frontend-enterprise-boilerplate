import { ContentPage } from '@/components/layout/content-page';
import type { Locale } from '@/config/site';
import { createT } from '@/i18n/t';
import { createBreadcrumbs } from '@/lib/seo/breadcrumbs';

type MenuPageProps = {
  locale: Locale;
};

export const MenuPage = ({ locale }: MenuPageProps) => {
  const t = createT(locale);
  const breadcrumbs = createBreadcrumbs(locale, [
    { label: t('navigation.home'), route: 'home' },
    { label: t('menuPage.title'), route: 'menu' },
  ]);

  return (
    <ContentPage
      title={t('menuPage.title')}
      description={t('menuPage.description')}
      breadcrumbs={breadcrumbs}
    >
      <p className="text-muted-foreground">{t('menuPage.comingSoon')}</p>
    </ContentPage>
  );
};
