import { BreadcrumbJsonLd } from '@/components/seo/breadcrumb-json-ld';
import type { Locale } from '@/config/site';
import {
  GalleryExplorer,
  type GalleryExplorerLabels,
} from '@/features/gallery/components/gallery-explorer';
import { createT } from '@/i18n/t';
import { createBreadcrumbs } from '@/lib/seo/breadcrumbs';
import type {
  GalleryCategory,
  GalleryPeriod,
  GallerySort,
} from '@/repositories/gallery/gallery.types';

type GalleryPageProps = {
  locale: Locale;
};

const getGalleryLabels = (locale: Locale): GalleryExplorerLabels => {
  const t = createT(locale);

  const categories = {
    drinks: t('galleryPage.categories.drinks'),
    mains: t('galleryPage.categories.mains'),
    desserts: t('galleryPage.categories.desserts'),
    snacks: t('galleryPage.categories.snacks'),
    kitchen: t('galleryPage.categories.kitchen'),
  } satisfies Record<GalleryCategory, string>;

  const periods = {
    any: t('galleryPage.periods.any'),
    week: t('galleryPage.periods.week'),
    month: t('galleryPage.periods.month'),
    year: t('galleryPage.periods.year'),
  } satisfies Record<GalleryPeriod, string>;

  const sorts = {
    newest: t('galleryPage.sorts.newest'),
    mostOrdered: t('galleryPage.sorts.mostOrdered'),
    trending: t('galleryPage.sorts.trending'),
    name: t('galleryPage.sorts.name'),
  } satisfies Record<GallerySort, string>;

  return {
    searchLabel: t('galleryPage.searchLabel'),
    searchPlaceholder: t('galleryPage.searchPlaceholder'),
    categoryLabel: t('galleryPage.categoryLabel'),
    categoryAll: t('galleryPage.categoryAll'),
    categories,
    periodLabel: t('galleryPage.periodLabel'),
    periods,
    sortLabel: t('galleryPage.sortLabel'),
    sorts,
    resultCount: t('galleryPage.resultCount'),
    empty: t('galleryPage.empty'),
    error: t('galleryPage.error'),
    loadingMore: t('galleryPage.loadingMore'),
    end: t('galleryPage.end'),
    follow: t('galleryPage.follow'),
    following: t('galleryPage.following'),
    orders: t('galleryPage.orders'),
    gridLabel: t('galleryPage.gridLabel'),
  };
};

export const GalleryPage = ({ locale }: GalleryPageProps) => {
  const t = createT(locale);
  const breadcrumbs = createBreadcrumbs(locale, [
    { label: t('navigation.home'), route: 'home' },
    { label: t('galleryPage.title'), route: 'gallery' },
  ]);

  return (
    <main id="main-content" className="w-full overflow-x-clip bg-background text-foreground">
      <BreadcrumbJsonLd items={breadcrumbs} />

      <div className="mx-auto w-full max-w-[1152px] px-md py-xl sm:px-lg lg:px-xl lg:py-2xl">
        <header className="mb-xl max-w-2xl">
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-warning">
            {t('galleryPage.kicker')}
          </p>
          <h1 className="mt-md font-[Georgia,'Times_New_Roman',serif] text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-foreground md:text-5xl">
            {t('galleryPage.title')}
          </h1>
          <p className="mt-md text-lg text-muted-foreground">{t('galleryPage.description')}</p>
        </header>

        <GalleryExplorer locale={locale} labels={getGalleryLabels(locale)} />
      </div>
    </main>
  );
};
