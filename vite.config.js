import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    assetsDir: '',
    minify: false,
  },
  server: {
    host: true
  }
})
