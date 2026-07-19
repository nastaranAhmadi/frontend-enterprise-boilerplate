import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getMenuItemDetail } from '@/application/menu/get-menu-item-detail';
import { BreadcrumbJsonLd } from '@/components/seo/breadcrumb-json-ld';
import { buildLocalizedPath } from '@/config/routes';
import type { Locale } from '@/config/site';
import { FoodAssemble } from '@/features/menu/components/food-assemble';
import { FoodCommentsPanel } from '@/features/menu/components/food-comments-panel';
import { FoodDetailPanel } from '@/features/menu/components/food-detail-panel';
import { FoodOrderStepper } from '@/features/menu/components/food-order-stepper';
import { getMenuFoodCardLabels } from '@/features/menu/get-menu-food-card-labels';
import { getMenuOrderLabels } from '@/features/menu/get-menu-order-labels';
import { createT } from '@/i18n/t';
import { buildLocalizedMenuItemPath } from '@/lib/seo/alternates';
import { createBreadcrumbs } from '@/lib/seo/breadcrumbs';

type MenuDetailPageProps = {
  locale: Locale;
  slug: string;
};

export const MenuDetailPage = async ({ locale, slug }: MenuDetailPageProps) => {
  const item = await getMenuItemDetail(locale, slug);

  if (!item) {
    notFound();
  }

  const t = createT(locale);
  const cardLabels = getMenuFoodCardLabels(locale);
  const breadcrumbs = createBreadcrumbs(locale, [
    { label: t('navigation.home'), route: 'home' },
    { label: t('menuPage.title'), route: 'menu' },
    { label: item.name, path: buildLocalizedMenuItemPath(locale, slug) },
  ]);

  return (
    <main id="main-content" className="w-full overflow-x-clip bg-background text-foreground">
      <BreadcrumbJsonLd items={breadcrumbs} />

      <div className="mx-auto w-full max-w-[1152px] px-md py-xl sm:px-lg lg:px-xl lg:py-2xl">
        <p className="mb-md">
          <Link
            href={buildLocalizedPath(locale, 'menu')}
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            {t('menuDetail.backToMenu')}
          </Link>
        </p>

        <div className="grid grid-cols-1 gap-lg lg:grid-cols-2 lg:gap-xl">
          <FoodAssemble
            imageSrc={item.imageUrl}
            imageAlt={item.name}
            videoSrc={item.assembleVideoSrc}
          />

          <FoodDetailPanel
            item={item}
            locale={locale}
            labels={{
              labels: cardLabels.labels,
              calories: cardLabels.calories,
              protein: cardLabels.protein,
              prepTime: cardLabels.prepTime,
              showMore: t('menuDetail.showMore'),
              showLess: t('menuDetail.showLess'),
              origin: t('menuDetail.origin'),
              taste: t('menuDetail.taste'),
              story: t('menuDetail.story'),
              ingredientsLabel: cardLabels.ingredientsLabel,
              nutritionLabel: cardLabels.nutritionLabel,
            }}
          />

          <FoodOrderStepper dishName={item.name} labels={getMenuOrderLabels(locale)} />

          <FoodCommentsPanel
            reviews={item.reviews}
            labels={{
              title: t('menuDetail.comments.title'),
              showMore: t('menuDetail.showMore'),
              showLess: t('menuDetail.showLess'),
              empty: t('menuDetail.comments.empty'),
            }}
          />
        </div>
      </div>
    </main>
  );
};
