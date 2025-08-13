import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteMockServe({
      mockPath:'mock',
      localEnabled:true
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      // 所有以 /api/doubao 开头的请求都会被代理
      '/api/doubao': {
        target: 'https://ark.cn-beijing.volces.com', // 目标 API 地址
        changeOrigin: true, // 修改请求头中的 Origin
        rewrite: (path) => path.replace(/^\/api\/doubao/, '/api/v3'), // 重写路径
        
      }
    }
  }

})
