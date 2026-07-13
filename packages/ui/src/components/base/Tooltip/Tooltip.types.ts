import type { ReactNode } from 'react';

import type { TooltipPlacement } from './Tooltip.position';

export interface TooltipOwnProps {
  arrow?: boolean;
  children: ReactNode;
  className?: string;
  describeChild?: boolean;
  disableFocusListener?: boolean;
  disableHoverListener?: boolean;
  disableInteractive?: boolean;
  disableTouchListener?: boolean;
  enterDelay?: number;
  enterTouchDelay?: number;
  leaveDelay?: number;
  leaveTouchDelay?: number;
  onClose?: (event?: Event) => void;
  onOpen?: (event?: Event) => void;
  open?: boolean;
  placement?: TooltipPlacement;
  title: ReactNode;
  tooltipClassName?: string;
}

export type TooltipProps = TooltipOwnProps;
