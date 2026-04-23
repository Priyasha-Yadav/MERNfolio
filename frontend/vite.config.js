import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            if (id.includes('/src/components/templates/')) {
              return 'portfolio-templates';
            }

            return undefined;
          }

          if (id.includes('react-router-dom') || id.includes('react-router')) {
            return 'router';
          }

          if (id.includes('react-dom') || id.includes('scheduler')) {
            return 'react-dom';
          }

          if (id.includes('firebase')) {
            return 'firebase';
          }

          if (id.includes('framer-motion')) {
            return 'motion';
          }

          if (id.includes('axios')) {
            return 'axios';
          }

          return 'vendor';
        },
      },
    },
  },
})
