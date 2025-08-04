import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    proxy: {
      // 所有以 /api/doubao 开头的请求都会被代理
      '/api/doubao': {
        target: 'https://ark.cn-beijing.volces.com', // 目标 API 地址
        changeOrigin: true, // 修改请求头中的 Origin
        rewrite: (path) => path.replace(/^\/api\/doubao/, '/api/v3'), // 重写路径
        // secure: true, // 如果目标是 https，建议开启
        // 可选：添加请求头（如果需要在代理层加）
        // configure: (proxy, options) => {
        //   proxy.on('proxyReq', (proxyReq, req, res) => {
        //     proxyReq.setHeader('Authorization', `Bearer ${process.env.VITE_DOUBAO_API_KEY}`);
        //   });
        // }
      }
    }
  }

})
