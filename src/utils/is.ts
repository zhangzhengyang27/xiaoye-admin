/**
 * 判断字符串是否为有效URL
 * @param value 待检测的字符串
 * @returns 如果是有效URL返回true，否则返回false
 */
export function isUrl(value: string): boolean {
  if (typeof value !== 'string' || value.trim().length === 0) {
    return false
  }

  try {
    // 使用URL构造函数进行验证
    new URL(value)
    return true
  } catch (_) {
    // 尝试添加http前缀进行验证
    if (!value.startsWith('http://') && !value.startsWith('https://')) {
      try {
        new URL(`https://${value}`)
        return true
      } catch (_) {
        return false
      }
    }
    return false
  }
}

/**
 * 判断是否为函数类型
 * @param value - 要检查的值
 * @returns 如果值是一个函数则返回 true，否则返回 false
 */
export function isFunction(value: any): value is (...args: any[]) => any {
  return typeof value === 'function'
}

/**
 * 判断是否为手机号
 * @param value - 要检查的值
 * @returns 如果值是手机号则返回 true，否则返回 false
 */
export function isPhoneNumber(value: any): boolean {
  const phoneRegex = /^1[3-9]\d{9}$/
  return typeof value === 'string' && phoneRegex.test(value)
}

/**
 * 判断值是否为有效数字
 * @param value 待检测的值
 * @returns 如果是有效数字返回true，否则返回false
 */
export function isNumber(value: unknown): boolean {
  // 处理基本数字类型
  if (typeof value === 'number') {
    // 排除NaN（NaN的类型也是number）
    return !isNaN(value)
  }

  // 处理字符串形式的数字
  if (typeof value === 'string') {
    // 排除空字符串和纯空格
    if (value.trim() === '') return false

    // 使用Number转换并验证
    const num = Number(value)
    return !isNaN(num) && value.trim() === String(num)
  }

  // 其他类型直接返回false
  return false
}

/**
 * 判断值是否为布尔类型
 * @param value 待检测的值
 * @returns 如果是布尔类型返回true，否则返回false
 */
export function isBoolean(value: unknown): value is boolean {
  return value === true || value === false
}

/**
 * 判断两个值是否相等（深度比较）
 * @param a 第一个值
 * @param b 第二个值
 * @returns 如果相等返回true，否则返回false
 */
export function isEqual(a: unknown, b: unknown): boolean {
  // 处理基本类型和引用相同的情况
  if (a === b) return true

  // 处理NaN特殊情况
  if (Number.isNaN(a) && Number.isNaN(b)) return true

  // 处理null/undefined情况
  if (a == null || b == null) return a === b

  // 处理日期对象
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime()
  }

  // 处理数组
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false
    return a.every((item, index) => isEqual(item, b[index]))
  }

  // 处理对象
  if (typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a as object)
    const keysB = Object.keys(b as object)

    if (keysA.length !== keysB.length) return false
    return keysA.every((key) => isEqual((a as any)[key], (b as any)[key]))
  }

  // 其他情况
  return false
}

/**
 * 检测当前设备是否为移动端
 * @returns 如果是移动设备返回true，否则返回false
 */
export function isMobile(): boolean {
  // 优先使用navigator.userAgentData（现代浏览器）
  if ((navigator as any).userAgentData?.mobile) {
    return true
  }

  // 传统userAgent检测
  const userAgent = navigator.userAgent.toLowerCase()
  const mobileKeywords = ['android', 'iphone', 'ipod', 'ipad', 'windows phone', 'blackberry', 'opera mini', 'mobile']

  // 检查屏幕尺寸（辅助判断）
  const isSmallScreen = window.innerWidth < 768

  return mobileKeywords.some((keyword) => userAgent.includes(keyword)) || isSmallScreen
}

/**
 * 判断值是否为字符串
 * @param val 待检测的值
 * @returns 如果是字符串返回true，否则返回false
 */
export function isString(val: unknown): val is string {
  return typeof val === 'string'
}
