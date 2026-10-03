import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// For GitHub Pages at hrs454.github.io/harshtyagi/
export default defineConfig({
  base: '/harshtyagi/',
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
})
