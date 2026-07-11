import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/lumina-connect/',
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@lumina/core-types': '../../packages/core-types/src',
      '@lumina/ui-primitives': '../../packages/ui-primitives/src',
      '@lumina/data-access': '../../packages/data-access/src',
      '@lumina/security': '../../packages/security/src',
      '@lumina/education-api': '../../packages/education-api/src'
    }
  },
  server: {
    port: 5173,
    strictPort: false
  },
  build: {
    target: 'ES2020',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-data': ['@tanstack/react-query', 'zustand'],
          'vendor-ui': ['framer-motion', 'sonner', 'lucide-react']
        }
      }
    }
  }
})
