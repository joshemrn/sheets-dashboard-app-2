import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/sheets-dashboard-app-2/', // Replace with your GitHub repo name
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
