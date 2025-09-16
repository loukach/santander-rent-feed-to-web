import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api/motorflash': {
        target: 'https://api.motorflash.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/motorflash/, ''),
        secure: true
      }
    }
  },
  preview: {
    port: process.env.PORT || 4173,
    host: true
  }
})
