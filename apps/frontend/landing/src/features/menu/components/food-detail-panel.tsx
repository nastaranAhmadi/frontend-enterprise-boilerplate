'use client';

import { Button, Chip } from '@enterprise/ui';
import { useState } from 'react';

import type { Locale } from '@/config/site';
import type { MenuLabel } from '@/repositories/menu/menu.types';
import type { MenuDetail } from '@/repositories/menu/menu-detail.types';

type FoodDetailPanelLabels = {
  labels: Record<MenuLabel, string>;
  calories: string;
  protein: string;
  prepTime: string;
  showMore: string;
  showLess: string;
  origin: string;
  taste: string;
  story: string;
  ingredientsLabel: string;
  nutritionLabel: string;
};

type FoodDetailPanelProps = {
  item: MenuDetail;
  locale: Locale;
  labels: FoodDetailPanelLabels;
};

export const FoodDetailPanel = ({ item, locale, labels }: FoodDetailPanelProps) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(
    () => new Set(item.ingredients),
  );

  const priceLabel = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: item.currency,
    maximumFractionDigits: 0,
  }).format(item.price);

  const ratingLabel = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(item.rating);

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients((current) => {
      const next = new Set(current);
      if (next.has(ingredient)) {
        next.delete(ingredient);
      } else {
        next.add(ingredient);
      }
      return next;
    });
  };

  return (
    <section className="flex h-full min-w-0 flex-col rounded-2xl border border-border bg-surface p-md sm:p-lg">
      <div className="flex flex-wrap items-start justify-between gap-sm">
        <div className="min-w-0">
          <h1 className="font-[Georgia,'Times_New_Roman',serif] text-3xl font-medium tracking-[-0.03em] text-foreground md:text-4xl">
            {item.name}
          </h1>
          <p className="mt-xs text-sm text-muted-foreground">
            {item.code} · ★ {ratingLabel}
          </p>
        </div>
        <p className="text-2xl font-semibold tabular-nums text-foreground">{priceLabel}</p>
      </div>

      {item.labels.length > 0 ? (
        <ul className="mt-md flex flex-wrap gap-xs">
          {item.labels.map((key) => (
            <li key={key}>
              <Chip size="small">{labels.labels[key]}</Chip>
            </li>
          ))}
        </ul>
      ) : null}

      <p className="mt-md text-base italic text-muted-foreground">{item.taste}</p>

      <div className="mt-md">
        <div
          className={[
            'overflow-hidden transition-[max-height] duration-500 ease-in-out motion-reduce:transition-none',
            expanded ? 'max-h-[48rem]' : 'max-h-[4.5rem]',
          ].join(' ')}
        >
          <p className="text-sm leading-relaxed text-foreground">
            {item.description} <span className="text-muted-foreground">{item.story}</span>
          </p>
          <dl
            className={[
              'mt-md grid gap-sm text-sm transition-opacity duration-500 ease-in-out motion-reduce:transition-none',
              expanded ? 'opacity-100 delay-100' : 'opacity-0',
            ].join(' ')}
            aria-hidden={!expanded}
          >
            <div>
              <dt className="font-medium text-foreground">{labels.origin}</dt>
              <dd className="text-muted-foreground">{item.origin}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">{labels.taste}</dt>
              <dd className="text-muted-foreground">{item.taste}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">{labels.story}</dt>
              <dd className="text-muted-foreground">{item.story}</dd>
            </div>
          </dl>
        </div>
        <Button
          type="button"
          variant="link"
          size="small"
          className="mt-xs h-auto px-0 text-primary"
          aria-expanded={expanded}
          onClick={() => {
            setExpanded((value) => !value);
          }}
        >
          {expanded ? labels.showLess : labels.showMore}
        </Button>
      </div>

      <ul className="mt-lg flex flex-wrap gap-xs" aria-label={labels.nutritionLabel}>
        <li>
          <Chip size="small">{labels.calories.replace('{count}', String(item.calories))}</Chip>
        </li>
        <li>
          <Chip size="small">{labels.protein.replace('{count}', String(item.protein))}</Chip>
        </li>
        <li>
          <Chip size="small">{labels.prepTime.replace('{minutes}', String(item.prepMinutes))}</Chip>
        </li>
      </ul>

      <div className="mt-md">
        <p className="mb-xs text-sm font-medium text-foreground">{labels.ingredientsLabel}</p>
        <ul className="flex flex-wrap gap-xs" role="group" aria-label={labels.ingredientsLabel}>
          {item.ingredients.map((ingredient) => {
            const selected = selectedIngredients.has(ingredient);

            return (
              <li key={ingredient}>
                <Chip
                  size="small"
                  color={selected ? 'primary' : 'neutral'}
                  variant={selected ? 'filled' : 'outlined'}
                  clickable
                  aria-pressed={selected}
                  className={['min-w-[5.5rem] justify-center', selected ? '' : 'opacity-55']
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => {
                    toggleIngredient(ingredient);
                  }}
                >
                  {ingredient}
                </Chip>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
