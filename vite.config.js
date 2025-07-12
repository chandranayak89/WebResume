import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          cannon: ['cannon-es'],
          gsap: ['gsap']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['three', 'cannon-es', 'gsap']
  }
}) 