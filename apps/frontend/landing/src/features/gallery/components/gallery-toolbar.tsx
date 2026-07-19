'use client';

import { Dropdown, DropdownItem, FormField } from '@enterprise/ui';
import { Button } from '@enterprise/ui/button';
import { Calendar, ListFilter } from 'lucide-react';

import {
  type GalleryCategory,
  type GalleryPeriod,
  galleryPeriods,
  type GallerySort,
  gallerySorts,
} from '@/repositories/gallery/gallery.types';

export type GalleryToolbarLabels = {
  searchLabel: string;
  searchPlaceholder: string;
  categoryLabel: string;
  categoryAll: string;
  categories: Record<GalleryCategory, string>;
  periodLabel: string;
  periods: Record<GalleryPeriod, string>;
  sortLabel: string;
  sorts: Record<GallerySort, string>;
};

type GalleryToolbarProps = {
  query: string;
  period: GalleryPeriod;
  sort: GallerySort;
  labels: GalleryToolbarLabels;
  onQueryChange: (value: string) => void;
  onPeriodChange: (value: GalleryPeriod) => void;
  onSortChange: (value: GallerySort) => void;
};

const iconTriggerClassName = (active: boolean) =>
  [
    'h-11 w-11 shrink-0 rounded-md px-0',
    active ? 'border-primary bg-primary/10 text-primary' : 'text-foreground',
  ].join(' ');

export const GalleryToolbar = ({
  query,
  period,
  sort,
  labels,
  onQueryChange,
  onPeriodChange,
  onSortChange,
}: GalleryToolbarProps) => {
  const periodActive = period !== 'any';
  const sortActive = sort !== 'newest';

  return (
    <div className="flex w-full min-w-0 flex-col gap-sm sm:flex-row sm:items-end">
      <div className="min-w-0 flex-1">
        <FormField
          type="search"
          label={labels.searchLabel}
          placeholder={labels.searchPlaceholder}
          value={query}
          onChange={(event) => {
            onQueryChange(event.target.value);
          }}
          autoComplete="off"
          className="w-full"
        />
      </div>

      <div className="flex shrink-0 justify-end gap-sm sm:pb-px">
        <Dropdown
          align="end"
          menuClassName="min-w-[12rem]"
          trigger={({ open }) => (
            <Button
              type="button"
              variant="outlined"
              size="small"
              aria-label={labels.periodLabel}
              aria-expanded={open}
              className={iconTriggerClassName(periodActive)}
            >
              <Calendar aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
            </Button>
          )}
        >
          {galleryPeriods.map((key) => (
            <DropdownItem
              key={key}
              className={period === key ? 'bg-muted font-medium' : undefined}
              onClick={() => {
                onPeriodChange(key);
              }}
            >
              {labels.periods[key]}
            </DropdownItem>
          ))}
        </Dropdown>

        <Dropdown
          align="end"
          menuClassName="min-w-[12rem]"
          trigger={({ open }) => (
            <Button
              type="button"
              variant="outlined"
              size="small"
              aria-label={labels.sortLabel}
              aria-expanded={open}
              className={iconTriggerClassName(sortActive)}
            >
              <ListFilter aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
            </Button>
          )}
        >
          {gallerySorts.map((key) => (
            <DropdownItem
              key={key}
              className={sort === key ? 'bg-muted font-medium' : undefined}
              onClick={() => {
                onSortChange(key);
              }}
            >
              {labels.sorts[key]}
            </DropdownItem>
          ))}
        </Dropdown>
      </div>
    </div>
  );
};
