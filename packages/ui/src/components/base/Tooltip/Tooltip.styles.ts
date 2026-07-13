import type { TooltipPlacement } from './Tooltip.position';
import type { TooltipProps } from './Tooltip.types';

const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

export const TOOLTIP_TRIGGER_WRAPPER_CLASS = 'inline-flex max-w-full';

export const TOOLTIP_POPPER_CLASS =
  'pointer-events-auto max-w-xs rounded-md bg-foreground px-sm py-xs font-sans text-sm text-background shadow-md';

export const TOOLTIP_ARROW_CLASS = 'absolute h-2 w-2 bg-foreground';

const normalizePlacement = (placement: TooltipProps['placement']): TooltipPlacement => {
  const allowed: TooltipPlacement[] = [
    'top',
    'top-start',
    'top-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'left',
    'left-start',
    'left-end',
    'right',
    'right-start',
    'right-end',
  ];

  if (placement && allowed.includes(placement)) {
    return placement;
  }

  return 'bottom';
};

export const getTooltipTriggerWrapperClassName = ({
  className,
}: { className?: string } = {}): string => joinClassNames(TOOLTIP_TRIGGER_WRAPPER_CLASS, className);

export const getTooltipPopperClassName = ({ className }: { className?: string } = {}): string =>
  joinClassNames(TOOLTIP_POPPER_CLASS, className);

export const getTooltipArrowClassName = (): string => TOOLTIP_ARROW_CLASS;

export { normalizePlacement };
