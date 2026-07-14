import type { HTMLAttributes, ReactNode, SyntheticEvent } from 'react';

export type AccordionHeadingComponent = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface AccordionOwnProps {
  children?: ReactNode;
  className?: string;
  defaultExpanded?: boolean;
  disabled?: boolean;
  expanded?: boolean;
  headingAs?: AccordionHeadingComponent;
  onChange?: (event: SyntheticEvent, expanded: boolean) => void;
  unmountOnExit?: boolean;
}

export type AccordionProps = AccordionOwnProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof AccordionOwnProps>;

export interface AccordionSummaryOwnProps {
  'aria-controls'?: string;
  children?: ReactNode;
  className?: string;
  expandIcon?: ReactNode;
  id?: string;
}

export type AccordionSummaryProps = AccordionSummaryOwnProps &
  Omit<HTMLAttributes<HTMLButtonElement>, keyof AccordionSummaryOwnProps | 'id'>;

export interface AccordionDetailsOwnProps {
  children?: ReactNode;
  className?: string;
}

export type AccordionDetailsProps = AccordionDetailsOwnProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof AccordionDetailsOwnProps>;

export interface AccordionActionsOwnProps {
  children?: ReactNode;
  className?: string;
  disableSpacing?: boolean;
}

export type AccordionActionsProps = AccordionActionsOwnProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof AccordionActionsOwnProps>;

export interface AccordionGroupOwnProps {
  children?: ReactNode;
  className?: string;
}

export type AccordionGroupProps = AccordionGroupOwnProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof AccordionGroupOwnProps>;

export type AccordionContextValue = {
  disabled: boolean;
  expanded: boolean;
  grouped: boolean;
  headerId: string;
  headingAs: AccordionHeadingComponent;
  regionId: string;
  toggle: (event: SyntheticEvent) => void;
  unmountOnExit: boolean;
};
