import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { wrapperEnv, createProxy } from './build/utils'
import path from 'path'
import { log } from 'console'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)
  const {
    VITE_PORT,
    VITE_PUBLIC_PATH,
    VITE_PROXY
  } = viteEnv

  return {
    plugins: [vue()],
    base: VITE_PUBLIC_PATH || '/',
    resolve: {
      // 映射路径
      alias: {
        '@': path.resolve(__dirname, 'src') 
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import '@/assets/styles/theme.scss';`,
        }
      }
    },
    server: {
      host: '127.0.0.1',
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY)
    }
  }
})
