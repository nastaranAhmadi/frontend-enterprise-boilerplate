'use client';

import { galleryCategories, type GalleryCategory } from '@/repositories/gallery/gallery.types';

type GalleryCategoryTabsProps = {
  category: GalleryCategory | 'all';
  categoryAll: string;
  categoryLabel: string;
  categories: Record<GalleryCategory, string>;
  onCategoryChange: (value: GalleryCategory | 'all') => void;
};

const tabClassName = (active: boolean) =>
  [
    'shrink-0 rounded-md border px-md py-sm text-sm font-medium transition-colors duration-normal',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
    active
      ? 'border-primary bg-primary text-primary-foreground'
      : 'border-border bg-surface text-muted-foreground hover:border-foreground/30 hover:text-foreground',
  ].join(' ');

/** Rectangular category tabs — sits above the explore grid, not pill chips. */
export const GalleryCategoryTabs = ({
  category,
  categoryAll,
  categoryLabel,
  categories,
  onCategoryChange,
}: GalleryCategoryTabsProps) => (
  <div className="min-w-0">
    <p className="sr-only">{categoryLabel}</p>
    <div
      role="tablist"
      aria-label={categoryLabel}
      className="-mx-md flex gap-sm overflow-x-auto px-md pb-xs [scrollbar-width:thin] sm:mx-0 sm:px-0"
    >
      <button
        type="button"
        role="tab"
        aria-selected={category === 'all'}
        className={tabClassName(category === 'all')}
        onClick={() => {
          onCategoryChange('all');
        }}
      >
        {categoryAll}
      </button>
      {galleryCategories.map((key) => (
        <button
          key={key}
          type="button"
          role="tab"
          aria-selected={category === key}
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
