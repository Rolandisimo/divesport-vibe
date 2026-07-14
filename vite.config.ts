import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Base path matches a GitHub Pages project site (https://<user>.github.io/divesport-vibe/).
// Change to '/' if deploying to a custom domain or a user/organization root site.
export default defineConfig({
  plugins: [react()],
  base: '/divesport-vibe/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
