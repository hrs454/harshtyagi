import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Relative base so the build works on both github.io/<user> and github.io/<user>/<repo>.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
})
