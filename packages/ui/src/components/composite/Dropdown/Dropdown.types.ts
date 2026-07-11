import type { ButtonHTMLAttributes, HTMLAttributes, ReactElement, ReactNode } from 'react';

import type { Size } from '../../../types';

export type DropdownAlign = 'start' | 'end';

export interface DropdownOwnProps {
  trigger: ReactElement;
  children?: ReactNode;
  className?: string;
  menuClassName?: string;
  size?: Size;
  align?: DropdownAlign;
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
