import Link from 'next/link';

import type { NavigationItem } from '@/config/navigation';

type MainNavProps = {
  items: NavigationItem[];
  labels: Record<NavigationItem['key'], string>;
};

export const MainNav = ({ items, labels }: MainNavProps) => (
  <nav aria-label="Main">
    <ul className="hidden items-center gap-md md:flex">
      {items.map((item) => (
        <li key={item.key}>
          <Link
            href={item.href}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {labels[item.key]}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);
