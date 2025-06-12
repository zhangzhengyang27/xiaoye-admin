import { defineStore } from 'pinia'
export { store } from '@/stores'
export { routerArrays } from '@/layout/types'
export { router, resetRouter, constantMenus } from '@/router'
export { getConfig, responsiveStorageNameSpace } from '@/config'

import { useMultiTagsStoreHook } from './multiTags'
import {
  ascending,
  filterNoPermissionTree,
  filterTree,
  formatFlatteningRoutes,
} from '@/router/utils'
import type { cacheType } from '../types'
import { debounce, getKeyList } from '@/utils/common'
import { store } from '@/stores'

export const usePermissionStore = defineStore('pure-permission', {
  state: () => ({
    // 静态路由生成的菜单
    constantMenus,
    // 整体路由生成的菜单（静态、动态）
    wholeMenus: [],
    // 整体路由（一维数组格式）
    flatteningRoutes: [],
    // 缓存页面keepAlive
    cachePageList: [],
  }),
  actions: {
    /**
     * 处理完整菜单数据
     * @param routes - 待合并的路由数组
     * @description 将常量菜单与传入路由合并后，进行权限过滤和扁平化处理
     * 1. 合并常量菜单和传入路由
     * 2. 对合并后的菜单进行升序排序
     * 3. 过滤无权限的菜单项
     * 4. 生成扁平化的路由结构
     */
    handleWholeMenus(routes: any[]) {
      this.wholeMenus = filterNoPermissionTree(
        filterTree(ascending(this.constantMenus.concat(routes))),
      )
      this.flatteningRoutes = formatFlatteningRoutes(this.constantMenus.concat(routes) as any)
    },
    /**
     * 缓存页面操作
     * @param mode - 操作模式：'refresh' | 'add' | 'delete'
     * @param name - 页面名称
     * @description
     * 1. 根据mode执行对应缓存操作：刷新/添加/删除
     * 2. 使用防抖函数检查缓存页面是否存在于标签页，不存在则删除
     */
    cacheOperate({ mode, name }: cacheType) {
      switch (mode) {
        case 'refresh':
          this.cachePageList = this.cachePageList.filter((v) => v !== name)
          break
        case 'add':
          this.cachePageList.push(name)
          break
        case 'delete':
          const delIndex = this.cachePageList.findIndex((v) => v === name)
          delIndex !== -1 && this.cachePageList.splice(delIndex, 1)
          break
      }
      /** 监听缓存页面是否存在于标签页，不存在则删除 */
      debounce(() => {
        let cacheLength = this.cachePageList.length
        const nameList = getKeyList(useMultiTagsStoreHook().multiTags, 'name')
        while (cacheLength > 0) {
          nameList.findIndex((v) => v === this.cachePageList[cacheLength - 1]) === -1 &&
            this.cachePageList.splice(
              this.cachePageList.indexOf(this.cachePageList[cacheLength - 1]),
              1,
            )
          cacheLength--
        }
      })()
    },
    /** 清空缓存页面 */
    clearAllCachePage() {
      this.wholeMenus = []
      this.cachePageList = []
    },
  },
})

export function usePermissionStoreHook() {
  return usePermissionStore(store)
}
