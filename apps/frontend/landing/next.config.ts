import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { NextConfig } from 'next';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

type WebpackConfiguration = {
  resolve?: {
    alias?: Record<string, string>;
  };
};

const nextConfig: NextConfig = {
  transpilePackages: [
    '@enterprise/api-client',
    '@enterprise/hooks',
    '@enterprise/i18n',
    '@enterprise/theme',
    '@enterprise/ui',
  ],
  experimental: {
    optimizePackageImports: ['@enterprise/ui'],
  },
  reactStrictMode: true,
  webpack: (config: WebpackConfiguration) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '@': path.join(projectRoot, 'src'),
      },
    };
    return config;
  },
};

export default nextConfig;
