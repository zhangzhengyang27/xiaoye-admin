import { defineStore } from 'pinia'
import { store, getConfig, storageLocal, responsiveStorageNameSpace } from '../utils'

// 本地存储中布局配置的key
const LAYOUT_KEY = `${responsiveStorageNameSpace()}layout`

export const useEpThemeStore = defineStore('pure-epTheme', {
  state: () => ({
    epThemeColor: storageLocal.get<StorageConfigs>(LAYOUT_KEY)?.epThemeColor ?? getConfig().EpThemeColor,
    epTheme: storageLocal.get<StorageConfigs>(LAYOUT_KEY)?.theme ?? getConfig().Theme,
  }),
  getters: {
    getEpThemeColor(state) {
      return state.epThemeColor
    },
    /** 用于mix导航模式下hamburger-svg的fill属性 */
    fill(state) {
      if (state.epTheme === 'light') {
        return '#409eff'
      } else {
        return '#fff'
      }
    },
  },
  actions: {
    setEpThemeColor(newColor: string): void {
      const layout = storageLocal.get<StorageConfigs>(LAYOUT_KEY)
      this.epTheme = layout?.theme
      this.epThemeColor = newColor
      if (!layout) return
      layout.epThemeColor = newColor
      storageLocal.set(LAYOUT_KEY, layout)
    },
  },
})

export function useEpThemeStoreHook() {
  return useEpThemeStore(store)
}
