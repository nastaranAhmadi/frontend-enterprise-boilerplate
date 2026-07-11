import {
  Children,
  cloneElement,
  createContext,
  type CSSProperties,
  forwardRef,
  isValidElement,
  type ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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

const num = (value: number): string => String(value);
const percent = (value: number): string => `${num(value)}%`;
const pixels = (value: number): string => `${num(value)}px`;

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
    index,
    defaultIndex,
    onIndexChange,
    'aria-label': ariaLabel = 'Carousel',
    ...carouselProps
  } = props;

  const slides = Children.toArray(children).filter(
    isValidElement,
  ) as ReactElement<CarouselSlideProps>[];
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

    const offsetPercent = (100 / perView) * currentIndex;
    const gap = spaceBetween;

    if (vertical) {
      return {
        transform: `translateY(-${percent(offsetPercent)})`,
        gap,
        height: percent((slideCount * 100) / perView),
      };
    }

    const direction = rtl ? 1 : -1;
    return {
      transform: `translateX(${percent(direction * offsetPercent)})`,
      gap,
      width: percent((slideCount * 100) / perView),
    };
  }, [currentIndex, effect, perView, rtl, slideCount, spaceBetween, vertical]);

  const slideBasis = percent(100 / perView);
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
      <div className={getCarouselViewportClassName({ vertical, effect })}>
        <CarouselContext.Provider value={{ effect, slideClassName }}>
          <div className={getCarouselTrackClassName({ vertical, effect })} style={trackStyle}>
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
