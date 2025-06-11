import { ref } from 'vue'
import { getConfig } from '@/config'
import { useLayout } from './useLayout'
import { removeToken } from '@/utils/auth'
import { routerArrays } from '@/layout/types'
import { router, resetRouter } from '@/router'
import type { themeColorsType } from '../types'
import { useAppStoreHook } from '@/stores/modules/app'
import { useGlobal } from './useGlobal'
import { useEpThemeStoreHook } from '@/stores/modules/epTheme'
import { useMultiTagsStoreHook } from '@/stores/modules/multiTags'
import { darken, lighten } from '@/utils/color'
import { storageLocal } from '@/utils/storage'

export function useDataThemeChange() {
  const { layoutTheme, layout } = useLayout()
  const themeColors = ref<Array<themeColorsType>>([
    /* 亮白色 */
    { color: '#ffffff', themeColor: 'light' },
    /* 道奇蓝 */
    { color: '#1b2a47', themeColor: 'default' },
    /* 深紫罗兰色 */
    { color: '#722ed1', themeColor: 'saucePurple' },
    /* 深粉色 */
    { color: '#eb2f96', themeColor: 'pink' },
    /* 猩红色 */
    { color: '#f5222d', themeColor: 'dusk' },
    /* 橙红色 */
    { color: '#fa541c', themeColor: 'volcano' },
    /* 绿宝石 */
    { color: '#13c2c2', themeColor: 'mingQing' },
    /* 酸橙绿 */
    { color: '#52c41a', themeColor: 'auroraGreen' },
  ])

  const { $storage } = useGlobal<GlobalPropertiesApi>()
  const dataTheme = ref<boolean>($storage?.layout?.darkMode)
  const overallStyle = ref<string>($storage?.layout?.overallStyle)
  const body = document.documentElement as HTMLElement

  /**
   * 切换目标元素的指定类名
   * @param flag - 是否添加类名（true 添加，false 移除）
   * @param clsName - 要切换的类名字符串
   * @param [target] - 目标元素，默认为 document.body
   */
  function toggleClass(flag: boolean, clsName: string, target?: HTMLElement) {
    const targetEl = target || document.body
    let { className } = targetEl
    className = className.replace(clsName, '').trim()
    targetEl.className = flag ? `${className} ${clsName}` : className
  }

  /** 设置导航主题色 */
  function setLayoutThemeColor(theme = getConfig().Theme ?? 'light', isClick = true) {
    layoutTheme.value.theme = theme
    document.documentElement.setAttribute('data-theme', theme)
    // 如果非isClick，保留之前的themeColor
    const storageThemeColor = $storage.layout.themeColor
    $storage.layout = {
      layout: layout.value,
      theme,
      darkMode: dataTheme.value,
      sidebarStatus: $storage.layout?.sidebarStatus,
      epThemeColor: $storage.layout?.epThemeColor,
      themeColor: isClick ? theme : storageThemeColor,
      overallStyle: overallStyle.value,
    }

    if (theme === 'default' || theme === 'light') {
      setEpThemeColor(getConfig().EpThemeColor)
    } else {
      const colors = themeColors.value.find((v) => v.themeColor === theme)
      setEpThemeColor(colors.color)
    }
  }

  /**
   * 根据当前主题模式（暗色/亮色）设置Element Plus主色系的衍生色
   * @param mode - 颜色模式（'light'或'dark'）
   * @param i - 色阶索引（0-10）
   * @param color - 基础颜色值
   */
  function setPropertyPrimary(mode: string, i: number, color: string) {
    document.documentElement.style.setProperty(
      `--el-color-primary-${mode}-${i}`,
      dataTheme.value ? darken(color, i / 10) : lighten(color, i / 10),
    )
  }

  /**
   * 设置 Element Plus 主题色
   * @param color - 需要设置的主题色值
   * @description
   * 1. 更新主题色存储状态
   * 2. 设置根元素的 CSS 变量 --el-color-primary
   * 3. 为暗色模式设置2个深浅变体
   * 4. 为亮色模式设置9个深浅变体
   */
  const setEpThemeColor = (color: string) => {
    useEpThemeStoreHook().setEpThemeColor(color)
    document.documentElement.style.setProperty('--el-color-primary', color)
    for (let i = 1; i <= 2; i++) {
      setPropertyPrimary('dark', i, color)
    }
    for (let i = 1; i <= 9; i++) {
      setPropertyPrimary('light', i, color)
    }
  }

  /**
   * 切换主题样式
   * @param overall - 可选的整体样式名称，用于覆盖当前主题
   * @description
   * 1. 根据当前主题状态切换布局颜色
   * 2. 处理暗黑模式切换逻辑
   *   - 当启用暗黑模式时，为文档根元素添加'dark'类
   *   - 当关闭暗黑模式且当前主题为light时，强制设置为light主题
   */
  function dataThemeChange(overall?: string) {
    overallStyle.value = overall
    if (useEpThemeStoreHook().epTheme === 'light' && dataTheme.value) {
      setLayoutThemeColor('default', false)
    } else {
      setLayoutThemeColor(useEpThemeStoreHook().epTheme, false)
    }

    if (dataTheme.value) {
      document.documentElement.classList.add('dark')
    } else {
      if ($storage.layout.themeColor === 'light') {
        setLayoutThemeColor('light', false)
      }
      document.documentElement.classList.remove('dark')
    }
  }

  /**
   * 重置应用状态并跳转至登录页
   *
   * 功能说明：
   * 1. 清除本地存储的token和缓存数据
   * 2. 重置应用配置（主题色、布局模式等）
   * 3. 重置多标签页状态
   * 4. 重置路由状态
   * 5. 跳转至登录页
   */
  function onReset() {
    removeToken()
    storageLocal.clear()
    const { Grey, Weak, MultiTagsCache, EpThemeColor, Layout } = getConfig()
    useAppStoreHook().setLayout(Layout)
    setEpThemeColor(EpThemeColor)
    useMultiTagsStoreHook().multiTagsCacheChange(MultiTagsCache)
    toggleClass(Grey, 'html-grey', document.querySelector('html'))
    toggleClass(Weak, 'html-weakness', document.querySelector('html'))
    router.push('/login')
    useMultiTagsStoreHook().handleTags('equal', [...routerArrays])
    resetRouter()
  }
}
