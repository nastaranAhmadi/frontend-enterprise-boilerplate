import { Card, CardContent, CardFooter, Tabs } from '@enterprise/ui';
import { Button } from '@enterprise/ui/button';
import { ChevronRight, LayoutGrid, List } from 'lucide-react';
import { useMemo, useState } from 'react';

import { useT } from '@/lib/i18n/use-t';
import { useAdminPageToolbar } from '@/shell/admin-page-layout-context';

type OrderCard = {
  id: string;
  table: number;
  date: string;
  time: string;
  total: string;
};

const sampleOrders: OrderCard[] = [
  { id: '#20251011064916', table: 12, date: 'Oct 11, 2025', time: '06:49 AM', total: '$ 43.00' },
  { id: '#20251011064917', table: 4, date: 'Oct 11, 2025', time: '06:52 AM', total: '$ 28.50' },
  { id: '#20251011064918', table: 8, date: 'Oct 11, 2025', time: '06:55 AM', total: '$ 61.00' },
  { id: '#20251011064919', table: 2, date: 'Oct 11, 2025', time: '07:01 AM', total: '$ 19.75' },
];

const statCards = [
  { key: 'orders.totalOrders', value: '24', accent: 'primary' as const },
  { key: 'orders.pending', value: '8', accent: 'warning' as const },
  { key: 'orders.preparing', value: '5', accent: 'info' as const },
  { key: 'orders.served', value: '4', accent: 'success' as const },
  { key: 'orders.completed', value: '6', accent: 'muted' as const },
  { key: 'orders.cancelled', value: '1', accent: 'error' as const },
];

const tabKeys = [
  'orders.tabAll',
  'orders.pending',
  'orders.preparing',
  'orders.served',
  'orders.completed',
  'orders.cancelled',
] as const;

export const OrdersPage = () => {
  const t = useT();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTab, setSelectedTab] = useState<string>(tabKeys[1]);

  const toolbar = useMemo(
    () => (
      <div className="flex items-center gap-xs">
        <Button
          type="button"
          variant={viewMode === 'grid' ? 'filled' : 'outlined'}
          color="primary"
          size="small"
          aria-label="Grid view"
          aria-pressed={viewMode === 'grid'}
          className="h-10 w-10 px-0"
          startIcon={<LayoutGrid aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />}
          onClick={() => {
            setViewMode('grid');
          }}
        />
        <Button
          type="button"
          variant={viewMode === 'list' ? 'filled' : 'outlined'}
          color="primary"
          size="small"
          aria-label="List view"
          aria-pressed={viewMode === 'list'}
          className="h-10 w-10 px-0"
          startIcon={<List aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />}
          onClick={() => {
            setViewMode('list');
          }}
        />
      </div>
    ),
    [viewMode],
  );

  useAdminPageToolbar(toolbar);

  return (
    <div className="flex flex-1 flex-col gap-md p-md sm:gap-lg sm:p-lg lg:p-xl">
      <div className="grid grid-cols-2 gap-sm sm:gap-md md:grid-cols-3 xl:grid-cols-6">
        {statCards.map((card, index) => {
          const isPrimary = index === 0;
          const valueColor =
            card.accent === 'primary'
              ? 'text-primary-foreground'
              : card.accent === 'warning'
                ? 'text-warning'
                : card.accent === 'info'
                  ? 'text-info'
                  : card.accent === 'success'
                    ? 'text-success'
                    : card.accent === 'error'
                      ? 'text-error'
                      : 'text-foreground';

          return (
            <Card
              key={card.key}
              variant="outlined"
              className={isPrimary ? 'border-0 bg-primary shadow-sm' : 'shadow-sm'}
            >
              <CardContent className="p-md sm:p-lg">
                <p
                  className={[
                    'text-sm font-medium',
                    isPrimary ? 'text-primary-foreground/90' : 'text-muted-foreground',
                  ].join(' ')}
                >
                  {t(card.key)}
                </p>
                <p
                  className={['mt-sm text-3xl font-semibold tracking-tight', valueColor].join(' ')}
                >
                  {card.value}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="-mx-md overflow-x-auto px-md sm:mx-0 sm:px-0">
        <Tabs
          selectedKey={selectedTab}
          onSelectionChange={setSelectedTab}
          className="min-w-max sm:min-w-0"
        >
          <Tabs.List variant="underline" size="small" className="flex-nowrap">
            {tabKeys.map((tabKey) => (
              <Tabs.Item key={tabKey} id={tabKey}>
                {t(tabKey)}
              </Tabs.Item>
            ))}
          </Tabs.List>
        </Tabs>
      </div>

      <div className={viewMode === 'grid' ? 'grid gap-md md:grid-cols-2' : 'flex flex-col gap-md'}>
        {sampleOrders.map((order) => (
          <Card key={order.id} variant="outlined" className="transition-shadow hover:shadow-md">
            <CardContent className="p-md sm:p-lg">
              <div className="flex items-start justify-between gap-md">
                <div>
                  <p className="text-xs text-muted-foreground">{order.id}</p>
                  <p className="mt-xs text-lg font-semibold text-foreground">
                    {t('orders.tableLabel')} {order.table}
                  </p>
                </div>
                <p className="text-xl font-semibold text-foreground">{order.total}</p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-sm px-md pb-md pt-0 sm:flex-row sm:items-center sm:justify-between sm:gap-md sm:px-lg sm:pb-lg">
              <p className="text-sm text-muted-foreground">
                {order.date} · {order.time}
              </p>
              <Button
                type="button"
                variant="link"
                color="primary"
                size="small"
                endIcon={<ChevronRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />}
              >
                {t('common.viewDetails')}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
