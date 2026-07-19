'use client';

import { useState } from 'react';

import type { MenuDetailReview } from '@/repositories/menu/menu-detail.types';

type FoodCommentsPanelLabels = {
  title: string;
  showMore: string;
  showLess: string;
  empty: string;
};

type FoodCommentsPanelProps = {
  reviews: MenuDetailReview[];
  labels: FoodCommentsPanelLabels;
};

/** Preview ~1.5 comments; max-height only — never forces empty space. */
const COLLAPSED_MAX_HEIGHT_CLASS = 'max-h-[8.5rem]';

export const FoodCommentsPanel = ({ reviews, labels }: FoodCommentsPanelProps) => {
  const [expanded, setExpanded] = useState(false);
  const canToggle = reviews.length > 2;

  return (
    <section className="flex min-w-0 flex-col self-start rounded-2xl border border-border bg-surface p-md sm:p-lg">
      <h2 className="text-lg font-semibold text-foreground">{labels.title}</h2>

      {reviews.length === 0 ? (
        <p className="mt-md text-sm text-muted-foreground">{labels.empty}</p>
      ) : (
        <div className="relative mt-md">
          <div
            className={
              canToggle && !expanded ? `overflow-hidden ${COLLAPSED_MAX_HEIGHT_CLASS}` : undefined
            }
          >
            <ul className="flex flex-col gap-md">
              {reviews.map((review) => (
                <li
                  key={review.id}
                  className="rounded-xl border border-border-subtle bg-background p-md"
                >
                  <div className="flex items-center justify-between gap-sm">
                    <p className="text-sm font-medium text-foreground">{review.author}</p>
                    <p className="text-xs tabular-nums text-muted-foreground">★ {review.rating}</p>
                  </div>
                  <p className="mt-xs text-sm leading-relaxed text-muted-foreground">
                    {review.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {canToggle && !expanded ? (
            <>
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface via-surface/85 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center pb-xs">
                <button
                  type="button"
                  className="group flex flex-col items-center gap-xs text-sm font-medium text-foreground transition-colors hover:text-secondary"
                  onClick={() => {
                    setExpanded(true);
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface-elevated shadow-sm transition-transform group-hover:border-secondary motion-safe:animate-bounce-gentle"
                  >
                    ↓
                  </span>
                </button>
              </div>
            </>
          ) : null}

          {canToggle && expanded ? (
            <div className="mt-sm flex flex-col items-center">
              <button
                type="button"
                className="group flex flex-col items-center gap-xs text-sm font-medium text-foreground transition-colors hover:text-secondary"
                onClick={() => {
                  setExpanded(false);
                }}
              >
                <span>{labels.showLess}</span>
                <span
                  aria-hidden="true"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface-elevated shadow-sm transition-transform group-hover:border-secondary"
                >
                  ↑
                </span>
              </button>
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
};
