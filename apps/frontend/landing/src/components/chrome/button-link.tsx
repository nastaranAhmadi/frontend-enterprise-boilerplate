import Link from 'next/link';
import type { ComponentProps } from 'react';

type ButtonLinkVariant = 'filled' | 'outlined' | 'ghost';

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, 'className'> & {
  variant?: ButtonLinkVariant;
  className?: string;
};

const variantClassNames: Record<ButtonLinkVariant, string> = {
  filled: 'bg-primary text-background hover:bg-muted',
  outlined: 'border border-border bg-background text-foreground hover:bg-muted',
  ghost: 'bg-transparent text-foreground hover:bg-muted',
};

const baseClassName =
  'inline-flex items-center justify-center rounded-md px-md py-sm text-md font-sans transition-colors duration-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

export const ButtonLink = ({
  variant = 'filled',
  className,
  children,
  ...linkProps
}: ButtonLinkProps) => (
  <Link
    {...linkProps}
    className={[baseClassName, variantClassNames[variant], className].filter(Boolean).join(' ')}
  >
    {children}
  </Link>
);
