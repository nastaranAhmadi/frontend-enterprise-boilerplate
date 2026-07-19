'use client';

import { Tooltip } from '@enterprise/ui';
import { Button } from '@enterprise/ui/button';
import {
  ArrowLeftRight,
  Award,
  Clock,
  Drumstick,
  Flame,
  Heart,
  type LucideIcon,
  ShoppingCart,
  Sparkles,
  Star,
  Timer,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { type MouseEvent, useEffect, useRef, useState } from 'react';

import type { Locale } from '@/config/site';
import type { MenuItem, MenuLabel } from '@/repositories/menu/menu.types';

export type MenuFoodCardLabels = {
  labels: Record<MenuLabel, string>;
  calories: string;
  protein: string;
  prepTime: string;
  spicy: string;
  mild: string;
  favorite: string;
  favorited: string;
  compareComingSoon: string;
  addToCart: string;
  added: string;
  nutritionLabel: string;
  ingredientsLabel: string;
};

type MenuFoodCardProps = {
  item: MenuItem;
  locale: Locale;
  labels: MenuFoodCardLabels;
  favorited: boolean;
  onFavoriteToggle: (id: string) => void;
};

const LABEL_ICONS: Record<MenuLabel, LucideIcon> = {
  bestSeller: Star,
  chefChoice: Award,
  new: Sparkles,
  limited: Timer,
  todaysSpecial: Flame,
};

const LABEL_CHIP_CLASS =
  'inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-1 text-[0.7rem] font-medium text-foreground';

/** Temporary shared detail slug until per-item routes exist. */
const DETAIL_SLUG = '1';

/**
 * Sample-inspired card: circular dish tucked into the top-end corner
 * (clipped by the card edge), open white space for tags + copy.
 */
export const MenuFoodCard = ({
  item,
  locale,
  labels,
  favorited,
  onFavoriteToggle,
}: MenuFoodCardProps) => {
  const [justAdded, setJustAdded] = useState(false);
  const addedTimeoutRef = useRef<number | null>(null);
  const detailHref = `/${locale}/menu/${DETAIL_SLUG}` as const;

  useEffect(
    () => () => {
      if (addedTimeoutRef.current !== null) {
        window.clearTimeout(addedTimeoutRef.current);
      }
    },
    [],
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

  const spicyLabel =
    item.spicyLevel === 0 ? labels.mild : labels.spicy.replace('{level}', String(item.spicyLevel));

  const favoriteLabel = favorited ? labels.favorited : labels.favorite;
  const ingredientLine = item.ingredients.slice(0, 4).join(' · ');

  const handleAdd = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (addedTimeoutRef.current !== null) {
      window.clearTimeout(addedTimeoutRef.current);
    }
    setJustAdded(true);
    addedTimeoutRef.current = window.setTimeout(() => {
      setJustAdded(false);
      addedTimeoutRef.current = null;
    }, 1600);
  };

  return (
    <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[1.75rem] border border-border-subtle bg-surface-elevated shadow-[0_12px_40px_-24px_rgba(28,36,32,0.35)] transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_22px_50px_-28px_rgba(28,36,32,0.45)] motion-reduce:transform-none animate-fade-in-up">
      <Link
        href={detailHref}
        className="absolute inset-0 z-[1] rounded-[1.75rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label={item.name}
      />

      <div
        className="pointer-events-none absolute -end-10 -top-10 z-0 h-[13.5rem] w-[13.5rem] overflow-hidden rounded-full bg-muted shadow-[0_8px_28px_-12px_rgba(28,36,32,0.45)] sm:h-[15rem] sm:w-[15rem]"
        aria-hidden="true"
      >
        <div className="absolute inset-[-14%] transition-transform duration-700 ease-out group-hover:scale-110 motion-reduce:transform-none">
          <Image src={item.imageUrl} alt="" fill className="object-cover" sizes="240px" />
        </div>
      </div>

      <div className="pointer-events-none relative z-10 flex min-h-0 flex-1 flex-col p-5">
        <div className="flex min-h-[8.5rem] flex-col justify-between sm:min-h-[9.5rem]">
          <div className="pointer-events-auto relative z-[2] flex max-w-[52%] items-start justify-start gap-1">
            <Tooltip title={favoriteLabel} arrow placement="top">
              <Button
                type="button"
                variant="ghost"
                size="small"
                aria-pressed={favorited}
                aria-label={favoriteLabel}
                className="h-9 w-9 rounded-full px-0 text-muted-foreground hover:bg-muted hover:text-foreground"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  onFavoriteToggle(item.id);
                }}
              >
                <Heart
                  aria-hidden="true"
                  className="h-4 w-4"
                  strokeWidth={1.75}
                  fill={favorited ? 'currentColor' : 'none'}
                />
              </Button>
            </Tooltip>
            <Tooltip title={labels.compareComingSoon} arrow placement="top">
              <span className="inline-flex">
                <Button
                  type="button"
                  variant="ghost"
                  size="small"
                  disabled
                  aria-label={labels.compareComingSoon}
                  className="h-9 w-9 rounded-full px-0 text-muted-foreground"
                >
                  <ArrowLeftRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
                </Button>
              </span>
            </Tooltip>
          </div>

          {item.labels.length > 0 ? (
            <ul className="flex max-w-[58%] flex-wrap gap-1.5 pb-1">
              {item.labels.map((key) => {
                const Icon = LABEL_ICONS[key];
                return (
                  <li key={key} className={LABEL_CHIP_CLASS}>
                    <Icon className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
                    {labels.labels[key]}
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>

        <div className="mt-3 flex min-w-0 flex-1 flex-col">
          <div className="mt-4 flex items-start justify-between gap-3">
            <h2 className="min-w-0 font-[Georgia,'Times_New_Roman',serif] text-[1.35rem] font-medium leading-tight tracking-[-0.02em] text-foreground">
              {item.name}
            </h2>
            <p
              className="shrink-0 pt-1 text-xs font-medium tabular-nums text-muted-foreground"
              aria-label={`Rating ${ratingLabel}`}
            >
              ★ {ratingLabel}
            </p>
          </div>

          <p className="mt-2 line-clamp-2 text-sm italic leading-relaxed text-muted-foreground">
            {item.taste}
          </p>
          <p className="mt-1 line-clamp-1 text-xs text-muted-foreground/80">
            <span className="sr-only">{labels.ingredientsLabel}: </span>
            {ingredientLine}
          </p>

          <ul className="my-4 flex flex-wrap gap-2" aria-label={labels.nutritionLabel}>
            <li className="inline-flex items-center gap-1.5 rounded-full bg-warning-muted px-2.5 py-1.5 text-xs font-medium text-foreground">
              <Flame className="h-3.5 w-3.5 text-warning" strokeWidth={2} aria-hidden="true" />
              <span>{labels.calories.replace('{count}', String(item.calories))}</span>
            </li>
            <li className="inline-flex items-center gap-1.5 rounded-full bg-primary-muted px-2.5 py-1.5 text-xs font-medium text-foreground">
              <Drumstick className="h-3.5 w-3.5 text-primary" strokeWidth={2} aria-hidden="true" />
              <span>{labels.protein.replace('{count}', String(item.protein))}</span>
            </li>
            <li className="inline-flex items-center gap-1.5 rounded-full bg-info-muted px-2.5 py-1.5 text-xs font-medium text-foreground">
              <Clock className="h-3.5 w-3.5 text-info" strokeWidth={2} aria-hidden="true" />
              <span>
                {item.prepMinutes > 0
                  ? labels.prepTime.replace('{minutes}', String(item.prepMinutes))
                  : '—'}
              </span>
            </li>
            {item.spicyLevel > 0 ? (
              <li className="pointer-events-auto relative z-[2]">
                <Tooltip title={spicyLabel} arrow placement="top">
                  <button
                    type="button"
                    aria-label={spicyLabel}
                    className="inline-flex items-center gap-1.5 rounded-full bg-error-muted px-2.5 py-1.5 text-xs font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                    }}
                  >
                    <span className="inline-flex gap-0.5" aria-hidden="true">
                      {[1, 2, 3].map((dot) => (
                        <span
                          key={dot}
                          className={[
                            'h-1.5 w-1.5 rounded-full',
                            dot <= item.spicyLevel ? 'bg-error' : 'bg-border',
                          ].join(' ')}
                        />
                      ))}
                    </span>
                  </button>
                </Tooltip>
              </li>
            ) : null}
          </ul>

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-border-subtle pt-4">
            <p className="text-xl font-semibold tabular-nums tracking-tight text-foreground">
              {priceLabel}
            </p>
            <Button
              type="button"
              variant="filled"
              size="small"
              iconSize="small"
              className="pointer-events-auto gap-1.5 rounded-full px-4"
              onClick={handleAdd}
              startIcon={<ShoppingCart aria-hidden="true" strokeWidth={1.75} />}
            >
              {justAdded ? labels.added : labels.addToCart}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};
