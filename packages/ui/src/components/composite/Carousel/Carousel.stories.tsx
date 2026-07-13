import type { ComponentProps, ReactElement } from 'react';

import { Card, CardContent, CardTitle } from '../Card';
import { Carousel, CarouselSlide } from './Carousel';

const meta = {
  title: 'Composite/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Composable carousel with navigation, pagination, vertical layout, cards effect, and RTL support.',
      },
    },
  },
  argTypes: {
    effect: {
      control: 'select',
      options: ['slide', 'fade', 'cards'],
    },
    pagination: {
      control: 'select',
      options: [false, true, 'bullets', 'fraction'],
    },
    navigation: { control: 'boolean' },
    vertical: { control: 'boolean' },
    rtl: { control: 'boolean' },
    loop: { control: 'boolean' },
    autoPlay: { control: 'boolean' },
    draggable: { control: 'boolean' },
    slidesPerView: { control: { type: 'number', min: 1, max: 3, step: 1 } },
    spaceBetween: { control: { type: 'number', min: 0, max: 32, step: 4 } },
    className: { control: false },
    slideClassName: { control: false },
  },
  args: {
    navigation: true,
    pagination: 'bullets',
    effect: 'slide',
    vertical: false,
    rtl: false,
    loop: false,
    autoPlay: false,
    slidesPerView: 1,
    spaceBetween: 0,
    'aria-label': 'Featured carousel',
  },
  decorators: [
    (Story: () => ReactElement) => (
      <div style={{ width: 420 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type CarouselStory = {
  args?: Partial<ComponentProps<typeof Carousel>>;
  render?: (args: ComponentProps<typeof Carousel>) => ReactElement;
};

const SlideCard = ({ title, body }: { title: string; body: string }) => (
  <Card variant="elevated" size="small">
    <CardTitle>{title}</CardTitle>
    <CardContent>{body}</CardContent>
  </Card>
);

const basicSlides = [
  <CarouselSlide key="design">
    <SlideCard title="Design systems" body="Reusable primitives and patterns." />
  </CarouselSlide>,
  <CarouselSlide key="accessibility">
    <SlideCard title="Accessibility" body="Keyboard and screen reader support." />
  </CarouselSlide>,
  <CarouselSlide key="rtl">
    <SlideCard title="RTL ready" body="Logical layout for mirrored locales." />
  </CarouselSlide>,
];

export const Playground: CarouselStory = {
  render: (args) => <Carousel {...args}>{basicSlides}</Carousel>,
};

export const NavigationAndPagination: CarouselStory = {
  args: {
    navigation: true,
    pagination: 'bullets',
  },
  render: (args) => <Carousel {...args}>{basicSlides}</Carousel>,
};

export const Vertical: CarouselStory = {
  args: {
    vertical: true,
    navigation: true,
    pagination: 'fraction',
  },
  render: (args) => <Carousel {...args}>{basicSlides}</Carousel>,
};

export const CardsEffect: CarouselStory = {
  args: {
    effect: 'cards',
    navigation: true,
    pagination: 'bullets',
  },
  render: (args) => <Carousel {...args}>{basicSlides}</Carousel>,
};

export const Rtl: CarouselStory = {
  args: {
    rtl: true,
    navigation: true,
    pagination: 'bullets',
  },
  render: (args) => (
    <div dir="rtl" lang="fa">
      <Carousel {...args} aria-label="اسلایدر ویژه">
        <CarouselSlide>
          <SlideCard title="طراحی" body="اجزای قابل استفاده مجدد." />
        </CarouselSlide>
        <CarouselSlide>
          <SlideCard title="دسترس‌پذیری" body="پشتیبانی از صفحه‌کلید و خوانشگر صفحه." />
        </CarouselSlide>
        <CarouselSlide>
          <SlideCard title="راست‌به‌چپ" body="چیدمان منطقی برای زبان‌های RTL." />
        </CarouselSlide>
      </Carousel>
    </div>
  ),
};

export const SlideableMenu: CarouselStory = {
  args: {
    navigation: false,
    pagination: false,
    draggable: true,
    slidesPerView: 3,
    spaceBetween: 8,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows three category chips at a time. Drag or swipe horizontally to reveal the rest — no arrows or dots needed.',
      },
    },
  },
  render: (args) => (
    <Carousel {...args} aria-label="Category menu">
      {['All', 'Design', 'Engineering', 'Marketing', 'Sales', 'Support'].map((item) => (
        <CarouselSlide key={item}>
          <button
            type="button"
            style={{
              width: '100%',
              borderRadius: 999,
              border: '1px solid var(--color-border)',
              padding: '8px 12px',
              background: 'var(--color-background)',
            }}
          >
            {item}
          </button>
        </CarouselSlide>
      ))}
    </Carousel>
  ),
};
