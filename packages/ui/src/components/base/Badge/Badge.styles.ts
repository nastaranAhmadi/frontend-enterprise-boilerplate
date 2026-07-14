import type { ReactNode } from 'react';

import type {
  BadgeAnchorOrigin,
  BadgeColor,
  BadgeOverlap,
  BadgeProps,
  BadgeVariant,
} from './Badge.types';

type SemanticColor = BadgeColor;

const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

export const BADGE_ROOT_CLASS = 'relative inline-flex shrink-0 align-middle';

export const BADGE_CHILD_CLASS = 'inline-flex';

export const BADGE_INDICATOR_BASE_CLASS =
  'pointer-events-none absolute z-dropdown box-border flex items-center justify-center rounded-full border-2 border-background font-sans text-sm font-medium leading-none';

const COLOR_CLASS_MAP: Record<SemanticColor, string> = {
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  success: 'bg-success text-success-foreground',
  warning: 'bg-warning text-warning-foreground',
  error: 'bg-error text-error-foreground',
  info: 'bg-info text-info-foreground',
  neutral: 'bg-muted text-foreground',
};

const ANCHOR_CLASS_MAP: Record<
  `${NonNullable<BadgeAnchorOrigin['vertical']>}-${NonNullable<BadgeAnchorOrigin['horizontal']>}`,
  string
> = {
  'top-right': 'top-0 end-0',
  'top-left': 'top-0 start-0',
  'bottom-right': 'bottom-0 end-0',
  'bottom-left': 'bottom-0 start-0',
};

const RECTANGULAR_TRANSFORM_MAP: Record<
  `${NonNullable<BadgeAnchorOrigin['vertical']>}-${NonNullable<BadgeAnchorOrigin['horizontal']>}`,
  string
> = {
  'top-right': 'translate-x-1/2 -translate-y-1/2',
  'top-left': '-translate-x-1/2 -translate-y-1/2',
  'bottom-right': 'translate-x-1/2 translate-y-1/2',
  'bottom-left': '-translate-x-1/2 translate-y-1/2',
};

const CIRCULAR_TRANSFORM_MAP: Record<
  `${NonNullable<BadgeAnchorOrigin['vertical']>}-${NonNullable<BadgeAnchorOrigin['horizontal']>}`,
  string
> = {
  'top-right': 'translate-x-[35%] -translate-y-[35%]',
  'top-left': '-translate-x-[35%] -translate-y-[35%]',
  'bottom-right': 'translate-x-[35%] translate-y-[35%]',
  'bottom-left': '-translate-x-[35%] translate-y-[35%]',
};

const normalizeColor = (color: BadgeProps['color']): SemanticColor => {
  if (color === 'secondary') return 'secondary';
  if (color === 'success') return 'success';
  if (color === 'warning') return 'warning';
  if (color === 'error') return 'error';
  if (color === 'info') return 'info';
  if (color === 'neutral') return 'neutral';
  return 'primary';
};

const normalizeVariant = (variant: BadgeProps['variant']): BadgeVariant =>
  variant === 'dot' ? 'dot' : 'standard';

const normalizeOverlap = (overlap: BadgeProps['overlap']): BadgeOverlap =>
  overlap === 'circular' ? 'circular' : 'rectangular';

const normalizeAnchorOrigin = (
  anchorOrigin: BadgeProps['anchorOrigin'],
): Required<BadgeAnchorOrigin> => ({
  vertical: anchorOrigin?.vertical === 'bottom' ? 'bottom' : 'top',
  horizontal: anchorOrigin?.horizontal === 'left' ? 'left' : 'right',
});

const anchorKey = (anchorOrigin: Required<BadgeAnchorOrigin>) =>
  `${anchorOrigin.vertical}-${anchorOrigin.horizontal}` as const;

export const getBadgeRootClassName = ({ className }: { className?: string } = {}): string =>
  joinClassNames(BADGE_ROOT_CLASS, className);

export const getBadgeChildClassName = (): string => BADGE_CHILD_CLASS;

export const getBadgeIndicatorClassName = ({
  color,
  variant,
  overlap,
  anchorOrigin,
  className,
}: Pick<BadgeProps, 'color' | 'variant' | 'overlap' | 'anchorOrigin'> & {
  className?: string;
}): string => {
  const resolvedAnchor = normalizeAnchorOrigin(anchorOrigin);
  const anchor = anchorKey(resolvedAnchor);
  const transformMap =
    normalizeOverlap(overlap) === 'circular' ? CIRCULAR_TRANSFORM_MAP : RECTANGULAR_TRANSFORM_MAP;

  return joinClassNames(
    BADGE_INDICATOR_BASE_CLASS,
    COLOR_CLASS_MAP[normalizeColor(color)],
    ANCHOR_CLASS_MAP[anchor],
    transformMap[anchor],
    normalizeVariant(variant) === 'dot' ? 'h-2 min-h-2 w-2 min-w-2 p-0' : 'min-h-5 min-w-5 px-xs',
    className,
  );
};

export const formatBadgeContent = (
  badgeContent: BadgeProps['badgeContent'],
  max: number,
): ReactNode => {
  if (typeof badgeContent === 'number' && max > 0 && badgeContent > max) {
    return `${String(max)}+`;
  }
  return badgeContent;
};

export const isBadgeVisible = ({
  badgeContent,
  variant,
  showZero,
  invisible,
}: Pick<BadgeProps, 'badgeContent' | 'variant' | 'showZero' | 'invisible'>): boolean => {
  if (invisible) return false;
  if (normalizeVariant(variant) === 'dot') return true;
  if (badgeContent === null || badgeContent === undefined || badgeContent === false) return false;
  if (badgeContent === 0 && !showZero) return false;
  if (badgeContent === '' && !showZero) return false;
  return true;
};
