import { forwardRef, type Ref } from 'react';

import {
  CARD_CONTENT_CLASS,
  CARD_DESCRIPTION_CLASS,
  CARD_FOOTER_CLASS,
  CARD_HEADER_CLASS,
  getCardClassName,
  getCardSectionClassName,
  getCardTitleClassName,
} from './Card.styles';
import type {
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardTitleProps,
} from './Card.types';

export const Card = forwardRef<HTMLElement, CardProps>(function Card(props, ref) {
  const {
    children,
    className,
    variant,
    size,
    interactive,
    onClick,
    onKeyDown,
    tabIndex,
    role,
    ...cardProps
  } = props;

  const isActionable = Boolean(interactive && onClick);
  const cardClassName = getCardClassName({
    variant,
    size,
    interactive,
    actionable: isActionable,
    className,
  });

  if (isActionable) {
    return (
      <button
        type="button"
        {...cardProps}
        ref={ref as Ref<HTMLButtonElement>}
        className={cardClassName}
        onClick={onClick}
        onKeyDown={onKeyDown}
        tabIndex={tabIndex}
      >
        {children}
      </button>
    );
  }

  return (
    <div
      {...cardProps}
      ref={ref as Ref<HTMLDivElement>}
      role={role}
      tabIndex={tabIndex}
      className={cardClassName}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  function CardHeader(props, ref) {
    const { children, className, ...headerProps } = props;

    return (
      <div
        {...headerProps}
        ref={ref}
        className={getCardSectionClassName({ baseClass: CARD_HEADER_CLASS, className })}
      >
        {children}
      </div>
    );
  },
);

CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  function CardTitle(props, ref) {
    const { children, className, ...titleProps } = props;

    return (
      <h3 {...titleProps} ref={ref} className={getCardTitleClassName({ className })}>
        {children}
      </h3>
    );
  },
);

CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  function CardDescription(props, ref) {
    const { children, className, ...descriptionProps } = props;

    return (
      <p
        {...descriptionProps}
        ref={ref}
        className={getCardSectionClassName({ baseClass: CARD_DESCRIPTION_CLASS, className })}
      >
        {children}
      </p>
    );
  },
);

CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  function CardContent(props, ref) {
    const { children, className, ...contentProps } = props;

    return (
      <div
        {...contentProps}
        ref={ref}
        className={getCardSectionClassName({ baseClass: CARD_CONTENT_CLASS, className })}
      >
        {children}
      </div>
    );
  },
);

CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  function CardFooter(props, ref) {
    const { children, className, ...footerProps } = props;

    return (
      <div
        {...footerProps}
        ref={ref}
        className={getCardSectionClassName({ baseClass: CARD_FOOTER_CLASS, className })}
      >
        {children}
      </div>
    );
  },
);

CardFooter.displayName = 'CardFooter';
