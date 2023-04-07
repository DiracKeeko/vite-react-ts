import react from '@vitejs/plugin-react';
import * as path from 'path';
import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig(({ mode }: ConfigEnv) => {
  return {
    base: loadEnv(mode, process.cwd()).VITE_BASE_URL, // 公共基础路径，路由前缀
    publicDir: 'public', // 静态资源服务文件夹
    envPrefix: ['VITE_', 'AXIOS_'], // 预设环境变量前缀
    resolve: {
      alias: [
        // 系统路径的别名，配合 tsconfig.json 使用
        {
          find: '@',
          replacement: path.resolve(__dirname, './src')
        },
        {
          find: '~antd',
          replacement: path.resolve(__dirname, './node_modules/antd')
        }
      ]
    },
    server: {
      port: 3000, // 开发服务器端口
      proxy: {
        // 开发服务器自定义代理规则
        '/api': {
          target: 'http://localhost:8050/',
          changeOrigin: true
        }
      }
    },
    build: {
      outDir: 'dist' // 打包输出路径
    },
    css: {
      preprocessorOptions: {
        // CSS 预处理器选项
        less: {
          javascriptEnabled: true
        }
      }
    },
    plugins: [
      react(),
      createHtmlPlugin({
        inject: {
          data: {
            icon: loadEnv(mode, process.cwd()).VITE_APP_ICON,
            title: loadEnv(mode, process.cwd()).VITE_APP_TITLE
          }
        }
      })
    ]
  };
});
