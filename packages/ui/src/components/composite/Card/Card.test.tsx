import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Card';

describe('Card', () => {
  it('renders card sections', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('forwards ref to the root element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Card ref={ref}>Card</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies variant and interactive classes', () => {
    const { container, rerender } = render(<Card variant="elevated">Card</Card>);
    expect(container.firstChild).toHaveClass('shadow-md');

    rerender(<Card interactive>Card</Card>);
    expect(container.firstChild).toHaveClass('cursor-pointer');
    expect(container.firstChild).not.toHaveAttribute('tabindex');

    rerender(
      <Card interactive onClick={() => undefined}>
        Card
      </Card>,
    );
    expect(screen.getByRole('button', { name: 'Card' })).toBeInstanceOf(HTMLButtonElement);
  });

  it('forwards ref to the button root when actionable', () => {
    const ref = createRef<HTMLElement>();
    render(
      <Card ref={ref} interactive onClick={() => undefined}>
        Card
      </Card>,
    );
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('applies className to the root', () => {
    const { container } = render(<Card className="custom-card">Card</Card>);
    expect(container.firstChild).toHaveClass('custom-card');
  });
});
