import type { Size } from '../../../types';
import type { CardProps, CardVariant } from './Card.types';

const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

const normalizeSize = (size: CardProps['size']): Size => {
  if (size === 'small') return 'small';
  if (size === 'large') return 'large';
  return 'medium';
};

const normalizeVariant = (variant: CardProps['variant']): CardVariant => {
  if (variant === 'elevated') return 'elevated';
  return 'outlined';
};

const PADDING_CLASS_MAP: Record<Size, string> = {
  small: 'p-sm',
  medium: 'p-md',
  large: 'p-lg',
};

const VARIANT_CLASS_MAP: Record<CardVariant, string> = {
  outlined: 'border border-border bg-background',
  elevated: 'border border-transparent bg-background shadow-md',
};

export const CARD_BASE_CLASS =
  'rounded-md font-sans text-foreground transition-colors duration-normal';

export const CARD_INTERACTIVE_CLASS =
  'cursor-pointer hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

export const CARD_ACTIONABLE_RESET_CLASS = 'block w-full text-start appearance-none';

export const CARD_HEADER_CLASS = 'flex flex-col gap-1';
export const CARD_TITLE_CLASS = 'font-medium text-foreground';
export const CARD_DESCRIPTION_CLASS = 'text-sm text-muted';
export const CARD_CONTENT_CLASS = 'text-foreground';
export const CARD_FOOTER_CLASS = 'flex items-center gap-sm';

const TITLE_SIZE_CLASS_MAP: Record<Size, string> = {
  small: 'text-sm',
  medium: 'text-md',
  large: 'text-lg',
};

export const getCardClassName = ({
  variant,
  size,
  interactive,
  actionable,
  className,
}: Pick<CardProps, 'variant' | 'size' | 'interactive'> & {
  actionable?: boolean;
  className?: string;
}): string =>
  joinClassNames(
    CARD_BASE_CLASS,
    VARIANT_CLASS_MAP[normalizeVariant(variant)],
    PADDING_CLASS_MAP[normalizeSize(size)],
    interactive && CARD_INTERACTIVE_CLASS,
    actionable && CARD_ACTIONABLE_RESET_CLASS,
    className,
  );

export const getCardTitleClassName = ({
  size,
  className,
}: { size?: Size; className?: string } = {}): string =>
  joinClassNames(CARD_TITLE_CLASS, TITLE_SIZE_CLASS_MAP[normalizeSize(size)], className);

export const getCardSectionClassName = ({
  baseClass,
  className,
}: {
  baseClass: string;
  className?: string;
}): string => joinClassNames(baseClass, className);
