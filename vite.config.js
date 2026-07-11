import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // GitHub Pages project sites are served under /repo-name/.
  // The deploy workflow sets VITE_BASE to the correct sub-path via
  // actions/configure-pages so the built assets reference the right prefix.
  // Falls back to '/' for local development and root-level deployments.
  base: process.env.VITE_BASE || '/',

  build: {
    // The SCREI application is a large single-file decision tool;
    // suppress chunk-size warnings for expected bundle weight.
    chunkSizeWarningLimit: 3000,

    rollupOptions: {
      output: {
        // Split vendor libraries into a separate chunk for better caching
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'chart-vendor': ['recharts'],
          'icon-vendor':  ['lucide-react'],
        },
      },
    },

    // Source maps for production debugging of the analytical engine
    sourcemap: false,
  },

  // Ensure the development server runs cleanly
  server: {
    port: 5173,
    open:  false,
  },
})
