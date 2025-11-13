// client/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use a function that receives the 'mode' parameter from Vite
export default defineConfig(({ mode }) => {
  // Use the 'mode' to determine the base path
  const BASE_PATH = mode === 'production'
    ? '/budgetblox/'
    : '/';

  return {
    plugins: [react()],
    server: {
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:4000',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});