import { useEventListener } from '@vueuse/core'
import type { Directive, DirectiveBinding } from 'vue'
import { subBefore, subAfter } from '@pureadmin/utils'
import { isFunction } from '@/utils/is'

/**
 * 长按指令 v-longpress
 * Longpress directive
 *
 * 功能：元素长按触发回调，支持单次触发和间隔触发两种模式
 * Features: Trigger callback on long press, supports one-time and interval modes
 *
 * 使用方式：
 * Usage:
 * - 单次触发: v-longpress="callback" 或 v-longpress:2000="callback" (2000ms后触发)
 *   One-time: v-longpress="callback" or v-longpress:2000="callback" (trigger after 2000ms)
 * - 间隔触发: v-longpress:1000:500="callback" (1000ms后首次触发，之后每500ms触发一次)
 *   Interval: v-longpress:1000:500="callback" (first trigger after 1000ms, then every 500ms)
 */
export const longpress: Directive = {
  /**
   * 指令挂载时调用
   * @param el 指令绑定的元素
   * @param binding 指令绑定对象
   */
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const cb = binding.value
    if (cb && isFunction(cb)) {
      let timer = null // 单次触发定时器 One-time trigger timer
      let interTimer = null // 间隔触发定时器 Interval trigger timer
      let num = 500 // 默认延迟时间(ms) Default delay time(ms)
      let interNum = null // 间隔触发时间(ms) Interval trigger time(ms)

      // 检查是否是间隔触发模式
      const isInter = binding?.arg?.includes(':') ?? false

      if (isInter) {
        // 格式: v-longpress:延迟时间:间隔时间 Format: v-longpress:delay:interval
        num = Number(subBefore(binding.arg, ':'))
        interNum = Number(subAfter(binding.arg, ':'))
      } else if (binding.arg) {
        // 格式: v-longpress:延迟时间 Format: v-longpress:delay
        num = Number(binding.arg)
      }

      /**
       * 清理所有定时器
       * Clear all timers
       */
      const clear = () => {
        if (timer) {
          clearTimeout(timer)
          timer = null
        }
        if (interTimer) {
          clearInterval(interTimer)
          interTimer = null
        }
      }

      /**
       * 间隔触发处理函数
       * Interval trigger handler
       * @param ev Pointer事件 Pointer event
       */
      const onDownInter = (ev: PointerEvent) => {
        ev.preventDefault()
        if (interTimer === null) {
          interTimer = setInterval(() => cb(), interNum)
        }
      }

      /**
       * 按下事件处理函数
       * Pointer down handler
       * @param ev Pointer事件 Pointer event
       */
      const onDown = (ev: PointerEvent) => {
        clear() // 先清理之前的定时器
        ev.preventDefault()
        if (timer === null) {
          timer = isInter
            ? setTimeout(() => {
                cb() // 首次触发
                onDownInter(ev) // 启动间隔触发
              }, num)
            : setTimeout(() => cb(), num) // 单次触发
        }
      }

      // 添加事件监听
      useEventListener(el, 'pointerdown', onDown)
      useEventListener(el, 'pointerup', clear)
      useEventListener(el, 'pointerleave', clear)
    } else {
      throw new Error(
        '[Directive: longpress]: need callback and callback must be a function! Like v-longpress="callback"',
      )
    }
  },
}
