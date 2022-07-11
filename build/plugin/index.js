import vue from '@vitejs/plugin-vue'

import VueSetupExtend from 'vite-plugin-vue-setup-extend'

export function createVitePlugins(viteEnv, isBuild) {
    const plugins = [
        vue(),
        VueSetupExtend(),
      ]
    
      return plugins
}