import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// For GitHub Pages at hrs454.github.io/resume-portfolio/
export default defineConfig({
  base: '/resume-portfolio/',
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
})
