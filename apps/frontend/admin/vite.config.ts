import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  root: __dirname,
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 4300,
    strictPort: true,
  },
  build: {
    outDir: '../../../dist/apps/frontend/admin',
    emptyOutDir: true,
  },
});
