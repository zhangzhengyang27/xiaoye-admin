/**
 * 封装 localStorage 操作的工具类
 */
export const storageLocal = {
  /**
   * 设置存储项
   * @param key 存储键名
   * @param value 存储值（自动JSON序列化）
   */
  set<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value)
      localStorage.setItem(key, serialized)
    } catch (error) {
      console.error('LocalStorage set error:', error)
    }
  },

  /**
   * 获取存储项
   * @param key 存储键名
   * @returns 解析后的值，如果不存在或解析失败返回null
   */
  get<T>(key: string): T | null {
    try {
      const serialized = localStorage.getItem(key)
      if (serialized === null) return null
      return JSON.parse(serialized) as T
    } catch (error) {
      console.error('LocalStorage get error:', error)
      return null
    }
  },

  /**
   * 移除存储项
   * @param key 存储键名
   */
  remove(key: string): void {
    localStorage.removeItem(key)
  },

  /**
   * 清空所有存储项
   */
  clear(): void {
    localStorage.clear()
  },

  /**
   * 获取所有存储键名
   * @returns 键名数组
   */
  keys(): string[] {
    return Object.keys(localStorage)
  },

  /**
   * 检查键是否存在
   * @param key 存储键名
   */
  has(key: string): boolean {
    return localStorage.getItem(key) !== null
  },
}
