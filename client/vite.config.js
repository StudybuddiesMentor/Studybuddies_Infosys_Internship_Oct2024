import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), 
    },
  },
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
