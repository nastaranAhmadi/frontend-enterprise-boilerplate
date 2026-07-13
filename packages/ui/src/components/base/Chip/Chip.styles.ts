import type { ChipColor, ChipProps, ChipSize, ChipVariant } from './Chip.types';

type SemanticColor = ChipColor;

type ColorVariantClasses = Record<ChipVariant, string>;

const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

export const CHIP_BASE_CLASS =
  'inline-flex max-w-full items-center gap-xs font-sans font-medium leading-none transition-colors duration-normal';

export const CHIP_INTERACTIVE_CLASS =
  'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

export const CHIP_LABEL_CLASS = 'truncate';

export const CHIP_ICON_CLASS = 'inline-flex shrink-0 items-center justify-center';

export const CHIP_AVATAR_CLASS =
  'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full';

export const CHIP_DELETE_BUTTON_CLASS =
  'inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 text-current transition-colors duration-normal hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

const SIZE_CLASS_MAP: Record<ChipSize, string> = {
  small: 'h-6 px-xs text-sm',
  medium: 'h-8 px-sm text-sm',
};

const ICON_SIZE_CLASS_MAP: Record<ChipSize, string> = {
  small: 'h-4 w-4 text-sm',
  medium: 'h-5 w-5 text-sm',
};

const AVATAR_SIZE_CLASS_MAP: Record<ChipSize, string> = {
  small: '-ms-xs h-5 w-5',
  medium: '-ms-xs h-6 w-6',
};

const DELETE_SIZE_CLASS_MAP: Record<ChipSize, string> = {
  small: 'h-4 w-4 text-sm',
  medium: 'h-5 w-5 text-md',
};

const FILLED_COLOR_CLASS_MAP: Record<SemanticColor, string> = {
  primary: 'bg-primary text-background',
  secondary: 'bg-secondary text-background',
  success: 'bg-success text-background',
  warning: 'bg-warning text-background',
  error: 'bg-error text-background',
  info: 'bg-info text-background',
  neutral: 'bg-muted text-foreground',
};

const OUTLINED_COLOR_CLASS_MAP: Record<SemanticColor, string> = {
  primary: 'border border-primary bg-transparent text-primary',
  secondary: 'border border-secondary bg-transparent text-secondary',
  success: 'border border-success bg-transparent text-success',
  warning: 'border border-warning bg-transparent text-warning',
  error: 'border border-error bg-transparent text-error',
  info: 'border border-info bg-transparent text-info',
  neutral: 'border border-border bg-transparent text-foreground',
};

const COLOR_VARIANT_CLASS_MAP: Record<SemanticColor, ColorVariantClasses> = {
  primary: {
    filled: FILLED_COLOR_CLASS_MAP.primary,
    outlined: OUTLINED_COLOR_CLASS_MAP.primary,
  },
  secondary: {
    filled: FILLED_COLOR_CLASS_MAP.secondary,
    outlined: OUTLINED_COLOR_CLASS_MAP.secondary,
  },
  success: {
    filled: FILLED_COLOR_CLASS_MAP.success,
    outlined: OUTLINED_COLOR_CLASS_MAP.success,
  },
  warning: {
    filled: FILLED_COLOR_CLASS_MAP.warning,
    outlined: OUTLINED_COLOR_CLASS_MAP.warning,
  },
  error: {
    filled: FILLED_COLOR_CLASS_MAP.error,
    outlined: OUTLINED_COLOR_CLASS_MAP.error,
  },
  info: {
    filled: FILLED_COLOR_CLASS_MAP.info,
    outlined: OUTLINED_COLOR_CLASS_MAP.info,
  },
  neutral: {
    filled: FILLED_COLOR_CLASS_MAP.neutral,
    outlined: OUTLINED_COLOR_CLASS_MAP.neutral,
  },
};

const normalizeColor = (color: ChipProps['color']): SemanticColor => {
  if (color === 'secondary') return 'secondary';
  if (color === 'success') return 'success';
  if (color === 'warning') return 'warning';
  if (color === 'error') return 'error';
  if (color === 'info') return 'info';
  if (color === 'neutral') return 'neutral';
  return 'primary';
};

const normalizeVariant = (variant: ChipProps['variant']): ChipVariant =>
  variant === 'outlined' ? 'outlined' : 'filled';

const normalizeSize = (size: ChipProps['size']): ChipSize =>
  size === 'small' ? 'small' : 'medium';

const colorVariantClasses = (color: ChipProps['color'], variant: ChipProps['variant']): string => {
  const semanticColor = normalizeColor(color);
  const resolvedVariant = normalizeVariant(variant);
  return COLOR_VARIANT_CLASS_MAP[semanticColor][resolvedVariant];
};

export const getChipClassName = ({
  color,
  variant,
  size,
  interactive,
  className,
}: Pick<ChipProps, 'color' | 'variant' | 'size'> & {
  interactive?: boolean;
  className?: string;
}): string => {
  const resolvedSize = normalizeSize(size);

  return joinClassNames(
    CHIP_BASE_CLASS,
    'rounded-full',
    SIZE_CLASS_MAP[resolvedSize],
    colorVariantClasses(color, variant),
    interactive && CHIP_INTERACTIVE_CLASS,
    interactive && 'hover:brightness-95',
    className,
  );
};

export const getChipLabelClassName = (): string => CHIP_LABEL_CLASS;

export const getChipIconClassName = ({ size }: Pick<ChipProps, 'size'>): string =>
  joinClassNames(CHIP_ICON_CLASS, ICON_SIZE_CLASS_MAP[normalizeSize(size)]);

export const getChipAvatarClassName = ({ size }: Pick<ChipProps, 'size'>): string =>
  joinClassNames(CHIP_AVATAR_CLASS, AVATAR_SIZE_CLASS_MAP[normalizeSize(size)]);

export const getChipDeleteButtonClassName = ({ size }: Pick<ChipProps, 'size'>): string =>
  joinClassNames(CHIP_DELETE_BUTTON_CLASS, DELETE_SIZE_CLASS_MAP[normalizeSize(size)]);

export const isChipInteractive = ({
  onClick,
  onDelete,
  href,
  clickable,
}: Pick<ChipProps, 'onClick' | 'onDelete' | 'href' | 'clickable'>): boolean =>
  Boolean(onClick || onDelete || href || clickable);
