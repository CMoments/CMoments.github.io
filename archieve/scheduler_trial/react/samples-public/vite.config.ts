import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  build:{
    sourcemap:true,
    minify: false,
  },
  server: {
    port: 3000,
    open: true,
    watch: {
      // Needed for workspace symlinks
      followSymlinks: true,
    },
  }
})
