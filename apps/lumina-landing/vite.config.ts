import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@lumina/data-access': resolve(__dirname, '../../packages/data-access/src/index.ts'),
      '@lumina/ui-primitives': resolve(__dirname, '../../packages/ui-primitives/src/index.ts'),
      '@lumina/core-types': resolve(__dirname, '../../packages/core-types/src/index.ts')
    }
  },
  server: {
    port: 5174,
    strictPort: false
  },
  build: {
    target: 'es2022',
    sourcemap: false
  },
    publicDir: '../../public',
    envDir: '../../'
})
