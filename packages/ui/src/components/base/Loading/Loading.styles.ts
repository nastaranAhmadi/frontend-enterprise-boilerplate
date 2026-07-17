import type { LoadingProps, LoadingVariant } from './Loading.types';

const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

export const LOADING_ROOT_CLASS = 'inline-flex items-center justify-center font-sans';

export const LOADING_DOT_BASE_CLASS = 'rounded-full';

export const LOADING_DOTS_ROW_CLASS = 'inline-flex items-end justify-center';

export const LOADING_TYPING_SHELL_CLASS =
  'inline-flex items-center justify-center rounded-full bg-primary/10';

export const LOADING_TYPING_DOTS_CLASS = 'inline-flex items-center justify-center gap-xs';

export const LOADING_MATRIX_CLASS = 'inline-flex items-center gap-xs';

export const LOADING_MATRIX_COLUMN_CLASS = 'inline-flex flex-col gap-xs';

export const LOADING_CIRCULAR_CLASS = 'relative inline-flex items-center justify-center';

export const LOADING_CIRCULAR_RING_CLASS = 'absolute rounded-full border-solid';

export const LOADING_GRID_CLASS = 'inline-grid grid-cols-2 gap-xs';

export const LOADING_GRID_CELL_CLASS = 'rounded-sm';

type LoadingSize = NonNullable<LoadingProps['size']>;

const DOT_SIZE_CLASS_MAP: Record<LoadingSize, string> = {
  small: 'h-2 w-2',
  medium: 'h-3 w-3',
  large: 'h-4 w-4',
};

const LARGE_DOT_SIZE_CLASS_MAP: Record<LoadingSize, string> = {
  small: 'h-3 w-3',
  medium: 'h-4 w-4',
  large: 'h-5 w-5',
};

const DOT_GAP_CLASS_MAP: Record<LoadingSize, string> = {
  small: 'gap-xs',
  medium: 'gap-sm',
  large: 'gap-md',
};

const TYPING_SHELL_SIZE_CLASS_MAP: Record<LoadingSize, string> = {
  small: 'h-8 w-8',
  medium: 'h-10 w-10',
  large: 'h-12 w-12',
};

const CIRCULAR_SIZE_CLASS_MAP: Record<LoadingSize, string> = {
  small: 'h-8 w-8',
  medium: 'h-10 w-10',
  large: 'h-12 w-12',
};

const GRID_CELL_SIZE_CLASS_MAP: Record<LoadingSize, string> = {
  small: 'h-3 w-3',
  medium: 'h-4 w-4',
  large: 'h-5 w-5',
};

/** Brand-forward palette — follows active app theme tokens. */
const LOADING_THEME_COLOR_CLASSES = [
  'bg-primary',
  'bg-secondary',
  'bg-accent',
  'bg-success',
  'bg-info',
] as const;

const LOADING_BRAND_COLOR_CLASSES = ['bg-primary', 'bg-secondary', 'bg-accent'] as const;

const DOT_COLOR_CLASSES = LOADING_THEME_COLOR_CLASSES;
const DOTS_3_COLOR_CLASSES = LOADING_BRAND_COLOR_CLASSES;
const DOTS_BOUNCE_COLOR_CLASSES = LOADING_BRAND_COLOR_CLASSES;
const GRID_COLOR_CLASSES = ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-primary/70'] as const;

const normalizeSize = (size: LoadingProps['size']): LoadingSize => {
  if (size === 'small' || size === 'large') return size;
  return 'medium';
};

const normalizeVariant = (variant: LoadingProps['variant']): LoadingVariant => {
  const variants: LoadingVariant[] = [
    'dots-3',
    'dot-bounce',
    'dots-5',
    'typing',
    'dot-matrix',
    'dots-bounce',
    'circular',
    'grid',
  ];

  if (variant && variants.includes(variant)) {
    return variant;
  }

  return 'dots-3';
};

export const getLoadingRootClassName = ({ className }: { className?: string } = {}): string =>
  joinClassNames(LOADING_ROOT_CLASS, className);

export const getLoadingDotClassName = ({
  size,
  colorClass,
  animationClass,
}: {
  size: LoadingProps['size'];
  colorClass: string;
  animationClass?: string;
}): string =>
  joinClassNames(
    LOADING_DOT_BASE_CLASS,
    DOT_SIZE_CLASS_MAP[normalizeSize(size)],
    colorClass,
    animationClass,
  );

export const getLoadingLargeDotClassName = ({
  size,
  colorClass,
  animationClass,
}: {
  size: LoadingProps['size'];
  colorClass: string;
  animationClass?: string;
}): string =>
  joinClassNames(
    LOADING_DOT_BASE_CLASS,
    LARGE_DOT_SIZE_CLASS_MAP[normalizeSize(size)],
    colorClass,
    animationClass,
  );

export const getLoadingDotsRowClassName = ({ size }: { size: LoadingProps['size'] }): string =>
  joinClassNames(LOADING_DOTS_ROW_CLASS, DOT_GAP_CLASS_MAP[normalizeSize(size)]);

export const getLoadingTypingShellClassName = ({ size }: { size: LoadingProps['size'] }): string =>
  joinClassNames(LOADING_TYPING_SHELL_CLASS, TYPING_SHELL_SIZE_CLASS_MAP[normalizeSize(size)]);

export const getLoadingCircularClassName = ({ size }: { size: LoadingProps['size'] }): string =>
  joinClassNames(LOADING_CIRCULAR_CLASS, CIRCULAR_SIZE_CLASS_MAP[normalizeSize(size)]);

export const getLoadingGridCellClassName = ({
  size,
  colorClass,
}: {
  size: LoadingProps['size'];
  colorClass: string;
}): string =>
  joinClassNames(
    LOADING_GRID_CELL_CLASS,
    GRID_CELL_SIZE_CLASS_MAP[normalizeSize(size)],
    colorClass,
    'animate-loading-grid-pulse',
  );

export const getDotStyle = (animationDelayMs?: number): { animationDelay?: string } =>
  animationDelayMs === undefined ? {} : { animationDelay: `${String(animationDelayMs)}ms` };

export {
  DOT_COLOR_CLASSES,
  DOTS_3_COLOR_CLASSES,
  DOTS_BOUNCE_COLOR_CLASSES,
  GRID_COLOR_CLASSES,
  normalizeSize,
  normalizeVariant,
};
