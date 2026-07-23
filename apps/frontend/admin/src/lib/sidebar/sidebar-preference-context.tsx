import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react';

import { readStoredSidebarCollapsed, sidebarStorageKey } from '@/config/sidebar';

export type SidebarPreferenceContextValue = {
  collapsed: boolean;
  mobileOpen: boolean;
  setCollapsed: (collapsed: boolean) => void;
  setMobileOpen: (open: boolean) => void;
  toggleCollapsed: () => void;
  toggleMobileOpen: () => void;
  closeMobile: () => void;
};

const SidebarPreferenceContext = createContext<SidebarPreferenceContextValue | null>(null);

type SidebarPreferenceProviderProps = {
  children: ReactNode;
  initialCollapsed?: boolean;
};

export const SidebarPreferenceProvider = ({
  children,
  initialCollapsed = readStoredSidebarCollapsed(),
}: SidebarPreferenceProviderProps) => {
  const [collapsed, setCollapsedState] = useState(initialCollapsed);
  const [mobileOpen, setMobileOpenState] = useState(false);

  useEffect(() => {
    localStorage.setItem(sidebarStorageKey, String(collapsed));
  }, [collapsed]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    const handleViewportChange = (event: MediaQueryListEvent | MediaQueryList) => {
      if (event.matches) {
        setMobileOpenState(false);
      }
    };

    handleViewportChange(mediaQuery);
    mediaQuery.addEventListener('change', handleViewportChange);

    return () => {
      mediaQuery.removeEventListener('change', handleViewportChange);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const value = useMemo<SidebarPreferenceContextValue>(
    () => ({
      collapsed,
      mobileOpen,
      setCollapsed: setCollapsedState,
      setMobileOpen: setMobileOpenState,
      toggleCollapsed: () => {
        setCollapsedState((current) => !current);
      },
      toggleMobileOpen: () => {
        setMobileOpenState((current) => !current);
      },
      closeMobile: () => {
        setMobileOpenState(false);
      },
    }),
    [collapsed, mobileOpen],
  );

  return (
    <SidebarPreferenceContext.Provider value={value}>{children}</SidebarPreferenceContext.Provider>
  );
};

export const useSidebarPreference = (): SidebarPreferenceContextValue => {
  const context = useContext(SidebarPreferenceContext);

  if (!context) {
    throw new Error('useSidebarPreference must be used within SidebarPreferenceProvider.');
  }

  return context;
};
