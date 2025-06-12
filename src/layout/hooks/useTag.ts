import { ref, unref, computed, reactive, onMounted, type CSSProperties, getCurrentInstance } from 'vue'
import type { tagsViewsType } from '../types'
import { useRoute, useRouter } from 'vue-router'

import { responsiveStorageNameSpace } from '@/config'
import { useSettingStoreHook } from '@/stores/modules/settings'
import { useMultiTagsStoreHook } from '@/stores/modules/multiTags'

// 静态资源
import Fullscreen from '~icons/ri/fullscreen-fill'
import CloseAllTags from '~icons/ri/subtract-line'
import CloseOtherTags from '~icons/ri/text-spacing'
import CloseRightTags from '~icons/ri/text-direction-l'
import CloseLeftTags from '~icons/ri/text-direction-r'
import RefreshRight from '~icons/ep/refresh-right'
import Close from '~icons/ep/close'
import { storageLocal } from '@/utils/storage'
import { isBoolean, isEqual } from '@/utils/is'
import { hasClass, toggleClass } from '@/utils/class'

export function useTags() {
  const route = useRoute()
  const router = useRouter()
  const instance = getCurrentInstance()
  const pureSetting = useSettingStoreHook()

  const buttonTop = ref(0)
  const buttonLeft = ref(0)
  const translateX = ref(0)
  const visible = ref(false)
  const activeIndex = ref(-1)

  // 当前右键选中的路由信息
  const currentSelect = ref({})
  const isScrolling = ref(false)

  /** 显示模式，默认灵动模式 */
  const showModel = ref(
    storageLocal.get<StorageConfigs>(`${responsiveStorageNameSpace()}configure`)?.showModel || 'smart',
  )

  /** 是否隐藏标签页，默认显示 */
  const showTags = ref(
    storageLocal.get<StorageConfigs>(`${responsiveStorageNameSpace()}configure`)?.hideTabs ?? 'false',
  )

  const multiTags: any = computed(() => {
    return useMultiTagsStoreHook().multiTags
  })

  const tagsViews = reactive<Array<tagsViewsType>>([
    {
      icon: RefreshRight,
      text: '重新加载',
      divided: false,
      disabled: false,
      show: true,
    },
    {
      icon: Close,
      text: '关闭当前标签页',
      divided: false,
      disabled: multiTags.value.length > 1 ? false : true,
      show: true,
    },
    {
      icon: CloseLeftTags,
      text: '关闭左侧的标签页',
      divided: true,
      disabled: multiTags.value.length > 1 ? false : true,
      show: true,
    },
    {
      icon: CloseRightTags,
      text: '关闭右侧的标签页',
      divided: false,
      disabled: multiTags.value.length > 1 ? false : true,
      show: true,
    },
    {
      icon: CloseOtherTags,
      text: '关闭其他标签页',
      divided: true,
      disabled: multiTags.value.length > 2 ? false : true,
      show: true,
    },
    {
      icon: CloseAllTags,
      text: '关闭全部标签页',
      divided: false,
      disabled: multiTags.value.length > 1 ? false : true,
      show: true,
    },
    {
      icon: Fullscreen,
      text: '内容区全屏',
      divided: true,
      disabled: false,
      show: true,
    },
  ])

  /**
   * 根据路由条件处理返回 previous 或 next 值
   * @param item 当前路由项
   * @param previous 条件为真时返回的值
   * @param next 条件为假时返回的值
   * @returns 根据路由匹配情况返回 previous 或 next
   * @description
   * 1. 如果路由 meta.showLink 为 false，则比较 query 或 params 是否相等
   * 2. 否则直接比较 path 是否相等
   */
  function conditionHandle(item, previous, next) {
    if (isBoolean(route?.meta?.showLink) && route?.meta?.showLink === false) {
      if (Object.keys(route.query).length > 0) {
        return isEqual(route.query, item.query) ? previous : next
      } else {
        return isEqual(route.params, item.params) ? previous : next
      }
    } else {
      return route.path === item.path ? previous : next
    }
  }

  /**
   * 判断标签是否固定
   * @param item - 路由项
   * @returns 返回布尔值，表示标签是否固定
   */
  const isFixedTag = computed(() => {
    return (item) => {
      const fixed = item?.meta?.fixedTag
      return isBoolean(fixed) && fixed
    }
  })

  /**
   * 计算图标是否处于激活状态
   * @param item - 当前项
   * @param index - 当前索引
   * @returns 返回布尔值表示是否激活，首项始终返回undefined
   */
  const iconIsActive = computed(() => {
    return (item, index) => {
      if (index === 0) return
      return conditionHandle(item, true, false)
    }
  })

  /**
   * 计算当前链接是否处于激活状态
   * @param item - 需要检查的链接项
   * @returns 返回一个计算属性，判断给定链接项是否处于激活状态
   */
  const linkIsActive = computed(() => {
    return (item) => {
      return conditionHandle(item, 'is-active', '')
    }
  })

  /**
   * 计算当前项是否为排班激活状态
   * @param item 待检查的项
   * @returns 返回经过条件处理后的排班激活状态字符串
   */
  const scheduleIsActive = computed(() => {
    return (item) => {
      return conditionHandle(item, 'schedule-active', '')
    }
  })

  /**
   * 计算标签页的滑动样式
   * @returns {CSSProperties} 包含transform和transition的样式对象
   */
  const getTabStyle = computed((): CSSProperties => {
    return {
      transform: `translateX(${translateX.value}px)`,
      transition: isScrolling.value ? 'none' : 'transform 0.5s ease-in-out',
    }
  })

  /**
   * 计算上下文菜单的样式，根据按钮位置返回CSS属性对象
   * @returns 包含 left 和 top 属性的 CSS 样式对象
   */
  const getContextMenuStyle = computed((): CSSProperties => {
    return { left: buttonLeft.value + 'px', top: buttonTop.value + 'px' }
  })

  const closeMenu = () => {
    visible.value = false
  }

  /**
   * 鼠标移入添加激活样式
   */
  /**
   * 处理鼠标移入事件
   * @param index - 当前触发事件的索引值
   * @description
   * - 当showModel为'smart'模式时，为对应schedule元素添加进出动画类名
   * - 其他模式下，为对应dynamic元素添加卡片进出动画类名
   * - 如果元素已处于激活状态则跳过处理
   */
  function onMouseenter(index) {
    if (index) activeIndex.value = index
    if (unref(showModel) === 'smart') {
      if (hasClass(instance.refs['schedule' + index][0], 'schedule-active')) return
      toggleClass(instance.refs['schedule' + index][0], 'schedule-in')
      toggleClass(instance.refs['schedule' + index][0], 'schedule-out')
    } else {
      if (hasClass(instance.refs['dynamic' + index][0], 'is-active')) return
      toggleClass(instance.refs['dynamic' + index][0], 'card-in')
      toggleClass(instance.refs['dynamic' + index][0], 'card-out')
    }
  }

  /**
   * 处理鼠标离开标签时的逻辑
   * @param index - 当前标签的索引
   * @description
   * - 当显示模式为'smart'时，操作schedule元素的类名
   * - 其他模式下，操作dynamic元素的类名
   * - 如果元素已有活动状态类名则不做处理
   */
  function onMouseleave(index) {
    activeIndex.value = -1
    if (unref(showModel) === 'smart') {
      if (hasClass(instance.refs['schedule' + index][0], 'schedule-active')) return
      toggleClass(instance.refs['schedule' + index][0], 'schedule-in')
      toggleClass(instance.refs['schedule' + index][0], 'schedule-out')
    } else {
      if (hasClass(instance.refs['dynamic' + index][0], 'is-active')) return
      toggleClass(instance.refs['dynamic' + index][0], 'card-in')
      toggleClass(instance.refs['dynamic' + index][0], 'card-out')
    }
  }

  /**
   * 切换内容区域全屏显示状态（显示/隐藏侧边栏）
   */
  function onContentFullScreen() {
    pureSetting.changeSetting({
      key: 'hiddenSideBar',
      value: !pureSetting.hiddenSideBar,
    })
  }

  onMounted(() => {
    if (!showModel.value) {
      const configure = storageLocal.get<StorageConfigs>(`${responsiveStorageNameSpace()}configure`)
      configure.showModel = 'card'
      storageLocal.set(`${responsiveStorageNameSpace()}configure`, configure)
    }
  })

  return {
    Close,
    route,
    router,
    visible,
    showTags,
    instance,
    multiTags,
    showModel,
    tagsViews,
    buttonTop,
    buttonLeft,
    translateX,
    isFixedTag,
    pureSetting,
    activeIndex,
    getTabStyle,
    isScrolling,
    iconIsActive,
    linkIsActive,
    currentSelect,
    scheduleIsActive,
    getContextMenuStyle,
    closeMenu,
    onMounted,
    onMouseenter,
    onMouseleave,
    onContentFullScreen,
  }
}
