import { isValidElement, type ReactElement, type ReactNode } from 'react';

import { formatBadgeContent } from './Badge.styles';
import type { BadgeProps, BadgeVariant } from './Badge.types';

const hasAccessibleName = (child: ReactElement): boolean => {
  const props = child.props as {
    'aria-label'?: string;
    'aria-labelledby'?: string;
  };

  return Boolean(props['aria-label'] || props['aria-labelledby']);
};

const isInteractiveChild = (child: ReactElement): boolean => {
  if (typeof child.type === 'string') {
    return ['a', 'button', 'input', 'select', 'textarea'].includes(child.type);
  }

  return false;
};

export const getBadgeChildAccessibilityProps = ({
  badgeAriaLabel,
  badgeContent,
  child,
  max,
  showZero,
  variant,
  visible,
}: {
  badgeAriaLabel?: BadgeProps['badgeAriaLabel'];
  badgeContent: BadgeProps['badgeContent'];
  child: ReactNode;
  max: number;
  showZero: boolean;
  variant: BadgeVariant;
  visible: boolean;
}): { 'aria-label'?: string; role?: 'img' } => {
  if (!visible || !isValidElement(child)) {
    return {};
  }

  if (hasAccessibleName(child)) {
    return {};
  }

  if (badgeAriaLabel) {
    return isInteractiveChild(child)
      ? { 'aria-label': badgeAriaLabel }
      : { role: 'img', 'aria-label': badgeAriaLabel };
  }

  if (variant === 'dot') {
    return {};
  }

  if (badgeContent === 0 && !showZero) {
    return {};
  }

  const displayContent = formatBadgeContent(badgeContent, max);
  if (typeof displayContent === 'number' || typeof displayContent === 'string') {
    return isInteractiveChild(child)
      ? { 'aria-label': String(displayContent) }
      : { role: 'img', 'aria-label': String(displayContent) };
  }

  return {};
};
