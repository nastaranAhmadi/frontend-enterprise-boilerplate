import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { StorybookConfig } from '@storybook/react-vite';
import react from '@vitejs/plugin-react';
import { mergeConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const config: StorybookConfig = {
  stories: ['../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: [getAbsolutePath('@storybook/addon-a11y')],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },

  viteFinal: (config) =>
    mergeConfig(config, {
      plugins: [react(), tsconfigPaths()],
    }),
};

function getAbsolutePath(value: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
