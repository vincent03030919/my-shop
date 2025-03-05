import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// 合并后的配置
export default defineConfig({
  plugins: [react()], // 插件配置
  optimizeDeps: {
    exclude: ['lucide-react'], // 依赖优化配置
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 路径别名配置
    },
  },
});