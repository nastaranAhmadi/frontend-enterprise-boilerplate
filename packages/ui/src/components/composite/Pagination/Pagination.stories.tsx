import { type ComponentProps, type ReactElement, useState } from 'react';

import { Pagination } from './Pagination';

const meta = {
  title: 'Composite/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Controlled pagination with first/previous/next/last navigation, configurable page windows, and mirrored navigation icons when `dir="rtl"`. Out-of-range `page` values are synced back through `onPageChange`.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: { control: 'boolean' },
    showFirstLast: { control: 'boolean' },
    siblingCount: { control: { type: 'number', min: 0, max: 3, step: 1 } },
    boundaryCount: { control: { type: 'number', min: 0, max: 3, step: 1 } },
    className: { control: false },
    onPageChange: { control: false },
    renderPageLabel: { control: false },
  },
  args: {
    page: 1,
    totalPages: 10,
    disabled: false,
    showFirstLast: true,
    siblingCount: 1,
    boundaryCount: 1,
    size: 'medium',
  },
};

export default meta;

type PaginationStory = {
  args?: Partial<ComponentProps<typeof Pagination>>;
  render?: (args: ComponentProps<typeof Pagination>) => ReactElement;
  decorators?: Array<(Story: () => ReactElement) => ReactElement>;
  parameters?: Record<string, unknown>;
};

const PaginationDemo = (args: ComponentProps<typeof Pagination>) => {
  const [page, setPage] = useState(args.page);

  return <Pagination {...args} page={page} onPageChange={setPage} />;
};

export const Playground: PaginationStory = {
  render: (args) => <PaginationDemo {...args} />,
};

export const ManyPages: PaginationStory = {
  args: {
    totalPages: 20,
    page: 10,
  },
  render: (args) => <PaginationDemo {...args} />,
};

export const WithoutFirstLast: PaginationStory = {
  args: {
    showFirstLast: false,
    totalPages: 8,
    page: 4,
  },
  render: (args) => <PaginationDemo {...args} />,
};

export const Disabled: PaginationStory = {
  args: {
    disabled: true,
    page: 3,
    totalPages: 8,
  },
  render: (args) => <Pagination {...args} onPageChange={() => undefined} />,
};

export const Rtl: PaginationStory = {
  args: {
    totalPages: 12,
    page: 6,
    'aria-label': 'صفحه‌بندی',
  },
  render: (args) => <PaginationDemo {...args} />,
  parameters: {
    globals: {
      locale: 'fa-IR',
      direction: 'rtl',
    },
    docs: {
      description: {
        story:
          'Mirrored navigation icons under RTL. Locale and direction are set via Storybook globals.',
      },
    },
  },
};
