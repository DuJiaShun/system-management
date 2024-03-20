import { defineConfig, ConfigEnv, UserConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import { viteMockServe } from 'vite-plugin-mock'
import * as defaultSettings from './src/settings'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

const title = defaultSettings.default.title

// https://vitejs.dev/config/
export default defineConfig((config: ConfigEnv): UserConfig => {
  return {
    base: './',
    server: {
      host: '0.0.0.0',
      port: 8000,
      open: true, // 启动时自动在浏览器中打开
      proxy: {
        '/apis': {
          target: 'http://localhost:8000',
          changeOrigin: true, // 是否跨域
          rewrite: path => path.replace(/^\/apis/, '')
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    plugins: [
      vue(),
      createHtmlPlugin({
        inject: {
          data: {
            title
          }
        }
      }),
      viteMockServe({
        mockPath: './mock', // mock文件存放的位置
        enable: true, // 是否启用 mock 功能
        logger: true, // 是否在控制台显示请求日志
      })
    ],
    build: {
      assetsDir: 'static',
      outDir: 'dist'
    }
  }
})
