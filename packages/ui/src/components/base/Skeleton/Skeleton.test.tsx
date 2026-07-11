import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';

import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders a decorative placeholder', () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  it('forwards ref to the native div element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Skeleton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('is hidden from assistive technologies by default', () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveAttribute('aria-hidden', 'true');
  });

  it('allows assistive technology labels when used as a loading indicator', () => {
    render(<Skeleton aria-hidden={false} aria-label="Loading content" data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveAttribute('aria-hidden', 'false');
    expect(screen.getByLabelText('Loading content')).toBeInTheDocument();
  });

  it('applies variant and size classes', () => {
    render(<Skeleton data-testid="skeleton" variant="circular" size="large" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('rounded-full', 'h-lg', 'w-lg');
  });

  it('removes pulse animation when animate is false', () => {
    render(<Skeleton animate={false} data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).not.toHaveClass('animate-pulse');
  });

  it('applies className', () => {
    render(<Skeleton className="custom-skeleton" data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveClass('custom-skeleton');
  });
});
