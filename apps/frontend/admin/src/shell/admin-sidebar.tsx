import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  ChefHat,
  LayoutDashboard,
  MoreVertical,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  ShoppingBag,
  Store,
  Table2,
  UtensilsCrossed,
  X,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { type AdminRoutePath, routes } from '@/config/routes';
import { appName } from '@/config/site';
import { useT } from '@/lib/i18n/use-t';
import { useSidebarPreference } from '@/lib/sidebar/sidebar-preference-context';

type NavItem = {
  to: AdminRoutePath;
  labelKey:
    | 'nav.dashboard'
    | 'nav.orders'
    | 'nav.tables'
    | 'nav.kitchen'
    | 'nav.menus'
    | 'nav.analytics'
    | 'nav.settings';
  icon: LucideIcon;
};

const menuItems: NavItem[] = [
  { to: routes.dashboard, labelKey: 'nav.dashboard', icon: LayoutDashboard },
  { to: routes.orders, labelKey: 'nav.orders', icon: ShoppingBag },
  { to: routes.tables, labelKey: 'nav.tables', icon: Table2 },
  { to: routes.kitchen, labelKey: 'nav.kitchen', icon: ChefHat },
  { to: routes.menus, labelKey: 'nav.menus', icon: UtensilsCrossed },
  { to: routes.analytics, labelKey: 'nav.analytics', icon: BarChart3 },
];

const otherItems: NavItem[] = [{ to: routes.settings, labelKey: 'nav.settings', icon: Settings }];

type NavLinkItemProps = {
  item: NavItem;
  collapsed: boolean;
  onNavigate?: () => void;
};

const NavLinkItem = ({ item, collapsed, onNavigate }: NavLinkItemProps) => {
  const t = useT();
  const label = t(item.labelKey);

  return (
    <li>
      <NavLink
        to={item.to}
        end={item.to === routes.dashboard}
        aria-label={label}
        title={collapsed ? label : undefined}
        onClick={onNavigate}
        className={({ isActive }) =>
          [
            'group relative flex items-center rounded-md text-sm transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            collapsed ? 'justify-center px-sm py-sm' : 'gap-sm px-sm py-sm',
            isActive
              ? 'bg-primary/10 font-medium text-primary'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground',
          ].join(' ')
        }
      >
        <item.icon className="h-[1.125rem] w-[1.125rem] shrink-0" strokeWidth={1.75} />
        {!collapsed ? <span className="min-w-0 flex-1 truncate">{label}</span> : null}
        {collapsed ? (
          <span aria-hidden="true" className="admin-nav-flyout">
            {label}
          </span>
        ) : null}
      </NavLink>
    </li>
  );
};

type AdminSidebarProps = {
  onNavigate?: () => void;
};

export const AdminSidebar = ({ onNavigate }: AdminSidebarProps) => {
  const t = useT();
  const { collapsed, mobileOpen, toggleCollapsed } = useSidebarPreference();
  const isDrawerCollapsed = collapsed && !mobileOpen;

  return (
    <aside
      data-collapsed={isDrawerCollapsed ? 'true' : 'false'}
      data-mobile-open={mobileOpen ? 'true' : 'false'}
      className={[
        'admin-sidebar fixed inset-y-0 start-0 z-modal flex h-dvh w-[min(16rem,85vw)] flex-col border-e border-border py-md transition-transform duration-200 lg:static lg:z-auto lg:h-full lg:min-h-0 lg:shrink-0 lg:translate-x-0 lg:transition-[width]',
        mobileOpen ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full',
        isDrawerCollapsed ? 'lg:w-[4.75rem] lg:px-sm' : 'lg:w-[16rem] lg:px-md',
        'px-md',
      ].join(' ')}
    >
      <div className="relative z-[1] flex items-center gap-sm">
        <span
          aria-hidden="true"
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground"
        >
          D
        </span>
        {!isDrawerCollapsed ? (
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-foreground">{appName}</span>
            <span className="block truncate text-xs text-muted-foreground">
              {t('shell.tagline')}
            </span>
          </span>
        ) : null}
        <button
          type="button"
          onClick={() => {
            onNavigate?.();
          }}
          aria-label={t('shell.closeSidebar')}
          className="ms-auto inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
        >
          <X aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
        </button>
        <button
          type="button"
          onClick={toggleCollapsed}
          aria-label={collapsed ? t('shell.expandSidebar') : t('shell.collapseSidebar')}
          aria-expanded={!collapsed}
          className={[
            'hidden h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:inline-flex',
            isDrawerCollapsed ? '' : 'ms-auto',
          ].join(' ')}
        >
          {collapsed ? (
            <PanelLeftOpen aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
          ) : (
            <PanelLeftClose aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
          )}
        </button>
      </div>

      <button
        type="button"
        aria-label={t('shell.storeManagement')}
        title={isDrawerCollapsed ? t('shell.storeName') : undefined}
        className={[
          'admin-store-card relative z-[1] mt-md flex w-full items-center rounded-lg border border-border text-start transition-colors hover:bg-muted/50',
          isDrawerCollapsed ? 'justify-center p-sm' : 'gap-sm p-sm',
        ].join(' ')}
      >
        <Store className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={1.75} />
        {!isDrawerCollapsed ? (
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium text-foreground">
              {t('shell.storeName')}
            </span>
            <span className="block truncate text-xs text-muted-foreground">
              {t('shell.storeManagement')}
            </span>
          </span>
        ) : (
          <span aria-hidden="true" className="admin-nav-flyout">
            {t('shell.storeName')}
          </span>
        )}
      </button>

      <nav
        aria-label={t('shell.menuSection')}
        className={[
          'relative z-[1] mt-lg flex flex-1 flex-col gap-lg overflow-y-auto',
          isDrawerCollapsed ? 'overflow-visible lg:overflow-y-auto' : '',
        ].join(' ')}
      >
        <div>
          {!isDrawerCollapsed ? (
            <p className="admin-nav-section-label mb-sm">{t('shell.menuSection')}</p>
          ) : null}
          <ul
            className={['flex flex-col gap-0.5', isDrawerCollapsed ? 'items-center' : '']
              .filter(Boolean)
              .join(' ')}
          >
            {menuItems.map((item) => (
              <NavLinkItem
                key={item.to}
                item={item}
                collapsed={isDrawerCollapsed}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        </div>

        <div>
          {!isDrawerCollapsed ? (
            <p className="admin-nav-section-label mb-sm">{t('shell.othersSection')}</p>
          ) : (
            <div aria-hidden="true" className="mx-auto hidden h-px w-8 bg-border/80 lg:block" />
          )}
          <ul
            className={['flex flex-col gap-0.5', isDrawerCollapsed ? 'items-center' : '']
              .filter(Boolean)
              .join(' ')}
          >
            {otherItems.map((item) => (
              <NavLinkItem
                key={item.to}
                item={item}
                collapsed={isDrawerCollapsed}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        </div>
      </nav>

      <div
        title={isDrawerCollapsed ? 'John Holland' : undefined}
        className={[
          'relative z-[1] mt-auto flex items-center rounded-lg border border-border p-sm',
          isDrawerCollapsed ? 'justify-center' : 'gap-sm',
        ].join(' ')}
      >
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground">
          JH
        </span>
        {!isDrawerCollapsed ? (
          <>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-foreground">
                John Holland
              </span>
              <span className="block truncate text-xs text-muted-foreground">
                {t('shell.roleAdmin')}
              </span>
            </span>
            <button
              type="button"
              aria-label={t('shell.profileOptions')}
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <MoreVertical aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </>
        ) : null}
      </div>
    </aside>
  );
};
