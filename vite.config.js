import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Must match the GitHub repo name so assets resolve correctly on
  // https://<username>.github.io/studynest/
  base: '/studynest/',
})
