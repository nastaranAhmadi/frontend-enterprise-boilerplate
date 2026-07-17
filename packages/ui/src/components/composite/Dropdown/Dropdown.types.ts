import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';

import type { Size } from '../../../types';

export type DropdownAlign = 'start' | 'end' | 'center';

export interface DropdownOwnProps {
  trigger: ReactElement;
  children?: ReactNode;
  className?: string;
  menuClassName?: string;
  size?: Size;
  align?: DropdownAlign;
  /** Root positioning. Use `static` so the menu anchors to a positioned ancestor (e.g. sticky header). */
  position?: 'relative' | 'static';
  /** Open on pointer hover; click / keyboard still work for accessibility. */
  openOnHover?: boolean;
  /** Delay before closing after pointer leaves (ms). Defaults to 160. */
  hoverCloseDelay?: number;
  disabled?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export type DropdownProps = DropdownOwnProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof DropdownOwnProps>;

export interface DropdownItemOwnProps {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  destructive?: boolean;
}

export type DropdownItemProps = DropdownItemOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof DropdownItemOwnProps>;

export interface DropdownLinkOwnProps {
  children?: ReactNode;
  className?: string;
  href: string;
  rel?: string;
  target?: string;
}

export type DropdownLinkProps = DropdownLinkOwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof DropdownLinkOwnProps>;
