import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteComponents from 'vite-plugin-components'
import Pages from 'vite-plugin-pages'
import WindiCSS from 'vite-plugin-windicss'

const { prefix } = require('./package')

export default defineConfig({
  base: `/`,
  plugins: [
    vue(),
    Pages({ replaceSquareBrackets: true, nuxtStyle: true }),
    ViteComponents(),
    WindiCSS(),
  ],
  resolve: {
    alias: [
      { find: /^@\//, replacement: '/src/' },
    ],
  },
  server: {
    host: true,
    port: 6007,
  },
  build: {
    terserOptions: {
      compress: {
        keep_infinity: true,
        drop_console: true,
      },
    },
    // Turning off brotliSize display can slightly reduce packaging time
    brotliSize: false,
    chunkSizeWarningLimit: 2000,
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  optimizeDeps: {
    include: [
      'ant-design-vue/es/locale/zh_CN',
      'moment/dist/locale/zh-cn',
    ],
    exclude: [],
  },
})
