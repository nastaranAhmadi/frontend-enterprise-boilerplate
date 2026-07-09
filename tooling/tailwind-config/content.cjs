const path = require('node:path');

const SOURCE_GLOB = '**/*.{js,jsx,ts,tsx,mdx}';

/**
 * Returns absolute monorepo globs so each app scans shared UI sources too.
 *
 * @param {string} appRoot absolute or relative path to application root
 * @returns {string[]}
 */
function createContentGlobs(appRoot) {
  const absoluteAppRoot = path.resolve(appRoot);
  const workspaceRoot = path.resolve(__dirname, '../..');

  return [
    path.join(absoluteAppRoot, 'src', SOURCE_GLOB),
    path.join(workspaceRoot, 'packages', 'ui', 'src', SOURCE_GLOB),
    path.join(workspaceRoot, 'packages', 'theme', 'src', SOURCE_GLOB),
  ];
}

module.exports = { createContentGlobs };
