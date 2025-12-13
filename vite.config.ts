import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  // Using the provided key directly to ensure it works on Vercel
  const apiKey = "AIzaSyC67u3NWIQoiQN81En4I3JGSUNhkl8ajus"; 
  
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./"),
      },
    },
    define: {
      // Vital: Map the key to process.env.API_KEY as per Google GenAI SDK guidelines
      'process.env.API_KEY': JSON.stringify(apiKey)
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: 'esbuild',
    },
  };
});