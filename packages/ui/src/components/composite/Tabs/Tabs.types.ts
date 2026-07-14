import type { HTMLAttributes, ReactNode } from 'react';

export type TabsVariant =
  | 'button-brand'
  | 'button-gray'
  | 'button-border'
  | 'button-minimal'
  | 'underline'
  | 'line';

export type TabsOrientation = 'horizontal' | 'vertical';

export type TabsSize = 'small' | 'medium';

export interface TabsOwnProps {
  children?: ReactNode;
  className?: string;
  defaultSelectedKey?: string;
  onSelectionChange?: (key: string) => void;
  orientation?: TabsOrientation;
  selectedKey?: string;
}

export type TabsProps = TabsOwnProps & Omit<HTMLAttributes<HTMLDivElement>, keyof TabsOwnProps>;

export interface TabsListOwnProps {
  children?: ReactNode;
  className?: string;
  fullWidth?: boolean;
  size?: TabsSize;
  variant?: TabsVariant;
}

export type TabsListProps = TabsListOwnProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof TabsListOwnProps>;

export interface TabsItemOwnProps {
  badge?: ReactNode;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  id: string;
}

export type TabsItemProps = TabsItemOwnProps &
  Omit<HTMLAttributes<HTMLButtonElement>, keyof TabsItemOwnProps | 'id'>;

export interface TabsPanelOwnProps {
  children?: ReactNode;
  className?: string;
  id: string;
}

export type TabsPanelProps = TabsPanelOwnProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof TabsPanelOwnProps | 'id'>;
