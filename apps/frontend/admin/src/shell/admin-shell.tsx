import { Button } from '@enterprise/ui/button';
import { Menu } from 'lucide-react';
import { Outlet } from 'react-router-dom';

import { appName } from '@/config/site';
import { useT } from '@/lib/i18n/use-t';
import { useSidebarPreference } from '@/lib/sidebar/sidebar-preference-context';
import { AdminSidebar } from '@/shell/admin-sidebar';

export const AdminShell = () => {
  const t = useT();
  const { mobileOpen, toggleMobileOpen, closeMobile } = useSidebarPreference();

  return (
    <div className="admin-shell flex h-dvh overflow-hidden bg-background">
      {mobileOpen ? (
        <button
          type="button"
          aria-label={t('shell.closeSidebar')}
          className="fixed inset-0 z-[calc(var(--z-modal)-1)] bg-overlay lg:hidden"
          onClick={closeMobile}
        />
      ) : null}

      <AdminSidebar onNavigate={closeMobile} />

      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col bg-background">
        <div className="flex items-center gap-sm border-b border-border px-md py-sm lg:hidden">
          <Button
            type="button"
            variant="ghost"
            size="small"
            aria-label={t('shell.openSidebar')}
            aria-expanded={mobileOpen}
            className="h-9 w-9 px-0"
            startIcon={<Menu aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />}
            onClick={toggleMobileOpen}
          />
          <span className="truncate text-sm font-semibold text-foreground">{appName}</span>
        </div>

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:start-md focus:top-md focus:z-toast focus:rounded-md focus:bg-background focus:px-md focus:py-sm"
        >
          {t('common.skipToContent')}
        </a>
        <main
          id="main-content"
          className="relative z-[1] flex min-h-0 flex-1 flex-col overflow-auto"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};
