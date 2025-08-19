import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/algorithm-visualizer/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: "/algorithm-visualizer/",
  server: {
    opne: true,
    port: 3003
  }
})
