import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 4174,
    proxy: {
      '/api': 'http://127.0.0.1:4181',
    },
  },
})
