import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const workspaceRoot = join(dirname(fileURLToPath(import.meta.url)), '../..');

const typescriptFiles = ['**/*.{ts,tsx,mts,cts}'];
const javascriptFiles = ['**/*.{js,mjs,cjs}'];

const importSortRules = {
  'simple-import-sort/imports': 'error',
  'simple-import-sort/exports': 'error',
  'unused-imports/no-unused-imports': 'error',
  'unused-imports/no-unused-vars': [
    'warn',
    {
      vars: 'all',
      varsIgnorePattern: '^_',
      args: 'after-used',
      argsIgnorePattern: '^_',
    },
  ],
};

/** Type-checked rules scoped to TypeScript files only. */
const typeCheckedConfigs = tseslint.configs.strictTypeChecked.map((config) => ({
  ...config,
  files: typescriptFiles,
}));

const typeCheckedParserConfig = {
  files: typescriptFiles,
  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: workspaceRoot,
    },
  },
  plugins: {
    'unused-imports': unusedImports,
    'simple-import-sort': simpleImportSort,
  },
  rules: {
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
    ],
    '@typescript-eslint/no-unused-vars': 'off',
    ...importSortRules,
    '@typescript-eslint/no-misused-promises': [
      'error',
      { checksVoidReturn: { attributes: false } },
    ],
  },
};

/** Plain JS/MJS — explicitly disable type-checked rules. */
const javascriptDisableTypeChecked = {
  files: javascriptFiles,
  ...tseslint.configs.disableTypeChecked,
};

const javascriptRulesConfig = {
  files: javascriptFiles,
  languageOptions: {
    globals: {
      ...globals.node,
    },
  },
  plugins: {
    'unused-imports': unusedImports,
    'simple-import-sort': simpleImportSort,
  },
  rules: importSortRules,
};

export const typescriptConfig = [
  ...typeCheckedConfigs,
  typeCheckedParserConfig,
  javascriptDisableTypeChecked,
  javascriptRulesConfig,
];
