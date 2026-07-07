import globals from 'globals';

/**
 * Node.js rules preset — for future backend services.
 * No framework-specific plugins installed.
 */
export const nodeConfig = [
  {
    files: ['apps/backend/**/*.{ts,js,mjs}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'off',
    },
  },
];
