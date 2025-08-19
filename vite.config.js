import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/algorithm-visualizer/',  
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    open: true, 
    port: 3003
  }
})
