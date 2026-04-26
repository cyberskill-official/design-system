import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@atoms': path.resolve(__dirname, './src/atoms'),
      '@molecules': path.resolve(__dirname, './src/molecules'),
      '@organisms': path.resolve(__dirname, './src/organisms'),
      '@templates': path.resolve(__dirname, './src/templates'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@themes': path.resolve(__dirname, './src/themes'),
      '@lib': path.resolve(__dirname, './src/lib'),
    },
  },
  assetsInclude: ['**/*.md', '**/*.mdx'],
  server: { port: 5173, host: true },
  preview: { port: 4173 },
});
