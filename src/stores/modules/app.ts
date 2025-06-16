import { defineStore } from 'pinia'
import { isMobile } from '@/utils/is'
import type { appType } from '../types'
import { storageLocal } from '@/utils/storage'
import { getConfig, responsiveStorageNameSpace } from '@/config'
import { store } from '../index'

export const useAppStore = defineStore('pure-app', {
  state: (): appType => ({
    sidebar: {
      opened:
        storageLocal.get<StorageConfigs>(`${responsiveStorageNameSpace()}layout`)?.sidebarStatus ??
        getConfig().SidebarStatus,
      withoutAnimation: false,
      isClickCollapse: false,
    },
    // 这里的layout用于监听容器拖拉后恢复对应的导航模式
    layout: storageLocal.get<StorageConfigs>(`${responsiveStorageNameSpace()}layout`)?.layout ?? getConfig().Layout,
    device: isMobile() ? 'mobile' : 'desktop',
    // 浏览器窗口的可视区域大小
    viewportSize: {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    },
    // 作用于 src/views/components/draggable/index.vue 页面，当离开页面并不会销毁 new Swap()，sortablejs 官网也没有提供任何销毁的 api
    sortSwap: false,
  }),
  getters: {
    getSidebarStatus(state) {
      return state.sidebar.opened
    },
    getDevice(state) {
      return state.device
    },
    getViewportWidth(state) {
      return state.viewportSize.width
    },
    getViewportHeight(state) {
      return state.viewportSize.height
    },
  },
  actions: {
    TOGGLE_SIDEBAR(opened?: boolean, resize?: string) {
      const layout = storageLocal.get<StorageConfigs>(`${responsiveStorageNameSpace()}layout`)
      if (opened && resize) {
        this.sidebar.withoutAnimation = true
        this.sidebar.opened = true
        layout.sidebarStatus = true
      } else if (!opened && resize) {
        this.sidebar.withoutAnimation = true
        this.sidebar.opened = false
        layout.sidebarStatus = false
      } else if (!opened && !resize) {
        this.sidebar.withoutAnimation = false
        this.sidebar.opened = !this.sidebar.opened
        this.sidebar.isClickCollapse = !this.sidebar.opened
        layout.sidebarStatus = this.sidebar.opened
      }
      storageLocal.set(`${responsiveStorageNameSpace()}layout`, layout)
    },
    async toggleSideBar(opened?: boolean, resize?: string) {
      await this.TOGGLE_SIDEBAR(opened, resize)
    },
    toggleDevice(device: string) {
      this.device = device
    },
    setLayout(layout) {
      this.layout = layout
    },
    setViewportSize(size) {
      this.viewportSize = size
    },
    setSortSwap(val) {
      this.sortSwap = val
    },
  },
})

export function useAppStoreHook() {
  return useAppStore(store)
}
