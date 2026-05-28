import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2015',
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Split React and ReactDOM into a 'vendor' chunk
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor';
            }
            // Split heavy animation and charting libraries into an 'animations' chunk
            if (id.includes('framer-motion') || id.includes('d3') || id.includes('chart.js') || id.includes('gsap')) {
              return 'animations';
            }
          }
        }
      }
    }
  }
});
