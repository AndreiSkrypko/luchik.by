import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { asyncCss } from "./vite-plugin-async-css";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), asyncCss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Оптимизация сборки для производительности
    cssCodeSplit: true,
    // Минификация CSS
    cssMinify: true,
    rollupOptions: {
      output: {
        // Разделение кода на чанки для лучшего кеширования
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-slot'],
        },
        // Оптимизация CSS
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    // Минификация
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Удаляем console.log в продакшене
      },
    },
    // Оптимизация размера чанков
    chunkSizeWarningLimit: 1000,
  },
});
