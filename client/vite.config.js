// client/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use a function that receives the 'mode' parameter from Vite
export default defineConfig({
    plugins: [react()],
    server: {
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
        },
      },
    },
});