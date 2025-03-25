import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
    build: {
      chunkSizeWarningLimit: 1000, // Increase limit to 1000kB
      rollupOptions: {
        output: {
          manualChunks: {
            'chart-js': ['chart.js', 'react-chartjs-2'],
            'xlsx': ['xlsx']
          }
        
      }
    }
  }

});
