import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      }
    ]
  },
  server: {
    port: 8080,
    // proxy: {
    //   '/api': {
    //     target: `http://175.24.200.3:7001`,
    //     // changeOrigin: true,
    //     rewrite: path => path.replace(/^\/api/, '')
    //   },
    //   '/ws-api': {
    //     target: 'ws://175.24.200.3:7002',
    //     changeOrigin: true, //是否允许跨域
    //     ws: true
    //   }
    // }
  },
  plugins: [react()]
})
