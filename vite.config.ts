/**
 * @module build/vite-config
 * @meta Configures React compilation, the local preview and the shared jsdom test environment.
 */

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  server: { host: '127.0.0.1' },
  preview: { host: '127.0.0.1' },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    clearMocks: true,
    restoreMocks: true,
  },
});
