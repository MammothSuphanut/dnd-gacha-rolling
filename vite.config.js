import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { saveDefaultDataPlugin } from './vite-save-default-data.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), saveDefaultDataPlugin()],
  server: {
    allowedHosts: ['.trycloudflare.com'],
  },
})
