import {
  Children,
  cloneElement,
  createContext,
  type CSSProperties,
  forwardRef,
  Fragment,
  isValidElement,
  type PointerEvent,
  type ReactElement,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Button } from '../../base/Button';
import {
  CAROUSEL_FRACTION_CLASS,
  CAROUSEL_NAVIGATION_CLASS,
  CAROUSEL_NAVIGATION_NEXT_CLASS,
  CAROUSEL_NAVIGATION_PREV_CLASS,
  CAROUSEL_NAVIGATION_VERTICAL_NEXT_CLASS,
  CAROUSEL_NAVIGATION_VERTICAL_PREV_CLASS,
  CAROUSEL_PAGINATION_CLASS,
  getCarouselBulletClassName,
  getCarouselRootClassName,
  getCarouselSlideClassName,
  getCarouselTrackClassName,
  getCarouselViewportClassName,
} from './Carousel.styles';
import type { CarouselProps, CarouselSlideProps } from './Carousel.types';

interface CarouselContextValue {
  effect?: CarouselProps['effect'];
  slideClassName?: string;
}

const CarouselContext = createContext<CarouselContextValue | null>(null);

const useCarouselContext = (): CarouselContextValue => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('CarouselSlide must be used within Carousel.');
  }
  return context;
};

const useControllableIndex = ({
  index,
  defaultIndex,
  onIndexChange,
}: Pick<CarouselProps, 'index' | 'defaultIndex' | 'onIndexChange'>) => {
  const [uncontrolledIndex, setUncontrolledIndex] = useState(defaultIndex ?? 0);
  const isControlled = index !== undefined;
  const activeIndex = isControlled ? index : uncontrolledIndex;

  const setActiveIndex = useCallback(
    (nextIndex: number) => {
      if (!isControlled) {
        setUncontrolledIndex(nextIndex);
      }
      onIndexChange?.(nextIndex);
    },
    [isControlled, onIndexChange],
  );

  return { activeIndex, setActiveIndex };
};

const normalizeSlidesPerView = (slidesPerView: number | undefined): number => {
  if (!slidesPerView || slidesPerView < 1) return 1;
  return slidesPerView;
};

const getWrappedIndex = (index: number, count: number, loop: boolean): number => {
  if (count === 0) return 0;
  if (!loop) {
    return Math.min(Math.max(index, 0), count - 1);
  }
  return ((index % count) + count) % count;
};

const collectSlides = (children: ReactNode): ReactElement<CarouselSlideProps>[] => {
  const slides: ReactElement<CarouselSlideProps>[] = [];

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;

    if (child.type === Fragment) {
      const fragmentChildren = (child.props as { children?: ReactNode }).children;
      slides.push(...collectSlides(fragmentChildren));
      return;
    }

    slides.push(child as ReactElement<CarouselSlideProps>);
  });

  return slides;
};

const num = (value: number): string => String(value);
const percent = (value: number): string => `${num(value)}%`;
const pixels = (value: number): string => `${num(value)}px`;

const DRAG_THRESHOLD_PX = 48;
const DRAG_EDGE_RESISTANCE = 0.35;

interface DragState {
  pointerId: number;
  startX: number;
  startY: number;
}

