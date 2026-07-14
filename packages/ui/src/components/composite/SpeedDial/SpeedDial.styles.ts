import type { SpeedDialDirection, SpeedDialProps } from './SpeedDial.types';

const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

export const SPEED_DIAL_ROOT_CLASS = 'relative inline-flex';
export const SPEED_DIAL_BACKDROP_CLASS = 'fixed inset-0 z-base bg-transparent';
export const SPEED_DIAL_ACTIONS_BASE_CLASS = 'absolute z-dropdown flex gap-sm';
export const SPEED_DIAL_ACTION_ROW_CLASS = 'flex items-center gap-xs';
export const SPEED_DIAL_TOOLTIP_CLASS =
  'rounded-md bg-foreground px-sm py-xs text-sm text-background shadow-sm';
export const SPEED_DIAL_ACTION_BUTTON_CLASS =
  'inline-flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground shadow-md transition-[box-shadow,background-color] duration-normal hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

const DIRECTION_CLASS_MAP: Record<SpeedDialDirection, string> = {
  up: 'bottom-full start-1/2 mb-sm -translate-x-1/2 flex-col-reverse',
  down: 'top-full start-1/2 mt-sm -translate-x-1/2 flex-col',
  left: 'end-full top-1/2 me-sm -translate-y-1/2 flex-row-reverse',
  right: 'start-full top-1/2 ms-sm -translate-y-1/2 flex-row',
};

const normalizeDirection = (direction: SpeedDialProps['direction']): SpeedDialDirection => {
  if (direction === 'down' || direction === 'left' || direction === 'right') return direction;
  return 'up';
};

export const getSpeedDialRootClassName = ({ className }: { className?: string } = {}): string =>
  joinClassNames(SPEED_DIAL_ROOT_CLASS, className);

export const getSpeedDialActionsClassName = ({
  direction,
  className,
}: {
  direction?: SpeedDialProps['direction'];
  className?: string;
}): string =>
  joinClassNames(
    SPEED_DIAL_ACTIONS_BASE_CLASS,
    DIRECTION_CLASS_MAP[normalizeDirection(direction)],
    className,
  );

export const getSpeedDialActionRowClassName = ({
  className,
}: { className?: string } = {}): string => joinClassNames(SPEED_DIAL_ACTION_ROW_CLASS, className);

export const getSpeedDialTooltipClassName = ({ className }: { className?: string } = {}): string =>
  joinClassNames(SPEED_DIAL_TOOLTIP_CLASS, className);

export const getSpeedDialActionButtonClassName = ({
  className,
}: { className?: string } = {}): string =>
  joinClassNames(SPEED_DIAL_ACTION_BUTTON_CLASS, className);

export const getSpeedDialMenuOrientation = (
  direction: SpeedDialProps['direction'],
): 'vertical' | 'horizontal' => {
  const resolved = normalizeDirection(direction);
  return resolved === 'left' || resolved === 'right' ? 'horizontal' : 'vertical';
};

export const getSpeedDialNavigationKeys = (
  direction: SpeedDialProps['direction'],
  isRtl = false,
): { next: string; previous: string } => {
  const resolved = normalizeDirection(direction);
  if (resolved === 'left' || resolved === 'right') {
    return isRtl
      ? { next: 'ArrowLeft', previous: 'ArrowRight' }
      : { next: 'ArrowRight', previous: 'ArrowLeft' };
  }
  return { next: 'ArrowDown', previous: 'ArrowUp' };
};
