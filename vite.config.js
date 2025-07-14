import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // 🔥 ajoute ceci

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 🔥 configure l'alias @
    },
  },
  server: {
    port: 3000,
    host: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});
