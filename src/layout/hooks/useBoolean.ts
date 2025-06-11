import { ref } from 'vue'

/**
 * 提供一个布尔值状态及其操作方法
 * @param initValue 初始布尔值，默认为 false
 * @returns 包含以下属性的对象:
 *   - bool: 响应式布尔值引用
 *   - setBool: 设置布尔值的方法
 *   - setTrue: 将值设为 true 的方法
 *   - setFalse: 将值设为 false 的方法
 *   - toggle: 切换布尔值的方法
 */
export function useBoolean(initValue = false) {
  const bool = ref(initValue)

  function setBool(value: boolean) {
    bool.value = value
  }

  function setTrue() {
    bool.value = true
  }

  function setFalse() {
    bool.value = false
  }

  function toggle() {
    bool.value = !bool.value
  }

  return {
    bool,
    setBool,
    setTrue,
    setFalse,
    toggle,
  }
}
