import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project site: BASE_PATH=/repo-name/ (set in CI). Default '/' for custom domain or preview.
const base = process.env.BASE_PATH || '/'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: base.endsWith('/') ? base : `${base}/`,
})
