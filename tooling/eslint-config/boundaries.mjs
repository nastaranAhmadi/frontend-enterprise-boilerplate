/**
 * Nx module boundary rules — mirrors docs/module-boundaries.md
 */
export const moduleBoundaryRules = {
  enforceBuildableLibDependency: true,
  allow: ['@enterprise/tsconfig', '@enterprise/eslint-config'],
  allowCircularSelfDependency: false,
  checkNestedExternalImports: true,
  depConstraints: [
    {
      sourceTag: 'scope:app',
      onlyDependOnLibsWithTags: ['scope:shared', 'type:config'],
    },
    {
      sourceTag: 'domain:backend',
      notDependOnLibsWithTags: ['type:ui', 'platform:web', 'domain:frontend'],
    },
    {
      sourceTag: 'platform:neutral',
      notDependOnLibsWithTags: ['type:ui', 'platform:web'],
    },
    {
      sourceTag: 'platform:web',
      notDependOnLibsWithTags: ['platform:node'],
      bannedExternalImports: [],
    },
    {
      sourceTag: 'platform:node',
      notDependOnLibsWithTags: ['type:ui', 'platform:web'],
    },
    {
      sourceTag: 'type:ui',
      onlyDependOnLibsWithTags: ['scope:shared'],
      notDependOnLibsWithTags: ['type:ui'],
    },
    {
      sourceTag: 'type:config',
      onlyDependOnLibsWithTags: ['type:config'],
    },
    {
      sourceTag: 'type:util',
      onlyDependOnLibsWithTags: ['scope:shared'],
      notDependOnLibsWithTags: ['type:ui', 'platform:web'],
    },
  ],
};

export const boundariesConfig = {
  files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.mjs'],
  rules: {
    '@nx/enforce-module-boundaries': ['error', moduleBoundaryRules],
  },
};
