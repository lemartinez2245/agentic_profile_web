import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fileURLToPath from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Rutas relativas: permite publicar en GitHub Pages bajo cualquier
  // nombre de repositorio (https://usuario.github.io/mi-repo/) sin ajustar nada.
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath.fileURLToPath(new URL('./src', import.meta.url)),
      '@shared': fileURLToPath.fileURLToPath(new URL('../shared', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    // En desarrollo, las llamadas a /api/* se redirigen a FastAPI (puerto 8000).
    proxy: {
      '/api': 'http://localhost:8000',
    },
    // Permitir importar archivos fuera de frontend/ (shared/profile.json).
    fs: {
      allow: ['..'],
    },
  },
})
