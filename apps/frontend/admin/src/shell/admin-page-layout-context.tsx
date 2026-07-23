import { createContext, type ReactNode, useContext, useEffect, useMemo } from 'react';

type AdminPageLayoutContextValue = {
  setToolbar: (toolbar: ReactNode) => void;
};

const AdminPageLayoutContext = createContext<AdminPageLayoutContextValue | null>(null);

type AdminPageLayoutProviderProps = {
  children: ReactNode;
  onToolbarChange: (toolbar: ReactNode) => void;
};

export const AdminPageLayoutProvider = ({
  children,
  onToolbarChange,
}: AdminPageLayoutProviderProps) => {
  const value = useMemo<AdminPageLayoutContextValue>(
    () => ({
      setToolbar: onToolbarChange,
    }),
    [onToolbarChange],
  );

  return (
    <AdminPageLayoutContext.Provider value={value}>{children}</AdminPageLayoutContext.Provider>
  );
};

export const useAdminPageToolbar = (toolbar: ReactNode): void => {
  const context = useContext(AdminPageLayoutContext);

  if (!context) {
    throw new Error('useAdminPageToolbar must be used within AdminPageLayout.');
  }

  useEffect(() => {
    context.setToolbar(toolbar);

    return () => {
      context.setToolbar(null);
    };
  }, [context, toolbar]);
};
