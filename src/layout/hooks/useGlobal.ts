import { getCurrentInstance, type ComponentInternalInstance } from 'vue'

/**
 * 获取当前组件实例的全局属性
 * @returns 返回全局属性API对象
 * @example
 * const { $config } = useGlobal<GlobalPropertiesApi>()
 */
export function useGlobal<T = GlobalPropertiesApi>() {
  const instance = getCurrentInstance() as ComponentInternalInstance
  return instance?.appContext.app.config.globalProperties as T
}
