import { storeToRefs } from 'pinia'
import { getConfig } from '@/config'
import { useRouter } from 'vue-router'
import { emitter } from '@/utils/mitt'
import { getTopMenu } from '@/router/utils'
import { useFullscreen } from '@vueuse/core'
import type { routeMetaType } from '../types'
import { router, remainingPaths } from '@/router'
import { computed, type CSSProperties } from 'vue'
import { useAppStoreHook } from '@/stores/modules/app'
import { useUserStoreHook } from '@/stores/modules/user'
import { useEpThemeStoreHook } from '@/stores/modules/epTheme'
import { usePermissionStoreHook } from '@/stores/modules/permission'

// 静态资源
import Avatar from '@/assets/avatar.png'
import ExitFullscreen from '~icons/ri/fullscreen-exit-fill'
import Fullscreen from '~icons/ri/fullscreen-fill'
import { isAllEmpty } from '@/utils/common'
import { useGlobal } from './useGlobal'

const errorInfo = '当前路由配置不正确，请检查配置'

export function useNav() {
  const pureApp = useAppStoreHook()
  // 从当前 Vue Router 实例中获取完整的原始路由表配置
  const routers = useRouter().options.routes
  const { isFullscreen, toggle } = useFullscreen()
  const { wholeMenus } = storeToRefs(usePermissionStoreHook())
  const { $storage, $config } = useGlobal<GlobalPropertiesApi>()

  /** 平台`layout`中所有`el-tooltip`的`effect`配置，默认`light` */
  const tooltipEffect = getConfig()?.TooltipEffect ?? 'light'

  const getDivStyle = computed((): CSSProperties => {
    return {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      overflow: 'hidden',
    }
  })

  /** 头像 */
  const userAvatar = computed(() => {
    return isAllEmpty(useUserStoreHook()?.avatar) ? Avatar : useUserStoreHook()?.avatar
  })

  /** 用户名 */
  const username = computed(() => {
    return isAllEmpty(useUserStoreHook()?.nickname) ? useUserStoreHook()?.username : useUserStoreHook()?.nickname
  })

  const avatarsStyle = computed(() => {
    return username.value ? { marginRight: '10px' } : ''
  })

  /** 是否折叠 */
  const isCollapse = computed(() => {
    return !pureApp.getSidebarStatus
  })

  const device = computed(() => {
    return pureApp.getDevice
  })

  const layout = computed(() => {
    return $storage?.layout?.layout
  })

  const title = computed(() => {
    return $config.Title
  })

  /** 退出登录 */
  function logout() {
    useUserStoreHook().logOut()
  }

  function backTopMenu() {
    router.push(getTopMenu()?.path)
  }

  function onPanel() {
    emitter.emit('openPanel')
  }

  function toAccountSettings() {
    router.push({ name: 'AccountSettings' })
  }

  function toggleSideBar() {
    pureApp.toggleSideBar()
  }

  function handleResize(menuRef) {
    menuRef?.handleResize()
  }

  /**
   * 解析路由路径
   * @param route 路由对象
   * @returns 返回拼接后的完整路径或子路径。若路由包含http链接则拼接父路径，否则直接返回子路径
   * @throws 当路由没有子节点时会抛出错误
   */
  function resolvePath(route) {
    if (!route.children) return console.error(errorInfo)
    const httpReg = /^http(s?):\/\//
    const routeChildPath = route.children[0]?.path
    if (httpReg.test(routeChildPath)) {
      return route.path + '/' + routeChildPath
    } else {
      return routeChildPath
    }
  }

  function menuSelect(indexPath: string) {
    if (wholeMenus.value.length === 0 || isRemaining(indexPath)) return
    emitter.emit('changLayoutRoute', indexPath)
  }

  /** 判断路径是否参与菜单 */
  function isRemaining(path: string) {
    return remainingPaths.includes(path)
  }

  function getLogo() {
    return new URL('/logo.svg', import.meta.url).href
  }

  return {
    title,
    device,
    layout,
    logout,
    routers,
    $storage,
    isFullscreen,
    Fullscreen,
    ExitFullscreen,
    toggle,
    backTopMenu,
    onPanel,
    getDivStyle,
    toggleSideBar,
    menuSelect,
    handleResize,
    resolvePath,
    getLogo,
    isCollapse,
    pureApp,
    username,
    userAvatar,
    avatarsStyle,
    tooltipEffect,
    toAccountSettings,
  }
}
