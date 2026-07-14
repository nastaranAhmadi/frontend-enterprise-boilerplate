import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';

import { Loading } from './Loading';

describe('Loading', () => {
  it('renders with status semantics', () => {
    render(<Loading label="Fetching data" />);
    expect(screen.getByRole('status', { name: 'Fetching data' })).toBeInTheDocument();
  });

  it('defaults to dots-3 variant', () => {
    const { container } = render(<Loading />);
    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThanOrEqual(3);
  });

  it('renders all supported variants', () => {
    const variants = [
      'dots-3',
      'dot-bounce',
      'dots-5',
      'typing',
      'dot-matrix',
      'dots-bounce',
      'circular',
      'grid',
    ] as const;

    variants.forEach((variant) => {
      const { unmount } = render(<Loading variant={variant} label={`${variant} loading`} />);
      expect(screen.getByRole('status', { name: `${variant} loading` })).toBeInTheDocument();
      unmount();
    });
  });

  it('forwards ref to the root element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Loading ref={ref} variant="grid" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
