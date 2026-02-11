import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Necesario para GitHub Pages: la app se sirve en https://lologaby.github.io/SV-AD/
  base: '/SV-AD/',
})
