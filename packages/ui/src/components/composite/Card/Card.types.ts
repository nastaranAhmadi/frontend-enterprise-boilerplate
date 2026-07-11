import type { HTMLAttributes, ReactNode } from 'react';

import type { Size } from '../../../types';

export type CardVariant = 'outlined' | 'elevated';

export interface CardOwnProps {
  children?: ReactNode;
  className?: string;
  variant?: CardVariant;
  size?: Size;
  interactive?: boolean;
}

export type CardProps = CardOwnProps & Omit<HTMLAttributes<HTMLElement>, keyof CardOwnProps>;

export interface CardSectionOwnProps {
  children?: ReactNode;
  className?: string;
}

export type CardHeaderProps = CardSectionOwnProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof CardSectionOwnProps>;

export type CardTitleProps = CardSectionOwnProps &
  Omit<HTMLAttributes<HTMLHeadingElement>, keyof CardSectionOwnProps>;

export type CardDescriptionProps = CardSectionOwnProps &
  Omit<HTMLAttributes<HTMLParagraphElement>, keyof CardSectionOwnProps>;

export type CardContentProps = CardSectionOwnProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof CardSectionOwnProps>;

export type CardFooterProps = CardSectionOwnProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof CardSectionOwnProps>;
