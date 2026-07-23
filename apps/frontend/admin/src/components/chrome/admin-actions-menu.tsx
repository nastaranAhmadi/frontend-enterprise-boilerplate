import { Dropdown, DropdownItem } from '@enterprise/ui';
import { Button } from '@enterprise/ui/button';
import { Bell, Check, Moon, Settings, SlidersHorizontal, Sun } from 'lucide-react';
import type { ReactNode } from 'react';

import { type Locale, locales } from '@/config/site';
import { useLocalePreference } from '@/lib/i18n/locale-preference-context';
import { useT } from '@/lib/i18n/use-t';
import { useThemePreference } from '@/lib/theme/theme-preference-context';

const localeLabelKeys = {
  en: 'locale.en',
  fa: 'locale.fa',
} as const satisfies Record<Locale, 'locale.en' | 'locale.fa'>;

type AdminActionsMenuProps = {
  className?: string;
};

const MenuItemContent = ({
  icon,
  label,
  trailing,
}: {
  icon?: ReactNode;
  label: string;
  trailing?: ReactNode;
}) => (
  <span className="flex w-full items-center justify-between gap-sm">
    <span className="flex items-center gap-sm">
      {icon}
      {label}
    </span>
    {trailing}
  </span>
);

export const AdminActionsMenu = ({ className }: AdminActionsMenuProps) => {
  const t = useT();
  const { locale, setLocale } = useLocalePreference();
  const { theme, setThemePreference } = useThemePreference();
  const isLight = theme === 'light';

  return (
    <Dropdown
      align="end"
      menuClassName="min-w-[12rem]"
      trigger={
        <Button
          type="button"
          variant="ghost"
          size="small"
          aria-label={t('shell.actionsMenu')}
          className={['h-9 w-9 shrink-0 rounded-none px-0', className].filter(Boolean).join(' ')}
          startIcon={
            <SlidersHorizontal aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
          }
        />
      }
    >
      {locales.map((item) => (
        <DropdownItem
          key={item}
          onClick={() => {
            setLocale(item);
          }}
        >
          <MenuItemContent
            label={t(localeLabelKeys[item])}
            trailing={
              item === locale ? (
                <Check aria-hidden="true" className="h-4 w-4 text-primary" strokeWidth={2} />
              ) : null
            }
          />
        </DropdownItem>
      ))}

      <div aria-hidden="true" className="my-xs h-px bg-border" role="separator" />

      <DropdownItem
        onClick={() => {
          setThemePreference('light');
        }}
      >
        <MenuItemContent
          icon={<Sun aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />}
          label={t('theme.light')}
          trailing={
            isLight ? (
              <Check aria-hidden="true" className="h-4 w-4 text-primary" strokeWidth={2} />
            ) : null
          }
        />
      </DropdownItem>
      <DropdownItem
        onClick={() => {
          setThemePreference('dark');
        }}
      >
        <MenuItemContent
          icon={<Moon aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />}
          label={t('theme.dark')}
          trailing={
            !isLight ? (
              <Check aria-hidden="true" className="h-4 w-4 text-primary" strokeWidth={2} />
            ) : null
          }
        />
      </DropdownItem>

      <div aria-hidden="true" className="my-xs h-px bg-border" role="separator" />

      <DropdownItem>
        <MenuItemContent
          icon={<Bell aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />}
          label={t('common.notifications')}
          trailing={
            <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
              8+
            </span>
          }
        />
      </DropdownItem>
      <DropdownItem>
        <MenuItemContent
          icon={<Settings aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />}
          label={t('common.settings')}
        />
      </DropdownItem>
    </Dropdown>
  );
};
