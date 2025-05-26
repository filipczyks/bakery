import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode === 'development' ? 'dev' : mode, process.cwd(), '')
  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: true,
    },
    server: {
      port: 3000,
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode)
    }
  }
})
