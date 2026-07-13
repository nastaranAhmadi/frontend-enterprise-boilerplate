import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type ComponentProps, createRef } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Carousel, CarouselSlide } from './Carousel';

const slides = ['One', 'Two', 'Three'];

const renderCarousel = (props: Partial<ComponentProps<typeof Carousel>> = {}) =>
  render(
    <Carousel navigation pagination {...props}>
      {slides.map((label) => (
        <CarouselSlide key={label}>
          <div>{label}</div>
        </CarouselSlide>
      ))}
    </Carousel>,
  );

describe('Carousel', () => {
  beforeEach(() => {
    class PolyfillPointerEvent extends MouseEvent {
      readonly pointerId: number;

      constructor(type: string, init: PointerEventInit = {}) {
        super(type, init);
        this.pointerId = init.pointerId ?? 0;
      }
    }

    vi.stubGlobal('PointerEvent', PolyfillPointerEvent);

    HTMLElement.prototype.setPointerCapture = vi.fn();
    HTMLElement.prototype.releasePointerCapture = vi.fn();
    HTMLElement.prototype.hasPointerCapture = vi.fn(() => true);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('renders slides inside a carousel region', () => {
    renderCarousel({ 'aria-label': 'Featured items' });
    expect(screen.getByRole('region', { name: 'Featured items' })).toBeInTheDocument();
    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();
  });

  it('navigates to the next slide', async () => {
    const user = userEvent.setup();
    renderCarousel();

    await user.click(screen.getByRole('button', { name: 'Next slide' }));
    expect(screen.getByRole('button', { name: 'Go to slide 2' })).toHaveAttribute(
      'aria-current',
      'true',
    );
  });

  it('supports controlled index changes', async () => {
    const user = userEvent.setup();
    const onIndexChange = vi.fn();

    render(
      <Carousel index={0} onIndexChange={onIndexChange} pagination>
        {slides.map((label) => (
          <CarouselSlide key={label}>{label}</CarouselSlide>
        ))}
      </Carousel>,
    );

    await user.click(screen.getByRole('button', { name: 'Go to slide 3' }));
    expect(onIndexChange).toHaveBeenCalledWith(2);
  });

  it('forwards ref to the root element', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Carousel ref={ref}>
        <CarouselSlide>Slide</CarouselSlide>
      </Carousel>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('disables navigation at boundaries when loop is false', async () => {
    const user = userEvent.setup();
    renderCarousel({ loop: false });

    expect(screen.getByRole('button', { name: 'Previous slide' })).toBeDisabled();

    await user.click(screen.getByRole('button', { name: 'Next slide' }));
    expect(screen.getByRole('button', { name: 'Go to slide 2' })).toHaveAttribute(
      'aria-current',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Previous slide' })).not.toBeDisabled();

    await user.click(screen.getByRole('button', { name: 'Next slide' }));
    await user.click(screen.getByRole('button', { name: 'Next slide' }));
    expect(screen.getByRole('button', { name: 'Go to slide 3' })).toHaveAttribute(
      'aria-current',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Next slide' })).toBeDisabled();
  });

  it('enables drag styling when draggable is true', () => {
    render(
      <Carousel draggable aria-label="Draggable menu">
        {slides.map((label) => (
          <CarouselSlide key={label}>{label}</CarouselSlide>
        ))}
      </Carousel>,
    );

    const viewport = screen.getByRole('region', { name: 'Draggable menu' }).firstElementChild;
    expect(viewport).toHaveClass('cursor-grab', 'touch-none');
  });

  it('advances to the next slide after a pointer drag', async () => {
    render(
      <Carousel draggable pagination aria-label="Draggable carousel">
        {slides.map((label) => (
          <CarouselSlide key={label}>{label}</CarouselSlide>
        ))}
      </Carousel>,
    );

    const viewport = screen.getByRole('region', { name: 'Draggable carousel' })
      .firstElementChild as HTMLElement;

    viewport.dispatchEvent(
      new PointerEvent('pointerdown', {
        bubbles: true,
        clientX: 200,
        clientY: 0,
        pointerId: 1,
        buttons: 1,
      }),
    );
    viewport.dispatchEvent(
      new PointerEvent('pointermove', {
        bubbles: true,
        clientX: 100,
        clientY: 0,
        pointerId: 1,
        buttons: 1,
      }),
    );
    viewport.dispatchEvent(
      new PointerEvent('pointerup', {
        bubbles: true,
        clientX: 100,
        clientY: 0,
        pointerId: 1,
        buttons: 0,
      }),
    );

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Go to slide 2' })).toHaveAttribute(
        'aria-current',
        'true',
      );
    });
  });
});
