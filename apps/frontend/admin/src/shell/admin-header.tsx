import { Input } from '@enterprise/ui';
import { ChevronRight, Search } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { AdminActionsMenu } from '@/components/chrome/admin-actions-menu';
import { useT } from '@/lib/i18n/use-t';

type Breadcrumb = {
  label: string;
  href?: string;
};

type AdminHeaderProps = {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  children?: ReactNode;
};

export const AdminHeader = ({ title, subtitle, breadcrumbs, children }: AdminHeaderProps) => {
  const t = useT();

  return (
    <header className="sticky top-0 z-dropdown overflow-visible border-b border-border bg-surface px-md py-sm sm:px-lg sm:py-md lg:px-xl">
      <div className="flex flex-col gap-sm sm:gap-md">
        <div className="flex flex-col gap-sm lg:flex-row lg:items-start lg:justify-between lg:gap-md">
          <div className="min-w-0 flex-1">
            {breadcrumbs && breadcrumbs.length > 0 ? (
              <nav
                aria-label={t('shell.breadcrumb')}
                className="mb-xs flex flex-wrap items-center gap-xs text-xs text-muted-foreground"
              >
                {breadcrumbs.map((crumb, index) => {
                  const isLast = index === breadcrumbs.length - 1;

                  return (
                    <span
                      key={`${crumb.label}-${String(index)}`}
                      className="inline-flex items-center gap-xs"
                    >
                      {index > 0 ? (
                        <ChevronRight
                          aria-hidden="true"
                          className="h-3 w-3 opacity-40 rtl:rotate-180"
                          strokeWidth={2}
                        />
                      ) : null}
                      {crumb.href && !isLast ? (
                        <Link to={crumb.href} className="hover:text-foreground">
                          {crumb.label}
                        </Link>
                      ) : (
                        <span className={isLast ? 'font-medium text-foreground' : undefined}>
                          {crumb.label}
                        </span>
                      )}
                    </span>
                  );
                })}
              </nav>
            ) : null}

            <h1 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl lg:text-2xl">
              {title}
            </h1>
            {subtitle ? <p className="mt-xs text-sm text-muted-foreground">{subtitle}</p> : null}
          </div>

          <div className="admin-header-toolbar flex w-full items-center overflow-visible rounded-lg border border-border bg-background lg:w-auto lg:min-w-[18rem] lg:max-w-sm">
            <AdminSearchBar className="min-w-0 flex-1" />
            <span aria-hidden="true" className="h-5 w-px shrink-0 bg-border" />
            <AdminActionsMenu />
          </div>
        </div>

        {children ? (
          <div className="flex flex-col gap-sm border-t border-border pt-sm sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-md sm:pt-md">
            {children}
          </div>
        ) : null}
      </div>
    </header>
  );
};

type AdminSearchBarProps = {
  className?: string;
};

export const AdminSearchBar = ({ className }: AdminSearchBarProps) => {
  const t = useT();

  return (
    <Input
      type="search"
      readOnly
      aria-label={t('common.search')}
      placeholder={t('common.search')}
      size="small"
      className={['border-0 bg-transparent shadow-none focus-within:ring-0', className]
        .filter(Boolean)
        .join(' ')}
      startAdornment={
        <Search aria-hidden="true" className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
      }
      endAdornment={
        <kbd className="hidden rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground md:inline">
          ⌘K
        </kbd>
      }
    />
  );
};
