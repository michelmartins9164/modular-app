import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'
import tsconfigPaths from "vite-tsconfig-paths"
// https://vite.dev/config/
export default defineConfig({
  base: '/modular-app/',
  plugins: [react(), tsconfigPaths(),mkcert()],
    server: {
    https: true
  }
})
