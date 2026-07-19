import { searchMenu } from '@/application/menu/search-menu';
import { BreadcrumbJsonLd } from '@/components/seo/breadcrumb-json-ld';
import type { Locale } from '@/config/site';
import { MenuExplorer } from '@/features/menu/components/menu-explorer';
import { getMenuFoodCardLabels } from '@/features/menu/get-menu-food-card-labels';
import { createT } from '@/i18n/t';
import { createBreadcrumbs } from '@/lib/seo/breadcrumbs';
import type { MenuCategory } from '@/repositories/menu/menu.types';

type MenuPageProps = {
  locale: Locale;
};

const getMenuExplorerLabels = (locale: Locale) => {
  const t = createT(locale);
  const cardLabels = getMenuFoodCardLabels(locale);

  const categories = {
    breakfast: t('menuPage.categories.breakfast'),
    snacks: t('menuPage.categories.snacks'),
    appetizers: t('menuPage.categories.appetizers'),
    mainCourse: t('menuPage.categories.mainCourse'),
    desserts: t('menuPage.categories.desserts'),
    drinks: t('menuPage.categories.drinks'),
    healthy: t('menuPage.categories.healthy'),
    kids: t('menuPage.categories.kids'),
    seasonal: t('menuPage.categories.seasonal'),
    specialDiet: t('menuPage.categories.specialDiet'),
  } satisfies Record<MenuCategory, string>;

  return {
    ...cardLabels,
    categoryLabel: t('menuPage.categoryLabel'),
    categoryAll: t('menuPage.categoryAll'),
    categories,
    empty: t('menuPage.empty'),
    gridLabel: t('menuPage.gridLabel'),
    openAssistant: t('menuPage.openAssistant'),
    closeAssistant: t('menuPage.closeAssistant'),
    assistantTitle: t('menuPage.assistantTitle'),
    assistantSubtitle: t('menuPage.assistantSubtitle'),
    assistantPlaceholder: t('menuPage.assistantPlaceholder'),
    assistantSend: t('menuPage.assistantSend'),
    assistantEmptyHint: t('menuPage.assistantEmptyHint'),
  };
};

export const MenuPage = async ({ locale }: MenuPageProps) => {
  const t = createT(locale);
  const breadcrumbs = createBreadcrumbs(locale, [
    { label: t('navigation.home'), route: 'home' },
    { label: t('menuPage.title'), route: 'menu' },
  ]);

  const catalog = await searchMenu(locale, {
    q: '',
    category: 'all',
    page: 1,
    pageSize: 48,
  });

  return (
    <main id="main-content" className="w-full overflow-x-clip bg-background text-foreground">
      <BreadcrumbJsonLd items={breadcrumbs} />

      <div className="mx-auto w-full max-w-[1280px] px-md py-xl sm:px-lg lg:px-xl lg:py-2xl">
        <header className="mb-xl max-w-2xl">
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-warning">
            {t('menuPage.kicker')}
          </p>
          <h1 className="mt-md font-[Georgia,'Times_New_Roman',serif] text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-foreground md:text-5xl">
            {t('menuPage.title')}
          </h1>
          <p className="mt-md text-lg text-muted-foreground">{t('menuPage.description')}</p>
        </header>

        <MenuExplorer
          locale={locale}
          items={catalog.items}
          labels={getMenuExplorerLabels(locale)}
        />
      </div>
    </main>
  );
};
