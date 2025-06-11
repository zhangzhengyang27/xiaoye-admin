import type { RouteRecordName } from 'vue-router'

export type cacheType = {
  mode: string
  name?: RouteRecordName
}

export type positionType = {
  startIndex?: number
  length?: number
}

export type appType = {
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
    // 判断是否手动点击Collapse
    isClickCollapse: boolean
  }
  layout: string
  device: string
  viewportSize: { width: number; height: number }
  sortSwap: boolean
}

/**
 * 多类型路由对象
 * @property {string} path - 路由路径
 * @property {string} name - 路由名称
 * @property {any} meta - 路由元信息
 * @property {object} [query] - 路由查询参数
 * @property {object} [params] - 路由路径参数
 */
export type multiType = {
  path: string
  name: string
  meta: any
  query?: object
  params?: object
}

export type setType = {
  title: string
  fixedHeader: boolean
  hiddenSideBar: boolean
}

export type userType = {
  avatar?: string
  username?: string
  nickname?: string
  roles?: Array<string>
  permissions?: Array<string>
  verifyCode?: string
  currentPage?: number
  isRemembered?: boolean
  loginDay?: number
}
