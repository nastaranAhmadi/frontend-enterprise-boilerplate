import nx from '@nx/eslint-plugin';

import { baseConfig } from './base.mjs';
import { boundariesConfig } from './boundaries.mjs';
import { nodeConfig } from './node.mjs';
import { reactConfig } from './react.mjs';
import { typescriptConfig } from './typescript.mjs';

/** Composable flat configs for the monorepo. */
export { baseConfig, boundariesConfig,nodeConfig, reactConfig, typescriptConfig };
export { moduleBoundaryRules } from './boundaries.mjs';

/** Default workspace configuration. */
export default [
  ...baseConfig,
  ...nx.configs['flat/base'],
  ...typescriptConfig,
  ...reactConfig,
  ...nodeConfig,
  boundariesConfig,
];
