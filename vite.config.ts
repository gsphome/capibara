import { defineConfig } from 'vite';

export default defineConfig({
  base: '/capibara/',
  build: {
    target: 'es2015',
    minify: 'esbuild',
  },
  server: {
    host: true,
    port: 3000,
  },
});