import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import pluginRewriteAll from 'vite-plugin-rewrite-all'
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    proxy: {
      '/api': {
        target: 'https://studybuddies-infosys-internship-oct2024.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
