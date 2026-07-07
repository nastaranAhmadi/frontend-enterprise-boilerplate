#!/usr/bin/env node
/**
 * Validates workspace package.json dependencies against module boundary rules.
 * Complements @nx/enforce-module-boundaries ESLint enforcement.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const ALLOWED_PACKAGE_DEPS = {
  '@enterprise/types': new Set(),
  '@enterprise/errors': new Set(['@enterprise/types']),
  '@enterprise/design-tokens': new Set(['@enterprise/types']),
  '@enterprise/permissions': new Set(['@enterprise/types']),
  '@enterprise/validation': new Set(['@enterprise/types']),
  '@enterprise/utils': new Set(['@enterprise/types']),
  '@enterprise/logger': new Set(['@enterprise/types', '@enterprise/errors']),
  '@enterprise/config': new Set(['@enterprise/types', '@enterprise/validation']),
  '@enterprise/env': new Set(['@enterprise/types', '@enterprise/validation', '@enterprise/errors']),
  '@enterprise/api-client': new Set([
    '@enterprise/types',
    '@enterprise/errors',
    '@enterprise/logger',
  ]),
  '@enterprise/auth': new Set([
    '@enterprise/types',
    '@enterprise/errors',
    '@enterprise/api-client',
  ]),
  '@enterprise/feature-flags': new Set(['@enterprise/types', '@enterprise/logger']),
  '@enterprise/shared': new Set([
    '@enterprise/types',
    '@enterprise/utils',
    '@enterprise/validation',
    '@enterprise/config',
  ]),
  '@enterprise/theme': new Set(['@enterprise/types', '@enterprise/design-tokens']),
  '@enterprise/i18n': new Set(['@enterprise/types']),
  '@enterprise/hooks': new Set(['@enterprise/types']),
  '@enterprise/ui': new Set([
    '@enterprise/types',
    '@enterprise/shared',
    '@enterprise/design-tokens',
    '@enterprise/theme',
  ]),
};

const ISOMORPHIC_PACKAGES = new Set([
  '@enterprise/types',
  '@enterprise/errors',
  '@enterprise/design-tokens',
  '@enterprise/permissions',
  '@enterprise/validation',
  '@enterprise/utils',
  '@enterprise/logger',
  '@enterprise/config',
  '@enterprise/env',
  '@enterprise/api-client',
  '@enterprise/auth',
  '@enterprise/feature-flags',
  '@enterprise/shared',
]);

const BROWSER_ONLY_PACKAGES = new Set([
  '@enterprise/ui',
  '@enterprise/theme',
  '@enterprise/i18n',
  '@enterprise/hooks',
]);

function findPackageJsonDirs(dir, results = []) {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (!stat.isDirectory() || entry === 'node_modules' || entry === 'dist') continue;

    const pkgPath = join(fullPath, 'package.json');
    try {
      readFileSync(pkgPath);
      results.push(fullPath);
    } catch {
      findPackageJsonDirs(fullPath, results);
    }
  }
  return results;
}

function getDeps(pkg) {
  return Object.keys({ ...pkg.dependencies, ...pkg.devDependencies, ...pkg.peerDependencies });
}

const errors = [];
const packageDirs = [
  ...findPackageJsonDirs(join(root, 'packages')),
  ...findPackageJsonDirs(join(root, 'apps/frontend')),
  ...findPackageJsonDirs(join(root, 'tooling')),
];

for (const dir of packageDirs) {
  const pkgPath = join(dir, 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  const name = pkg.name;
  const rel = relative(root, dir);
  const deps = getDeps(pkg).filter((d) => d.startsWith('@enterprise/'));

  if (name === '@enterprise/tsconfig' || name === '@enterprise/eslint-config') {
    const forbidden = deps.filter(
      (d) => d !== '@enterprise/tsconfig' && d !== '@enterprise/eslint-config',
    );
    if (forbidden.length > 0) {
      errors.push(`${rel}: tooling package must not depend on ${forbidden.join(', ')}`);
    }
    continue;
  }

  if (ALLOWED_PACKAGE_DEPS[name]) {
    for (const dep of deps) {
      if (
        !ALLOWED_PACKAGE_DEPS[name].has(dep) &&
        dep !== '@enterprise/tsconfig' &&
        dep !== '@enterprise/eslint-config'
      ) {
        errors.push(`${rel} (${name}): forbidden dependency "${dep}"`);
      }
    }

    if (ISOMORPHIC_PACKAGES.has(name)) {
      for (const dep of deps) {
        if (BROWSER_ONLY_PACKAGES.has(dep)) {
          errors.push(
            `${rel} (${name}): isomorphic package cannot depend on browser-only "${dep}"`,
          );
        }
      }
    }
  }

  if (rel.startsWith('apps/frontend/')) {
    for (const dep of deps) {
      if (dep.startsWith('@enterprise/') && dep.includes('backend')) {
        errors.push(`${rel}: frontend app cannot depend on backend package "${dep}"`);
      }
    }
  }

  if (rel.startsWith('packages/') && deps.some((d) => d.includes('/apps/'))) {
    errors.push(`${rel}: package cannot depend on applications`);
  }
}

if (errors.length > 0) {
  console.error('Module boundary violations:\n');
  for (const error of errors) console.error(`  ✗ ${error}`);
  process.exit(1);
}

console.warn('Module boundary check passed.');
console.warn(`Validated ${packageDirs.length} workspace packages.`);
