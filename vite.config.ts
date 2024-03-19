import { defineConfig, ConfigEnv, UserConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import * as defaultSettings from './src/settings'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
const pathSrc = resolve(__dirname, 'src')

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
        '/api': {
          target: 'http://192.168.1.97:108',
          changeOrigin: true, // 是否跨域
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    },
    resolve: {
      alias: {
        '@': pathSrc
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
      })
    ]
    ,
    build: {
      assetsDir: 'static',
      outDir: 'dist'
    }
  }
})
