import type {
  TabsItemProps,
  TabsListProps,
  TabsOrientation,
  TabsProps,
  TabsSize,
  TabsVariant,
} from './Tabs.types';

const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

export const TABS_ROOT_CLASS = 'flex w-full flex-col gap-md font-sans';

export const TABS_BADGE_BASE_CLASS =
  'inline-flex min-h-5 min-w-5 items-center justify-center rounded-full px-xs text-xs font-medium leading-none';

const LIST_ORIENTATION_CLASS_MAP: Record<TabsOrientation, string> = {
  horizontal: 'flex flex-row items-center',
  vertical: 'flex flex-col items-stretch',
};

const LIST_VARIANT_CLASS_MAP: Record<TabsVariant, string> = {
  'button-brand': 'gap-xs rounded-lg bg-muted/40 p-xs',
  'button-gray': 'gap-xs rounded-lg bg-muted/30 p-xs',
  'button-border': 'gap-xs rounded-lg border border-border p-xs',
  'button-minimal': 'gap-xs p-xs',
  underline: 'gap-md border-b border-border',
  line: 'gap-md border-b border-border',
};

const LIST_SIZE_GAP_CLASS_MAP: Record<TabsSize, string> = {
  small: 'gap-xs',
  medium: 'gap-sm',
};

const TAB_SIZE_CLASS_MAP: Record<TabsSize, string> = {
  small: 'px-sm py-xs text-sm',
  medium: 'px-md py-sm text-sm',
};

const TAB_BASE_CLASS =
  'inline-flex items-center justify-center gap-xs rounded-md font-medium leading-none transition-colors duration-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

const TAB_SELECTED_CLASS_MAP: Record<TabsVariant, string> = {
  'button-brand': 'bg-primary text-primary-foreground',
  'button-gray': 'bg-muted text-foreground',
  'button-border': 'border border-border bg-background text-foreground shadow-sm',
  'button-minimal': 'bg-muted/50 text-foreground',
  underline: 'text-primary',
  line: 'text-primary',
};

const TAB_UNSELECTED_CLASS_MAP: Record<TabsVariant, string> = {
  'button-brand': 'text-muted-foreground hover:bg-muted hover:text-foreground',
  'button-gray': 'text-muted-foreground hover:bg-muted/70 hover:text-foreground',
  'button-border': 'border border-transparent text-muted-foreground hover:bg-muted',
  'button-minimal': 'text-muted-foreground hover:bg-muted/30 hover:text-foreground',
  underline: 'border-b-2 border-transparent text-muted-foreground hover:text-foreground',
  line: 'border-b-2 border-transparent text-muted-foreground hover:text-foreground',
};

const TAB_UNDERLINE_SELECTED_CLASS = 'border-b-2 border-primary -mb-px pb-sm text-primary';

const TAB_LINE_SELECTED_CLASS = 'border-b-2 border-primary -mb-px pb-sm text-primary';

const TAB_VERTICAL_UNDERLINE_UNSELECTED =
  'border-e-2 border-transparent text-muted-foreground hover:text-foreground';
const TAB_VERTICAL_UNDERLINE_SELECTED = 'border-e-2 border-primary text-primary';

export const TABS_PANEL_CLASS = 'focus-visible:outline-none';

const normalizeVariant = (variant: TabsListProps['variant']): TabsVariant => {
  const variants: TabsVariant[] = [
    'button-brand',
    'button-gray',
    'button-border',
    'button-minimal',
    'underline',
    'line',
  ];

  if (variant && variants.includes(variant)) {
    return variant;
  }

  return 'underline';
};

const normalizeSize = (size: TabsListProps['size']): TabsSize =>
  size === 'medium' ? 'medium' : 'small';

const normalizeOrientation = (orientation: TabsProps['orientation']): TabsOrientation =>
  orientation === 'vertical' ? 'vertical' : 'horizontal';

export const getTabsRootClassName = ({ className }: { className?: string } = {}): string =>
  joinClassNames(TABS_ROOT_CLASS, className);

export const getTabsListClassName = ({
  variant,
  size,
  orientation,
  fullWidth,
  className,
}: Pick<TabsListProps, 'variant' | 'size' | 'fullWidth'> & {
  orientation?: TabsProps['orientation'];
  className?: string;
}): string => {
  const resolvedVariant = normalizeVariant(variant);
  const resolvedOrientation = normalizeOrientation(orientation);

  return joinClassNames(
    'inline-flex',
    LIST_ORIENTATION_CLASS_MAP[resolvedOrientation],
    LIST_VARIANT_CLASS_MAP[resolvedVariant],
    LIST_SIZE_GAP_CLASS_MAP[normalizeSize(size)],
    fullWidth && resolvedOrientation === 'horizontal' && 'w-full',
    !fullWidth && resolvedOrientation === 'horizontal' && 'max-w-full overflow-x-auto',
    !fullWidth && resolvedOrientation === 'horizontal' && 'flex-nowrap',
    className,
  );
};

export const getTabsItemClassName = ({
  variant,
  size,
  orientation,
  selected,
  fullWidth,
  className,
}: Pick<TabsItemProps, 'className'> & {
  variant: TabsVariant;
  size: TabsSize;
  orientation: TabsOrientation;
  selected: boolean;
  fullWidth?: boolean;
}): string => {
  const isUnderlineLike = variant === 'underline' || variant === 'line';
  const isVertical = orientation === 'vertical';

  let stateClass = selected ? TAB_SELECTED_CLASS_MAP[variant] : TAB_UNSELECTED_CLASS_MAP[variant];

  if (isUnderlineLike && selected && !isVertical) {
    stateClass = variant === 'line' ? TAB_LINE_SELECTED_CLASS : TAB_UNDERLINE_SELECTED_CLASS;
  }

  if (isUnderlineLike && !selected && isVertical) {
    stateClass = TAB_VERTICAL_UNDERLINE_UNSELECTED;
  }

  if (isUnderlineLike && selected && isVertical) {
    stateClass = TAB_VERTICAL_UNDERLINE_SELECTED;
  }

  if (isUnderlineLike && !isVertical) {
    return joinClassNames(
      TAB_BASE_CLASS,
      'rounded-none bg-transparent shadow-none',
      TAB_SIZE_CLASS_MAP[normalizeSize(size)],
      stateClass,
      fullWidth && 'flex-1',
      className,
    );
  }

  return joinClassNames(
    TAB_BASE_CLASS,
    TAB_SIZE_CLASS_MAP[normalizeSize(size)],
    stateClass,
    fullWidth && orientation === 'horizontal' && 'flex-1',
    isVertical && 'w-full justify-start',
    className,
  );
};

export const getTabsBadgeClassName = ({
  selected,
  variant,
}: {
  selected: boolean;
  variant: TabsVariant;
}): string => {
  if (!selected) {
    return joinClassNames(TABS_BADGE_BASE_CLASS, 'bg-muted text-muted-foreground');
  }

  if (variant === 'button-brand') {
    return joinClassNames(
      TABS_BADGE_BASE_CLASS,
      'bg-primary-foreground/20 text-primary-foreground',
    );
  }

  return joinClassNames(TABS_BADGE_BASE_CLASS, 'bg-primary text-primary-foreground');
};

export const getTabsPanelClassName = ({ className }: { className?: string } = {}): string =>
  joinClassNames(TABS_PANEL_CLASS, className);

export { normalizeOrientation, normalizeSize, normalizeVariant };
