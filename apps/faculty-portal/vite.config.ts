import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@lumina/core-types': path.resolve(__dirname, '../../packages/core-types/src'),
      '@lumina/ui-primitives': path.resolve(__dirname, '../../packages/ui-primitives/src'),
      '@lumina/data-access': path.resolve(__dirname, '../../packages/data-access/src'),
      '@lumina/security': path.resolve(__dirname, '../../packages/security/src'),
      '@lumina/education-api': path.resolve(__dirname, '../../packages/education-api/src')
    }
  },
  server: {
    port: 5176,
    strictPort: false
  },
  build: {
    target: 'es2022',
    minify: false,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom')) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/@tanstack/react-query') || id.includes('node_modules/zustand')) {
            return 'vendor-data'
          }
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/sonner') || id.includes('node_modules/lucide-react')) {
            return 'vendor-ui'
          }
        }
      }
    }
  }
})
