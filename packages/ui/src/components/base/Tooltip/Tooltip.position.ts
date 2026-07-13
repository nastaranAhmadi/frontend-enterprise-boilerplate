import type { CSSProperties } from 'react';

export type TooltipPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

export interface TooltipPosition {
  top: number;
  left: number;
}

export interface TooltipArrowPosition {
  top?: number | string;
  left?: number | string;
  bottom?: number | string;
  right?: number | string;
  transform?: string;
}

const DEFAULT_GAP = 8;
const ARROW_SIZE = 6;

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

export const computeTooltipPosition = ({
  anchorRect,
  tooltipRect,
  placement,
  gap = DEFAULT_GAP,
}: {
  anchorRect: DOMRect;
  tooltipRect: DOMRect;
  placement: TooltipPlacement;
  gap?: number;
}): TooltipPosition => {
  const anchorCenterX = anchorRect.left + anchorRect.width / 2;
  const anchorCenterY = anchorRect.top + anchorRect.height / 2;

  let top = 0;
  let left = 0;

  switch (placement) {
    case 'top':
      top = anchorRect.top - tooltipRect.height - gap;
      left = anchorCenterX - tooltipRect.width / 2;
      break;
    case 'top-start':
      top = anchorRect.top - tooltipRect.height - gap;
      left = anchorRect.left;
      break;
    case 'top-end':
      top = anchorRect.top - tooltipRect.height - gap;
      left = anchorRect.right - tooltipRect.width;
      break;
    case 'bottom':
      top = anchorRect.bottom + gap;
      left = anchorCenterX - tooltipRect.width / 2;
      break;
    case 'bottom-start':
      top = anchorRect.bottom + gap;
      left = anchorRect.left;
      break;
    case 'bottom-end':
      top = anchorRect.bottom + gap;
      left = anchorRect.right - tooltipRect.width;
      break;
    case 'left':
      top = anchorCenterY - tooltipRect.height / 2;
      left = anchorRect.left - tooltipRect.width - gap;
      break;
    case 'left-start':
      top = anchorRect.top;
      left = anchorRect.left - tooltipRect.width - gap;
      break;
    case 'left-end':
      top = anchorRect.bottom - tooltipRect.height;
      left = anchorRect.left - tooltipRect.width - gap;
      break;
    case 'right':
      top = anchorCenterY - tooltipRect.height / 2;
      left = anchorRect.right + gap;
      break;
    case 'right-start':
      top = anchorRect.top;
      left = anchorRect.right + gap;
      break;
    case 'right-end':
      top = anchorRect.bottom - tooltipRect.height;
      left = anchorRect.right + gap;
      break;
    default:
      top = anchorRect.top - tooltipRect.height - gap;
      left = anchorCenterX - tooltipRect.width / 2;
      break;
  }

  const maxLeft = Math.max(8, window.innerWidth - tooltipRect.width - 8);
  const maxTop = Math.max(8, window.innerHeight - tooltipRect.height - 8);

  return {
    top: clamp(top, 8, maxTop),
    left: clamp(left, 8, maxLeft),
  };
};

export const getTooltipArrowStyle = (placement: TooltipPlacement): TooltipArrowPosition => {
  const offset = `${String(ARROW_SIZE)}px`;

  if (placement.startsWith('top')) {
    return { bottom: `-${offset}`, left: '50%', transform: 'translateX(-50%) rotate(45deg)' };
  }
  if (placement.startsWith('bottom')) {
    return { top: `-${offset}`, left: '50%', transform: 'translateX(-50%) rotate(45deg)' };
  }
  if (placement.startsWith('left')) {
    return { right: `-${offset}`, top: '50%', transform: 'translateY(-50%) rotate(45deg)' };
  }
  return { left: `-${offset}`, top: '50%', transform: 'translateY(-50%) rotate(45deg)' };
};

export const getTooltipPopperStyle = (position: TooltipPosition): CSSProperties => ({
  position: 'fixed',
  top: position.top,
  left: position.left,
  zIndex: 'var(--z-dropdown)',
});
