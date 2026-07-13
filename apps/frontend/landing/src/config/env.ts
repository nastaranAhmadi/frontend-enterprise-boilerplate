export type DataSource = 'mock' | 'api';

export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:4200',
  dataSource: (process.env.NEXT_PUBLIC_DATA_SOURCE ?? 'mock') as DataSource,
  isProduction: process.env.NODE_ENV === 'production',
} as const;
