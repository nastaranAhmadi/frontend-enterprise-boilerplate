import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';

import { routes } from '@/config/routes';
import { DashboardPage } from '@/features/dashboard/dashboard-page';
import { OrdersPage } from '@/features/orders/orders-page';
import { PlaceholderPage } from '@/features/placeholder/placeholder-page';
import { AppProviders } from '@/providers/app-providers';
import { AdminPageLayout } from '@/shell/admin-page-layout';
import { AdminShell } from '@/shell/admin-shell';

export const router = createBrowserRouter([
  {
    element: (
      <AppProviders>
        <Outlet />
      </AppProviders>
    ),
    children: [
      {
        element: <AdminShell />,
        children: [
          {
            element: <AdminPageLayout />,
            children: [
              {
                index: true,
                element: <DashboardPage />,
                handle: { titleKey: 'dashboard.title', subtitleKey: 'dashboard.subtitle' },
              },
              {
                path: routes.orders.slice(1),
                element: <OrdersPage />,
                handle: { titleKey: 'orders.title', subtitleKey: 'orders.subtitle' },
              },
              {
                path: routes.tables.slice(1),
                element: <PlaceholderPage />,
                handle: { titleKey: 'nav.tables' },
              },
              {
                path: routes.kitchen.slice(1),
                element: <PlaceholderPage />,
                handle: { titleKey: 'nav.kitchen' },
              },
              {
                path: routes.menus.slice(1),
                element: <PlaceholderPage />,
                handle: { titleKey: 'nav.menus' },
              },
              {
                path: routes.analytics.slice(1),
                element: <PlaceholderPage />,
                handle: { titleKey: 'nav.analytics' },
              },
              {
                path: routes.settings.slice(1),
                element: <PlaceholderPage />,
                handle: { titleKey: 'nav.settings' },
              },
            ],
          },
          {
            path: '*',
            element: <Navigate to={routes.dashboard} replace />,
          },
        ],
      },
    ],
  },
]);
