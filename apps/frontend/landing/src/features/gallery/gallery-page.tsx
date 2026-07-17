import { ContentPage } from '@/components/layout/content-page';
import type { Locale } from '@/config/site';
import { createT } from '@/i18n/t';
import { createBreadcrumbs } from '@/lib/seo/breadcrumbs';

type GalleryPageProps = {
  locale: Locale;
};

export const GalleryPage = ({ locale }: GalleryPageProps) => {
  const t = createT(locale);
  const breadcrumbs = createBreadcrumbs(locale, [
    { label: t('navigation.home'), route: 'home' },
    { label: t('galleryPage.title'), route: 'gallery' },
  ]);

  return (
    <ContentPage
      title={t('galleryPage.title')}
      description={t('galleryPage.description')}
      breadcrumbs={breadcrumbs}
    >
      <p className="text-muted-foreground">{t('galleryPage.comingSoon')}</p>
    </ContentPage>
  );
};
