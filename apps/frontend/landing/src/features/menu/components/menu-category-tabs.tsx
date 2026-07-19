'use client';

import { menuCategories, type MenuCategory } from '@/repositories/menu/menu.types';

type MenuCategoryTabsProps = {
  category: MenuCategory | 'all';
  categoryAll: string;
  categoryLabel: string;
  categories: Record<MenuCategory, string>;
  onCategoryChange: (value: MenuCategory | 'all') => void;
};

const tabClassName = (active: boolean) =>
  [
    'shrink-0 rounded-md border px-md py-sm text-sm font-medium whitespace-nowrap transition-colors duration-normal',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
    active
      ? 'border-primary bg-primary text-primary-foreground'
      : 'border-border bg-surface text-muted-foreground hover:border-foreground/30 hover:text-foreground',
  ].join(' ');

/** Category filter as a toggle group (not ARIA tabs — no tab panels / arrow keys). */
export const MenuCategoryTabs = ({
  category,
  categoryAll,
  categoryLabel,
  categories,
  onCategoryChange,
}: MenuCategoryTabsProps) => (
  <div className="w-full min-w-0">
    <div
      role="group"
      aria-label={categoryLabel}
      className="flex w-full gap-sm overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:thin]"
    >
      <button
        type="button"
        aria-pressed={category === 'all'}
        className={tabClassName(category === 'all')}
        onClick={() => {
          onCategoryChange('all');
        }}
      >
        {categoryAll}
      </button>
      {menuCategories.map((key) => (
        <button
          key={key}
          type="button"
          aria-pressed={category === key}
          className={tabClassName(category === key)}
          onClick={() => {
            onCategoryChange(key);
          }}
        >
          {categories[key]}
        </button>
      ))}
    </div>
  </div>
);
