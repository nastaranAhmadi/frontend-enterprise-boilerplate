const { createContentGlobs } = require('@enterprise/tailwind-config/content');

module.exports = {
  presets: [require('@enterprise/tailwind-config')],
  content: createContentGlobs(__dirname),
};
