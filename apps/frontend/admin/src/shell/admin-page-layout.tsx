import { type ReactNode, useCallback, useMemo, useState } from 'react';
import { Outlet, useMatches } from 'react-router-dom';

import { getAdminRouteHandle } from '@/config/route-meta';
import { routes } from '@/config/routes';
import { useT } from '@/lib/i18n/use-t';
import { AdminHeader } from '@/shell/admin-header';
import { AdminPageLayoutProvider } from '@/shell/admin-page-layout-context';

export const AdminPageLayout = () => {
  const t = useT();
  const matches = useMatches();
  const [toolbar, setToolbar] = useState<ReactNode>(null);

  const handle = useMemo(() => getAdminRouteHandle(matches), [matches]);

  const onToolbarChange = useCallback((nextToolbar: ReactNode) => {
    setToolbar(nextToolbar);
  }, []);

  if (!handle) {
    return <Outlet />;
  }

  const title = t(handle.titleKey);
  const subtitle = handle.subtitleKey ? t(handle.subtitleKey) : undefined;

  return (
    <AdminPageLayoutProvider onToolbarChange={onToolbarChange}>
      <AdminHeader
        title={title}
        subtitle={subtitle}
        breadcrumbs={[{ label: t('shell.home'), href: routes.dashboard }, { label: title }]}
      >
        {toolbar}
      </AdminHeader>
      <Outlet />
    </AdminPageLayoutProvider>
  );
};
