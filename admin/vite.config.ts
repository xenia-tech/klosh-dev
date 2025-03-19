import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/admin/', // This will make the app accessible at yourdomain.com/admin/
  build: {
    outDir: '../dist/admin', // Output to the dist/admin folder
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
})
