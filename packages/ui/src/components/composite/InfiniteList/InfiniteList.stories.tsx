import { type ComponentProps, type ReactElement, useCallback, useState } from 'react';

import { Button } from '../../base/Button';
import { Card, CardContent, CardTitle } from '../Card';
import { InfiniteList } from './InfiniteList';

const meta = {
  title: 'Composite/InfiniteList',
  component: InfiniteList,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Controlled infinite list that renders any item type via a render prop and delegates data loading to the parent. When `error` is set, existing items remain visible so consumers can show stale data with an inline error banner. `onLoadMore` is guarded against duplicate intersection events until `loading` becomes false again.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    loading: { control: 'boolean' },
    hasMore: { control: 'boolean' },
    loadMoreRootMargin: { control: 'text' },
    className: { control: false },
    itemClassName: { control: false },
    listClassName: { control: false },
    loader: { control: false },
    renderItem: { control: false },
    getItemKey: { control: false },
    onLoadMore: { control: false },
    onRetry: { control: false },
    items: { control: false },
  },
  args: {
    size: 'medium',
    loading: false,
    hasMore: true,
    emptyState: 'No items to display.',
    endMessage: 'You have reached the end.',
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

type InfiniteListStory = {
  args?: Partial<ComponentProps<typeof InfiniteList<string>>>;
  render?: (args: Partial<ComponentProps<typeof InfiniteList<string>>>) => ReactElement;
};

type DemoItem = {
  id: number;
  title: string;
  body: string;
};

const PAGE_SIZE = 4;
const ALL_ITEMS: DemoItem[] = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  title: `Item ${String(index + 1)}`,
  body: 'Reusable list item content.',
}));

const InfiniteListDemo = () => {
  const [items, setItems] = useState<DemoItem[]>(ALL_ITEMS.slice(0, PAGE_SIZE));
  const [loading, setLoading] = useState(false);
  const hasMore = items.length < ALL_ITEMS.length;

  const handleLoadMore = useCallback(() => {
    if (loading || !hasMore) return;
    setLoading(true);
    window.setTimeout(() => {
      setItems((current) => ALL_ITEMS.slice(0, current.length + PAGE_SIZE));
      setLoading(false);
    }, 600);
  }, [hasMore, loading]);

  return (
    <InfiniteList
      items={items}
      hasMore={hasMore}
      loading={loading}
      onLoadMore={handleLoadMore}
      getItemKey={(item) => item.id}
      aria-label="Demo items"
      renderItem={(item) => (
        <Card variant="outlined" size="small">
          <CardTitle>{item.title}</CardTitle>
          <CardContent>{item.body}</CardContent>
        </Card>
      )}
    />
  );
};

export const Playground: InfiniteListStory = {
  render: () => <InfiniteListDemo />,
};

export const Empty: InfiniteListStory = {
  render: (args) => (
    <InfiniteList {...args} items={[]} renderItem={(item: string) => <span>{item}</span>} />
  ),
};

export const ErrorState: InfiniteListStory = {
  render: (args) => (
    <InfiniteList
      {...args}
      items={[]}
      error="Failed to load items."
      onRetry={() => undefined}
      renderItem={(item: string) => <span>{item}</span>}
    />
  ),
};

export const EndOfList: InfiniteListStory = {
  render: (args) => (
    <InfiniteList
      {...args}
      items={ALL_ITEMS.slice(0, 4)}
      hasMore={false}
      renderItem={(item) => (
        <Card variant="outlined" size="small">
          <CardTitle>{item.title}</CardTitle>
          <CardContent>{item.body}</CardContent>
        </Card>
      )}
      getItemKey={(item) => item.id}
    />
  ),
};

const ManualRetryDemo = () => {
  const [failed, setFailed] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Button
        variant="outlined"
        onClick={() => {
          setFailed((value) => !value);
        }}
      >
        Toggle error
      </Button>
      <InfiniteList
        items={failed ? [] : ALL_ITEMS.slice(0, 3)}
        error={failed ? 'Network request failed.' : undefined}
        onRetry={() => {
          setFailed(false);
        }}
        hasMore={!failed}
        renderItem={(item) => (
          <Card size="small">
            <CardTitle>{item.title}</CardTitle>
          </Card>
        )}
        getItemKey={(item) => item.id}
      />
    </div>
  );
};

export const ManualRetry: InfiniteListStory = {
  render: () => <ManualRetryDemo />,
};
