import type { SwitchProps } from './Switch.types';

type SwitchSize = NonNullable<SwitchProps['size']>;

export const ROOT_CLASS = 'relative inline-flex shrink-0';

export const INPUT_CLASS =
  'peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed';

export const TRACK_BASE_CLASS =
  'pointer-events-none relative inline-flex shrink-0 rounded-full bg-muted transition-colors duration-normal after:absolute after:rounded-full after:bg-background after:shadow-sm after:transition-transform after:content-[""] peer-checked:bg-primary peer-disabled:opacity-50 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2';

const TRACK_SIZE_CLASS_MAP: Record<SwitchSize, string> = {
  small:
    'h-4 w-8 after:start-0.5 after:top-0.5 after:h-3 after:w-3 peer-checked:after:translate-x-4 rtl:peer-checked:after:-translate-x-4',
  medium:
    'h-6 w-11 after:start-0.5 after:top-0.5 after:h-5 after:w-5 peer-checked:after:translate-x-5 rtl:peer-checked:after:-translate-x-5',
  large:
    'h-7 w-14 after:start-0.5 after:top-0.5 after:h-6 after:w-6 peer-checked:after:translate-x-7 rtl:peer-checked:after:-translate-x-7',
};

const FOCUS_RING_CLASS = 'peer-focus-visible:ring-primary';
const INVALID_FOCUS_RING_CLASS = 'peer-focus-visible:ring-error';
const INVALID_TRACK_CLASS = 'ring-1 ring-error';

const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

const normalizeSize = (size: SwitchProps['size']): SwitchSize => {
  if (size === 'small') return 'small';
  if (size === 'large') return 'large';
  return 'medium';
};

const stateClasses = (invalid?: boolean): string =>
  joinClassNames(
    invalid ? INVALID_FOCUS_RING_CLASS : FOCUS_RING_CLASS,
    invalid && INVALID_TRACK_CLASS,
  );

export const getRootClassName = ({ className }: { className?: string }): string =>
  joinClassNames(ROOT_CLASS, className);

export const getInputClassName = ({ disabled }: Pick<SwitchProps, 'disabled'>): string =>
  joinClassNames(INPUT_CLASS, disabled && 'cursor-not-allowed');

export const getTrackClassName = ({
  size,
  invalid,
}: Pick<SwitchProps, 'size' | 'invalid'>): string =>
  joinClassNames(
    TRACK_BASE_CLASS,
    TRACK_SIZE_CLASS_MAP[normalizeSize(size)],
    stateClasses(invalid),
  );
