import { forwardRef } from 'react';

import {
  DOT_COLOR_CLASSES,
  DOTS_3_COLOR_CLASSES,
  DOTS_BOUNCE_COLOR_CLASSES,
  getDotStyle,
  getLoadingCircularClassName,
  getLoadingDotsRowClassName,
  getLoadingGridCellClassName,
  getLoadingLargeDotClassName,
  getLoadingRootClassName,
  getLoadingTypingShellClassName,
  GRID_COLOR_CLASSES,
  LOADING_CIRCULAR_RING_CLASS,
  LOADING_GRID_CLASS,
  LOADING_MATRIX_CLASS,
  LOADING_MATRIX_COLUMN_CLASS,
  LOADING_TYPING_DOTS_CLASS,
  normalizeVariant,
} from './Loading.styles';
import type { LoadingProps } from './Loading.types';

const Dots3 = ({ size }: { size: LoadingProps['size'] }) => (
  <span className={getLoadingDotsRowClassName({ size })}>
    {DOTS_3_COLOR_CLASSES.map((colorClass, index) => (
      <span
        key={colorClass}
        aria-hidden="true"
        className={getLoadingLargeDotClassName({
          size,
          colorClass,
          animationClass: 'animate-loading-bounce',
        })}
        style={getDotStyle(index * 120)}
      />
    ))}
  </span>
);

const DotBounce = ({ size }: { size: LoadingProps['size'] }) => (
  <span
    aria-hidden="true"
    className={getLoadingLargeDotClassName({
      size,
      colorClass: 'bg-error',
      animationClass: 'animate-loading-bounce',
    })}
  />
);

const Dots5 = ({ size }: { size: LoadingProps['size'] }) => (
  <span className={getLoadingDotsRowClassName({ size })}>
    {DOT_COLOR_CLASSES.map((colorClass, index) => (
      <span
        key={colorClass}
        aria-hidden="true"
        className={getLoadingLargeDotClassName({
          size,
          colorClass,
          animationClass: 'animate-loading-pulse-dot',
        })}
        style={getDotStyle(index * 120)}
      />
    ))}
  </span>
);

const Typing = ({ size }: { size: LoadingProps['size'] }) => (
  <span className={getLoadingTypingShellClassName({ size })}>
    <span className={LOADING_TYPING_DOTS_CLASS}>
      {Array.from({ length: 3 }, (_, index) => (
        <span
          key={`typing-dot-${String(index)}`}
          aria-hidden="true"
          className={getLoadingLargeDotClassName({
            size: 'small',
            colorClass: 'bg-primary',
            animationClass: 'animate-loading-pulse-dot',
          })}
          style={getDotStyle(index * 120)}
        />
      ))}
    </span>
  </span>
);

const DotMatrix = () => {
  const leftColumn = DOT_COLOR_CLASSES;
  const rightColumn = [...DOT_COLOR_CLASSES].reverse();

  return (
    <span className={LOADING_MATRIX_CLASS}>
      {[leftColumn, rightColumn].map((column, columnIndex) => (
        <span key={columnIndex === 0 ? 'left' : 'right'} className={LOADING_MATRIX_COLUMN_CLASS}>
          {column.map((colorClass, index) => (
            <span
              key={`${colorClass}-${String(index)}`}
              aria-hidden="true"
              className={getLoadingLargeDotClassName({
                size: 'small',
                colorClass,
                animationClass: 'animate-loading-pulse-dot',
              })}
              style={getDotStyle((columnIndex * 5 + index) * 90)}
            />
          ))}
        </span>
      ))}
    </span>
  );
};

const DotsBounce = ({ size }: { size: LoadingProps['size'] }) => (
  <span className={getLoadingDotsRowClassName({ size })}>
    {DOTS_BOUNCE_COLOR_CLASSES.map((colorClass, index) => (
      <span
        key={colorClass}
        aria-hidden="true"
        className={getLoadingLargeDotClassName({
          size,
          colorClass,
          animationClass: 'animate-loading-bounce',
        })}
        style={getDotStyle(index * 140)}
      />
    ))}
  </span>
);

const Circular = ({ size }: { size: LoadingProps['size'] }) => (
  <span className={getLoadingCircularClassName({ size })} aria-hidden="true">
    <span
      className={`${LOADING_CIRCULAR_RING_CLASS} inset-0 border-2 border-error border-t-transparent animate-spin`}
    />
    <span
      className={`${LOADING_CIRCULAR_RING_CLASS} inset-1 border-2 border-warning border-t-transparent animate-spin`}
      style={{ animationDirection: 'reverse', animationDuration: '1.4s' }}
    />
    <span
      className={`${LOADING_CIRCULAR_RING_CLASS} inset-2 border-2 border-primary border-b-transparent animate-spin`}
      style={{ animationDuration: '1.8s' }}
    />
  </span>
);

const Grid = ({ size }: { size: LoadingProps['size'] }) => (
  <span className={LOADING_GRID_CLASS}>
    {GRID_COLOR_CLASSES.map((colorClass, index) => (
      <span
        key={colorClass}
        aria-hidden="true"
        className={getLoadingGridCellClassName({
          size,
          colorClass,
        })}
        style={getDotStyle(index * 140)}
      />
    ))}
  </span>
);

const VARIANT_RENDERERS = {
  'dots-3': Dots3,
  'dot-bounce': DotBounce,
  'dots-5': Dots5,
  typing: Typing,
  'dot-matrix': DotMatrix,
  'dots-bounce': DotsBounce,
  circular: Circular,
  grid: Grid,
} as const;

export const Loading = forwardRef<HTMLDivElement, LoadingProps>(function Loading(props, ref) {
  const {
    className,
    label = 'Loading',
    size = 'medium',
    variant = 'dots-3',
    ...loadingProps
  } = props;

  const Indicator = VARIANT_RENDERERS[normalizeVariant(variant)];

  return (
    <div
      {...loadingProps}
      ref={ref}
      role="status"
      aria-live="polite"
      aria-label={label}
      className={getLoadingRootClassName({ className })}
    >
      <Indicator size={size} />
    </div>
  );
});

Loading.displayName = 'Loading';
