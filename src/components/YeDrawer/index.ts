import { ref } from 'vue'
import { useTimeoutFn } from '@vueuse/core'
import type { DrawerOptions } from './type'

const drawerStore = ref<Array<DrawerOptions>>([])

/**
 * 添加抽屉窗口
 * @param options 抽屉配置选项
 * @description 根据配置选项打开抽屉窗口，支持延迟打开功能
 */
const addDrawer = (options: DrawerOptions) => {
  const open = () => drawerStore.value.push(Object.assign(options, { visible: true }))
  if (options?.openDelay) {
    useTimeoutFn(() => {
      open()
    }, options.openDelay)
  } else {
    open()
  }
}

/**
 * 关闭抽屉
 * @param options - 抽屉配置选项
 * @param index - 抽屉在store中的索引
 * @param args - 可选参数，传递给关闭回调函数
 * @description
 * 1. 设置抽屉不可见
 * 2. 执行关闭回调函数(如果配置了)
 * 3. 延迟指定时间后从store中移除该抽屉
 */
const closeDrawer = (options: DrawerOptions, index: number, args?: any) => {
  drawerStore.value[index].visible = false
  options.closeCallBack && options.closeCallBack({ options, index, args })

  const closeDelay = options?.closeDelay ?? 200
  useTimeoutFn(() => {
    drawerStore.value.splice(index, 1)
  }, closeDelay)
}

/**
 * @description 更改抽屉自身属性值
 * @param value 属性值
 * @param key 属性，默认`title`
 * @param index 弹框索引（默认`0`，代表只有一个弹框，对于嵌套弹框要改哪个弹框的属性值就把该弹框索引赋给`index`）
 */
const updateDrawer = (value: any, key = 'title', index = 0) => {
  drawerStore.value[index][key] = value
}

/**
 * 关闭所有抽屉 (清空抽屉状态存储)
 */
const closeAllDrawer = () => {
  drawerStore.value = []
}

export { drawerStore, addDrawer, closeDrawer, updateDrawer, closeAllDrawer }
