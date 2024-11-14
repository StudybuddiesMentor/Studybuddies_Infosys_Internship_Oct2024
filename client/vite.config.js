import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import pluginRewriteAll from 'vite-plugin-rewrite-all'
import path from 'path';

export default defineConfig({
  plugins: [react(),pluginRewriteAll()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
