import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { saveDefaultDataPlugin } from './vite-save-default-data.js'
import { saveWorldManifestPlugin } from './vite-save-world-manifest.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), saveDefaultDataPlugin(), saveWorldManifestPlugin()],
  server: {
    allowedHosts: ['.trycloudflare.com'],
  },
})
