import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.', // ensure root is project root
  build: {
    outDir: 'dist',
  },
})