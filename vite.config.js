import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to backend to avoid CORS in dev
      '/api': {
        // Use explicit IPv4 loopback to avoid Node resolving to IPv6 ::1 when
        // the backend is only listening on IPv4 (127.0.0.1).
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
})
