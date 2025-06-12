import type { menuType } from '@/layout/types'
import { useMultiTagsStoreHook } from '@/stores/modules/multiTags'
import { usePermissionStoreHook } from '@/stores/modules/permission'
import { intersection } from '@/utils/array'
import { userKey, type DataInfo } from '@/utils/auth'
import { isAllEmpty } from '@/utils/common'
import { storageLocal } from '@/utils/storage'
import { buildHierarchyTree } from '@/utils/tree'
import cloneDeep from 'lodash.clonedeep'
import {
  type RouterHistory,
  type RouteRecordRaw,
  type RouteComponent,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'

/**
 * 判断路由是否需要处理排名
 * @param routeInfo 路由信息对象，包含name、path、parentId和meta等属性
 * @returns 返回布尔值，true表示需要处理排名，false表示不需要
 * parentId 为空时并且满足以下两个子条件之一：
 * 1. meta.rank 也为空（即 meta 不存在或 meta.rank 为 null/undefined/''）
 * 2. 或者 meta.rank === 0，同时该路由不是首页（name !== 'Home' 且 path !== '/'）
 */
function handRank(routeInfo: any): boolean {
  const { name, path, parentId, meta } = routeInfo

  if (isAllEmpty(parentId)) {
    if (isAllEmpty(meta?.rank) || (meta?.rank === 0 && name !== 'Home' && path !== '/')) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

/**
 * 对路由数组进行升序排序
 * @param arr 路由数组
 * @returns 排序后的路由数组
 * @description
 * - 当路由的rank不存在时，会根据数组顺序自动创建rank值
 * - 首页路由(rank=undefined)会永远排在第一位
 * - 其他路由的rank值从2开始递增(index+2)
 */
function ascending(arr: any[]) {
  arr.forEach((v, index) => {
    // 当rank不存在时，根据顺序自动创建，首页路由永远在第一位
    if (handRank(v)) {
      v.meta.rank = index + 2
    }
  })
  return arr.sort((a: { meta: { rank: number } }, b: { meta: { rank: number } }) => {
    return a?.meta.rank - b?.meta.rank
  })
}

/**
 * 过滤路由树，移除所有 meta.showLink 为 false 的节点
 * @param data 原始路由树数据
 * @returns 过滤后的新路由树
 */
function filterTree(data: RouteComponent[]) {
  const newTree = cloneDeep(data).filter(
    (v: { meta: { showLink: boolean } }) => v.meta?.showLink !== false,
  )
  newTree.forEach((v: { children }) => v.children && (v.children = filterTree(v.children)))
  return newTree
}

/**
 * 过滤路由树中的空子节点
 * @param data 路由组件数组
 * @returns 过滤后的新路由树，确保每个节点的children不为空数组
 */
function filterChildrenTree(data: RouteComponent[]) {
  const newTree = cloneDeep(data).filter((v: any) => v?.children?.length !== 0)
  newTree.forEach((v: { children }) => v.children && (v.children = filterTree(v.children)))
  return newTree
}

/**
 * 检查两个字符串数组是否存在交集元素
 * @param a - 第一个字符串数组
 * @param b - 第二个字符串数组
 * @returns 如果存在交集元素返回true，否则返回false。如果任一参数不是数组则直接返回true
 */
function isOneOfArray(a: Array<string>, b: Array<string>): boolean {
  if (Array.isArray(a) && Array.isArray(b)) {
    const hasCommonElements = intersection(a, b).length > 0
    return hasCommonElements
  } else {
    return true
  }
}

/** 从localStorage里取出当前登录用户的角色 roles，过滤无权限的菜单 */
function filterNoPermissionTree(data: RouteComponent[]) {
  const currentRoles = storageLocal.get<DataInfo<number>>(userKey)?.roles ?? []
  const newTree = cloneDeep(data).filter((v: any) => isOneOfArray(v.meta?.roles, currentRoles))
  newTree.forEach((v: any) => v.children && (v.children = filterNoPermissionTree(v.children)))
  return filterChildrenTree(newTree)
}

/**
 * 将多级嵌套路由处理成一维数组
 * @param routesList 传入路由
 * @returns 返回处理后的一维路由
 */
function formatFlatteningRoutes(routesList: RouteRecordRaw[]) {
  if (routesList.length === 0) return routesList
  let hierarchyList = buildHierarchyTree(routesList)
  for (let i = 0; i < hierarchyList.length; i++) {
    if (hierarchyList[i].children) {
      hierarchyList = hierarchyList
        .slice(0, i + 1)
        .concat(hierarchyList[i].children, hierarchyList.slice(i + 1))
    }
  }
  return hierarchyList
}

function handleTopMenu(route) {
  if (route?.children && route.children.length > 1) {
    if (route.redirect) {
      return route.children.filter((cur) => cur.path === route.redirect)[0]
    } else {
      return route.children[0]
    }
  } else {
    return route
  }
}

/** 获取所有菜单中的第一个菜单（顶级菜单）*/
function getTopMenu(tag = false): menuType {
  const topMenu = handleTopMenu(usePermissionStoreHook().wholeMenus[0]?.children[0])
  tag && useMultiTagsStoreHook().handleTags('push', topMenu)
  return topMenu
}

export { ascending, filterNoPermissionTree, filterTree, formatFlatteningRoutes, getTopMenu }
