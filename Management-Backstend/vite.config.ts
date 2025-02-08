import path from 'path'
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: './', // 设置资源的基础路径为相对路径
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // 路径别名
    }
  },
  css: {
    modules: {
      generateScopedName: '[name]__[local]__[hash:base64:6]' // CSS模块化
    }
  }
});