export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(function Carousel(props, ref) {
  const {
    children,
    className,
    slideClassName,
    navigation = false,
    pagination = false,
    vertical = false,
    rtl = false,
    effect = 'slide',
    loop = false,
    slidesPerView = 1,
    spaceBetween = 0,
    autoPlay = false,
    autoPlayInterval = 4000,
    draggable = false,
    index,
    defaultIndex,
    onIndexChange,
    'aria-label': ariaLabel = 'Carousel',
    ...carouselProps
  } = props;

  const slides = collectSlides(children);
  const slideCount = slides.length;
  const perView = normalizeSlidesPerView(slidesPerView);
  const maxIndex = Math.max(slideCount - perView, 0);
  const pageCount = maxIndex + 1;
  const { activeIndex, setActiveIndex } = useControllableIndex({
    index,
    defaultIndex,
    onIndexChange,
  });
  const currentIndex = getWrappedIndex(activeIndex, pageCount, loop);
  const canGoPrev = loop || currentIndex > 0;
  const canGoNext = loop || currentIndex < maxIndex;

  const goTo = useCallback(
    (nextIndex: number) => {
      setActiveIndex(getWrappedIndex(nextIndex, pageCount, loop));
    },
    [loop, pageCount, setActiveIndex],
  );

  const goNext = useCallback(() => {
    goTo(currentIndex + 1);
  }, [currentIndex, goTo]);
  const goPrev = useCallback(() => {
    goTo(currentIndex - 1);
  }, [currentIndex, goTo]);

  const dragStateRef = useRef<DragState | null>(null);
  const [dragDelta, setDragDelta] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const isSlideDraggable = draggable && effect === 'slide';

  const getOrientedDragDelta = useCallback(
    (clientX: number, clientY: number): number => {
      const dragState = dragStateRef.current;
      if (!dragState) return 0;

      const delta = vertical ? clientY - dragState.startY : clientX - dragState.startX;
      return rtl && !vertical ? -delta : delta;
    },
    [rtl, vertical],
  );

  const applyDragResistance = useCallback(
    (delta: number): number => {
      if (loop) return delta;
      if (currentIndex <= 0 && delta > 0) return delta * DRAG_EDGE_RESISTANCE;
      if (currentIndex >= maxIndex && delta < 0) return delta * DRAG_EDGE_RESISTANCE;
      return delta;
    },
    [currentIndex, loop, maxIndex],
  );

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!isSlideDraggable) return;

      dragStateRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
      };
      setIsDragging(true);
      setDragDelta(0);
      if (typeof event.currentTarget.setPointerCapture === 'function') {
        event.currentTarget.setPointerCapture(event.pointerId);
      }
    },
    [isSlideDraggable],
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!dragStateRef.current || dragStateRef.current.pointerId !== event.pointerId) return;
      setDragDelta(applyDragResistance(getOrientedDragDelta(event.clientX, event.clientY)));
    },
    [applyDragResistance, getOrientedDragDelta],
  );

  const finishDrag = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!dragStateRef.current || dragStateRef.current.pointerId !== event.pointerId) return;

      const orientedDelta = getOrientedDragDelta(event.clientX, event.clientY);

      if (orientedDelta <= -DRAG_THRESHOLD_PX && canGoNext) {
        goNext();
      } else if (orientedDelta >= DRAG_THRESHOLD_PX && canGoPrev) {
        goPrev();
      }

      dragStateRef.current = null;
      setIsDragging(false);
      setDragDelta(0);

      const target = event.currentTarget;
      if (
        typeof target.hasPointerCapture === 'function' &&
        target.hasPointerCapture(event.pointerId)
      ) {
        target.releasePointerCapture(event.pointerId);
      }
    },
    [canGoNext, canGoPrev, getOrientedDragDelta, goNext, goPrev],
  );

  useEffect(() => {
    if (!autoPlay || slideCount <= 1) return;

    const timer = window.setInterval(() => {
      goNext();
    }, autoPlayInterval);

    return () => {
      window.clearInterval(timer);
    };
  }, [autoPlay, autoPlayInterval, goNext, slideCount]);

  const trackStyle = useMemo((): CSSProperties => {
    if (effect !== 'slide') return {};

    const offsetPercent = slideCount > 0 ? (100 * currentIndex) / slideCount : 0;
    const gap = spaceBetween;

    if (vertical) {
      return {
        transform: `translateY(calc(-${percent(offsetPercent)} + ${pixels(dragDelta)}))`,
        gap,
        height: percent((slideCount * 100) / perView),
      };
    }

    const direction = rtl ? 1 : -1;
    return {
      transform: `translateX(calc(${percent(direction * offsetPercent)} + ${pixels(dragDelta)}))`,
      gap,
      width: percent((slideCount * 100) / perView),
    };
  }, [currentIndex, dragDelta, effect, perView, rtl, slideCount, spaceBetween, vertical]);

  const slideBasis = slideCount > 0 ? percent(100 / slideCount) : '100%';
  const paginationType = pagination === true ? 'bullets' : pagination;

  return (
    <div
      {...carouselProps}
      ref={ref}
      dir={rtl ? 'rtl' : carouselProps.dir}
      className={getCarouselRootClassName({ className })}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      aria-live={autoPlay ? 'polite' : undefined}
    >
      <div
        className={getCarouselViewportClassName({ vertical, effect, draggable: isSlideDraggable })}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
      >
        <CarouselContext.Provider value={{ effect, slideClassName }}>
          <div
            className={getCarouselTrackClassName({ vertical, effect, dragging: isDragging })}
            style={trackStyle}
          >
            {slides.map((slide, slideIndex) => {
              const isActive = slideIndex === currentIndex;
              const distance = Math.abs(slideIndex - currentIndex);

              const slideStyle: CSSProperties =
                effect === 'slide'
                  ? {
                      flexBasis: slideBasis,
                      width: vertical ? '100%' : slideBasis,
                      height: vertical ? slideBasis : '100%',
                    }
                  : effect === 'fade'
                    ? {
                        opacity: isActive ? 1 : 0,
                        pointerEvents: isActive ? 'auto' : 'none',
                        zIndex: isActive ? 1 : 0,
                      }
                    : {
                        opacity: distance > 1 ? 0 : 1,
                        transform: `scale(${num(isActive ? 1 : 0.92)}) translateY(${pixels(distance * 8)})`,
                        zIndex: slideCount - distance,
                      };

              return cloneElement(slide, {
                key: slide.key ?? slideIndex,
                'aria-label': `Slide ${num(slideIndex + 1)} of ${num(slideCount)}`,
                style: { ...slideStyle, ...slide.props.style },
                'aria-hidden': effect !== 'slide' ? !isActive : undefined,
              });
            })}
          </div>
        </CarouselContext.Provider>
      </div>

      {navigation ? (
        <>
          <div
            className={`${CAROUSEL_NAVIGATION_CLASS} ${
              vertical ? CAROUSEL_NAVIGATION_VERTICAL_PREV_CLASS : CAROUSEL_NAVIGATION_PREV_CLASS
            }`}
          >
            <Button
              type="button"
              size="small"
              variant="outlined"
              aria-label="Previous slide"
              disabled={!canGoPrev}
              onClick={goPrev}
            >
              {vertical ? '↑' : rtl ? '›' : '‹'}
            </Button>
          </div>
          <div
            className={`${CAROUSEL_NAVIGATION_CLASS} ${
              vertical ? CAROUSEL_NAVIGATION_VERTICAL_NEXT_CLASS : CAROUSEL_NAVIGATION_NEXT_CLASS
            }`}
          >
            <Button
              type="button"
              size="small"
              variant="outlined"
              aria-label="Next slide"
              disabled={!canGoNext}
              onClick={goNext}
            >
              {vertical ? '↓' : rtl ? '‹' : '›'}
            </Button>
          </div>
        </>
      ) : null}

      {paginationType ? (
        <div className={CAROUSEL_PAGINATION_CLASS}>
          {paginationType === 'fraction' ? (
            <span className={CAROUSEL_FRACTION_CLASS}>
              {currentIndex + 1} / {pageCount}
            </span>
          ) : (
            Array.from({ length: pageCount }, (_, pageIndex) => (
              <button
                key={pageIndex}
                type="button"
                aria-label={`Go to slide ${num(pageIndex + 1)}`}
                aria-current={pageIndex === currentIndex ? 'true' : undefined}
                className={getCarouselBulletClassName({ active: pageIndex === currentIndex })}
                onClick={() => {
                  goTo(pageIndex);
                }}
              />
            ))
          )}
        </div>
      ) : null}
    </div>
  );
});

Carousel.displayName = 'Carousel';

export const CarouselSlide = forwardRef<HTMLDivElement, CarouselSlideProps>(
  function CarouselSlide(props, ref) {
    const { children, className, style, ...slideProps } = props;
    const { effect, slideClassName } = useCarouselContext();

    return (
      <div
        {...slideProps}
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={getCarouselSlideClassName({
          effect,
          className: joinSlideClassNames(slideClassName, className),
        })}
        style={style}
      >
        {children}
      </div>
    );
  },
);

CarouselSlide.displayName = 'CarouselSlide';

const joinSlideClassNames = (...classes: Array<string | undefined>): string =>
  classes.filter(Boolean).join(' ');
