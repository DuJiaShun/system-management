import { defineConfig, ConfigEnv, UserConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import { viteMockServe } from 'vite-plugin-mock'
import defaultSettings from './src/settings'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { version } from './package.json'
const title = defaultSettings.title

export default defineConfig((config: ConfigEnv): UserConfig => {
  return {
    base: './',
    define: {
      __APP_VERSION__: JSON.stringify(version)
    },
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
      },
      hmr: { overlay: false }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    css: {
      // CSS 预处理器
      preprocessorOptions: {
        // 定义全局 SCSS 变量
        scss: {
          javascriptEnabled: true,
          additionalData: `@use "@/styles/variables.scss" as *;`
        }
      }
    },
    plugins: [
      vue(),
      vueJsx(), // jsx、tsx语法支持
      viteMockServe({
        mockPath: './mock', // mock文件存放的位置=
        enable: true, // 是否启用 mock 功能
        logger: true // 是否在控制台显示请求日志
      }),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue', '@vueuse/core', 'pinia', 'vue-router'],
        resolvers: [
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon'
          })
        ],
        vueTemplate: true,
        dts: 'src/types/auto-imports.d.ts'
        // dts: false
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep']
          })
        ],
        dirs: ['src/components', 'src/**/components'],
        dts: 'src/types/components.d.ts'
        // dts: false
      }),
      Icons({
        // 自动安装图标
        autoInstall: true
      }),
      createHtmlPlugin({
        inject: {
          data: {
            title
          }
        }
      }),
      createSvgIconsPlugin({
        // 指定路径在你的src里的svg存放文件
        iconDirs: [resolve(process.cwd(), 'src/icons/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[name]',
        svgoOptions: {
          plugins: [
            {
              name: 'removeAttrs',
              params: { attrs: ['class', 'data-name', 'fill', 'stroke'] }
            }
          ]
        }
      })
    ],
    build: {
      assetsDir: 'static',
      outDir: 'dist'
    }
  }
})
