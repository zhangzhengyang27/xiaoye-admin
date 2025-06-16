import { ref } from 'vue'
import { useTimeoutFn } from '@vueuse/core'
import type { EventType, ArgsType, DialogProps, ButtonProps, DialogOptions } from './type'

const dialogStore = ref<Array<DialogOptions>>([])

/**
 * 添加对话框
 * @param options 对话框配置选项
 * @description 根据配置选项添加对话框，支持延迟打开功能
 */
const addDialog = (options: DialogOptions) => {
  const open = () => dialogStore.value.push(Object.assign(options, { visible: true }))
  if (options?.openDelay) {
    useTimeoutFn(() => {
      open()
    }, options.openDelay)
  } else {
    open()
  }
}

/**
 * 关闭对话框
 * @param options 对话框配置选项
 * @param index 对话框在store中的索引位置
 * @param args 可选参数，传递给关闭回调函数
 * @description
 * 1. 隐藏对话框
 * 2. 执行关闭回调函数
 * 3. 延迟指定时间后从store中移除对话框
 */
const closeDialog = (options: DialogOptions, index: number, args?: any) => {
  dialogStore.value[index].visible = false
  options.closeCallBack && options.closeCallBack({ options, index, args })

  const closeDelay = options?.closeDelay ?? 200
  useTimeoutFn(() => {
    dialogStore.value.splice(index, 1)
  }, closeDelay)
}

/**
 * @description 更改弹框自身属性值
 * @param value 属性值
 * @param key 属性，默认`title`
 * @param index 弹框索引（默认`0`，代表只有一个弹框，对于嵌套弹框要改哪个弹框的属性值就把该弹框索引赋给`index`）
 */
const updateDialog = (value: any, key = 'title', index = 0) => {
  dialogStore.value[index][key] = value
}

/** 关闭所有弹框 */
const closeAllDialog = () => {
  dialogStore.value = []
}

export { dialogStore, addDialog, closeDialog, updateDialog, closeAllDialog }
