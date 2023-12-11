import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port : 3000,
    proxy: {
      '/api': {
           target: 'http://localhost:8000',
           changeOrigin: true,
           secure: false,      
           ws: true,
           rewrite: (path) => path.replace(/^\/api/, ''),

       },
       '/region_image': {
        target: 'http://127.0.0.1:9000/regionimages/',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/region_image/, ''),
       }
      }
  },
  base: "/drones-front/",
  plugins: [react()],
})
