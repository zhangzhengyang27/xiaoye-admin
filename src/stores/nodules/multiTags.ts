import { defineStore } from 'pinia'
import {
  type multiType,
  type positionType,
  store,
  isUrl,
  isEqual,
  isNumber,
  isBoolean,
  getConfig,
  routerArrays,
  storageLocal,
  responsiveStorageNameSpace,
} from '../utils'

// 在文件顶部定义
const STORAGE_CONFIG_KEY = `${responsiveStorageNameSpace()}configure`
const STORAGE_TAGS_KEY = `${responsiveStorageNameSpace()}tags`

/**
 * 多标签页状态管理 store
 *
 * 用于管理系统中打开的多标签页状态，包括：
 * - 存储当前打开的标签页路由信息
 * - 控制标签页缓存功能
 * - 提供标签页的增删改查操作
 *
 * @state multiTags - 当前打开的标签页路由信息数组
 * @state multiTagsCache - 是否启用标签页缓存
 *
 * @getter getMultiTagsCache - 获取当前缓存状态
 *
 * @action multiTagsCacheChange - 切换标签页缓存状态
 * @action tagsCache - 条件缓存标签页数据
 * @action handleTags - 处理标签页操作（添加/删除/替换/切片等）
 */
export const useMultiTagsStore = defineStore('pure-multiTags', {
  state: () => ({
    // 存储标签页信息（路由信息）
    multiTags: storageLocal.get<StorageConfigs>(STORAGE_CONFIG_KEY)?.multiTagsCache
      ? storageLocal.get<StorageConfigs>(STORAGE_TAGS_KEY)
      : ([...routerArrays] as any),

    multiTagsCache: storageLocal.get<StorageConfigs>(STORAGE_CONFIG_KEY)?.multiTagsCache,
  }),
  getters: {
    getMultiTagsCache(state) {
      return state.multiTagsCache
    },
  },
  actions: {
    multiTagsCacheChange(multiTagsCache: boolean) {
      this.multiTagsCache = multiTagsCache
      if (multiTagsCache) {
        storageLocal.set(STORAGE_TAGS_KEY, this.multiTags)
      } else {
        storageLocal.remove(STORAGE_TAGS_KEY)
      }
    },
    tagsCache(multiTags) {
      this.getMultiTagsCache && storageLocal.set(STORAGE_TAGS_KEY, multiTags)
    },
    handleTags<T>(mode: string, value?: T | multiType, position?: positionType): T {
      switch (mode) {
        case 'equal':
          this.multiTags = value
          this.tagsCache(this.multiTags)
          break
        case 'push':
          {
            const tagVal = value as multiType
            // 不添加到标签页
            if (tagVal?.meta?.hiddenTag) return
            // 如果是外链无需添加信息到标签页
            if (isUrl(tagVal?.name)) return
            // 如果title为空拒绝添加空信息到标签页
            if (tagVal?.meta?.title.length === 0) return
            // showLink:false 不添加到标签页
            if (isBoolean(tagVal?.meta?.showLink) && !tagVal?.meta?.showLink) return
            const tagPath = tagVal.path
            // 判断tag是否已存在
            const tagHasExits = this.multiTags.some((tag) => {
              return tag.path === tagPath
            })

            // 判断tag中的query键值是否相等
            const tagQueryHasExits = this.multiTags.some((tag) => {
              return isEqual(tag?.query, tagVal?.query)
            })

            // 判断tag中的params键值是否相等
            const tagParamsHasExits = this.multiTags.some((tag) => {
              return isEqual(tag?.params, tagVal?.params)
            })

            if (tagHasExits && tagQueryHasExits && tagParamsHasExits) return

            // 动态路由可打开的最大数量
            const dynamicLevel = tagVal?.meta?.dynamicLevel ?? -1
            if (dynamicLevel > 0) {
              if (this.multiTags.filter((e) => e?.path === tagPath).length >= dynamicLevel) {
                // 如果当前已打开的动态路由数大于dynamicLevel，替换第一个动态路由标签
                const index = this.multiTags.findIndex((item) => item?.path === tagPath)
                index !== -1 && this.multiTags.splice(index, 1)
              }
            }
            this.multiTags.push(value)
            this.tagsCache(this.multiTags)
            if (getConfig()?.MaxTagsLevel && isNumber(getConfig().MaxTagsLevel)) {
              if (this.multiTags.length > getConfig().MaxTagsLevel) {
                this.multiTags.splice(1, 1)
              }
            }
          }
          break
        case 'splice':
          if (!position) {
            const index = this.multiTags.findIndex((v) => v.path === value)
            if (index === -1) return
            this.multiTags.splice(index, 1)
          } else {
            this.multiTags.splice(position?.startIndex, position?.length)
          }
          this.tagsCache(this.multiTags)
          return this.multiTags
        case 'slice':
          return this.multiTags.slice(-1)
      }
    },
  },
})

export function useMultiTagsStoreHook() {
  return useMultiTagsStore(store)
}
