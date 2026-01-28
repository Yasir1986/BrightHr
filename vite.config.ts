import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',  // Netlify
  build: {
    outDir: 'dist',
    sourcemap: false  
  },
  plugins: [react()],
})
