import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        rakshakAi: resolve(__dirname, 'rakshak-ai.html'),
        solutions: resolve(__dirname, 'solutions.html'),
        securityIntelligence: resolve(__dirname, 'security-intelligence.html'),
        about: resolve(__dirname, 'about.html'),
        resources: resolve(__dirname, 'resources.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
});
