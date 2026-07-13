'use client';

import { Button } from '@enterprise/ui/button';
import { useOverlayBehavior } from '@enterprise/ui/hooks';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';

import type { NavigationItem } from '@/config/navigation';

type MobileNavProps = {
  items: NavigationItem[];
  labels: Record<NavigationItem['key'], string>;
  menuLabel: string;
  closeLabel: string;
};

export const MobileNav = ({ items, labels, menuLabel, closeLabel }: MobileNavProps) => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const close = useCallback(() => {
    setOpen(false);
  }, []);

  useOverlayBehavior({ open, onClose: close, panelRef, lockBodyScroll: true });

  return (
    <div className="md:hidden">
      <Button
        type="button"
        variant="ghost"
        size="small"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-haspopup="true"
        onClick={() => {
          setOpen((current) => !current);
        }}
      >
        {open ? closeLabel : menuLabel}
      </Button>
      {open ? (
        <>
          <button
            type="button"
            aria-label={closeLabel}
            className="fixed inset-0 z-dropdown bg-black/20"
            onClick={close}
          />
          <nav
            ref={panelRef}
            id="mobile-navigation"
            aria-label="Main"
            className="absolute inset-x-0 top-full z-dropdown border-b border-border bg-background px-md py-md shadow-md"
          >
            <ul className="flex flex-col gap-sm">
              {items.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="block py-xs text-sm text-foreground"
                    onClick={close}
                  >
                    {labels[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      ) : null}
    </div>
  );
};
