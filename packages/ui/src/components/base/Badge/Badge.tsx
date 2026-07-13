import { Children, forwardRef, isValidElement } from 'react';

import { getBadgeChildAccessibilityProps } from './Badge.a11y';
import {
  formatBadgeContent,
  getBadgeChildClassName,
  getBadgeIndicatorClassName,
  getBadgeRootClassName,
  isBadgeVisible,
} from './Badge.styles';
import type { BadgeProps } from './Badge.types';

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(props, ref) {
  const {
    anchorOrigin,
    badgeAriaLabel,
    badgeClassName,
    badgeContent,
    children,
    className,
    color = 'primary',
    invisible = false,
    max = 99,
    overlap = 'rectangular',
    showZero = false,
    variant = 'standard',
    ...badgeProps
  } = props;

  const visible = isBadgeVisible({ badgeContent, variant, showZero, invisible });
  const displayContent = variant === 'dot' ? null : formatBadgeContent(badgeContent, max);
  const child = Children.only(children);

  if (!isValidElement(child)) {
    throw new Error('Badge expects a single valid React element child.');
  }

  const childAccessibilityProps = getBadgeChildAccessibilityProps({
    badgeAriaLabel,
    badgeContent,
    child,
    max,
    showZero,
    variant,
    visible,
  });

  return (
    <span {...badgeProps} ref={ref} className={getBadgeRootClassName({ className })}>
      <span className={getBadgeChildClassName()} {...childAccessibilityProps}>
        {child}
      </span>
      {visible ? (
        <span
          aria-hidden="true"
          className={getBadgeIndicatorClassName({
            color,
            variant,
            overlap,
            anchorOrigin,
            className: badgeClassName,
          })}
        >
          {displayContent}
        </span>
      ) : null}
    </span>
  );
});

Badge.displayName = 'Badge';
