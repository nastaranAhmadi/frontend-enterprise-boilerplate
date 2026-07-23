import { useMatches } from 'react-router-dom';

import { getAdminRouteHandle } from '@/config/route-meta';
import { useT } from '@/lib/i18n/use-t';

export const PlaceholderPage = () => {
  const t = useT();
  const matches = useMatches();
  const handle = getAdminRouteHandle(matches);

  if (!handle) {
    return null;
  }

  return (
    <div className="flex flex-1 items-center justify-center p-md sm:p-lg lg:p-xl">
      <p className="text-sm text-muted-foreground">{t(handle.titleKey)}</p>
    </div>
  );
};
