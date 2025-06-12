/**
 * 生成指定范围内的随机整数
 * @param min - 最小值（包含）
 * @param max - 最大值（不包含）
 * @returns 返回 min 和 max 之间的随机整数
 */
export function randomNum(min: number, max: number) {
  const num = Math.floor(Math.random() * (max - min) + min)
  return num
}

/**
 * 生成随机 RGB 颜色
 * @param min - 颜色分量最小值 (0-255)
 * @param max - 颜色分量最大值 (0-255)
 * @returns 返回格式为 "rgb(r,g,b)" 的随机颜色字符串
 */
export function randomColor(min: number, max: number) {
  const r = randomNum(min, max)
  const g = randomNum(min, max)
  const b = randomNum(min, max)
  return `rgb(${r},${g},${b})`
}

/**
 * 在画布上绘制验证码图片
 * @param dom - 目标canvas元素
 * @param width - 画布宽度
 * @param height - 画布高度
 * @returns 生成的4位数字验证码字符串
 *
 * 功能说明：
 * 1. 生成随机背景色填充画布
 * 2. 绘制4个随机旋转的数字文本
 * 3. 添加5条干扰线和41个干扰点
 * 4. 返回生成的验证码文本
 */
export function draw(dom: HTMLCanvasElement, width: number, height: number) {
  let imgCode = ''

  const NUMBER_STRING = '0123456789'

  const ctx = dom.getContext('2d')
  if (!ctx) return imgCode

  ctx.fillStyle = randomColor(180, 230)
  ctx.fillRect(0, 0, width, height)
  for (let i = 0; i < 4; i += 1) {
    const text = NUMBER_STRING[randomNum(0, NUMBER_STRING.length)]
    imgCode += text
    const fontSize = randomNum(18, 41)
    const deg = randomNum(-30, 30)
    ctx.font = `${fontSize}px Simhei`
    ctx.textBaseline = 'top'
    ctx.fillStyle = randomColor(80, 150)
    ctx.save()
    ctx.translate(30 * i + 15, 15)
    ctx.rotate((deg * Math.PI) / 180)
    ctx.fillText(text, -15 + 5, -15)
    ctx.restore()
  }
  for (let i = 0; i < 5; i += 1) {
    ctx.beginPath()
    ctx.moveTo(randomNum(0, width), randomNum(0, height))
    ctx.lineTo(randomNum(0, width), randomNum(0, height))
    ctx.strokeStyle = randomColor(180, 230)
    ctx.closePath()
    ctx.stroke()
  }
  for (let i = 0; i < 41; i += 1) {
    ctx.beginPath()
    ctx.arc(randomNum(0, width), randomNum(0, height), 1, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fillStyle = randomColor(150, 200)
    ctx.fill()
  }
  return imgCode
}

/**
 * 解析传入的 SVG 字符串并提取关键信息
 * @param svgStr - 包含 SVG 内容的字符串，格式为标准的 SVG XML
 * @returns 返回一个包含 SVG 信息的对象
 */
export function getSvgInfo(svgStr: string): SvgInfo {
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(svgStr, 'application/xml')
  const svgElement = xmlDoc.getElementsByTagName('svg')[0]

  if (!svgElement) {
    throw new Error('Invalid SVG content: No <svg> tag found.')
  }

  const viewBox = svgElement.getAttribute('viewBox')
  let width = 0
  let height = 0

  if (viewBox) {
    const viewBoxValues = viewBox.split(/\s+/).map(Number)
    if (viewBoxValues.length >= 4) {
      width = viewBoxValues[2]
      height = viewBoxValues[3]
    }
  }

  const pathElements = svgElement.getElementsByTagName('path')
  const pathArray: string[] = []

  for (let i = 0; i < pathElements.length; i++) {
    pathArray.push(pathElements[i].outerHTML)
  }

  const body = pathArray.join('')

  return {
    width,
    height,
    body,
  }
}

/**
 * SVG 信息接口
 */
export interface SvgInfo {
  width: number
  height: number
  body: string
}

/**
 * 判断值是否为空。 针对数组、对象、字符串、Map、Set、null 和 undefined 进行处理，并在值为 null 或 undefined 时直接返回 true
 * @param value - 要检查的值
 * @returns 如果值为空则返回 true，否则返回 false、
 * @example
 * console.log(isAllEmpty(null)) // true
 * console.log(isAllEmpty(undefined)) // true
 * console.log(isAllEmpty('')) // true
 * console.log(isAllEmpty([])) // true
 * console.log(isAllEmpty({})) // true
 * console.log(isAllEmpty(new Map())) // true
 * console.log(isAllEmpty(new Set())) // true
 *
 * console.log(isAllEmpty('abc')) // false
 * console.log(isAllEmpty([1, 2, 3])) // false
 * console.log(isAllEmpty({ a: 1 })) // false
 * console.log(isAllEmpty(new Map([[1, 2]]))) // false
 * console.log(isAllEmpty(0)) // false
 * console.log(isAllEmpty(false)) // false
 */
export function isAllEmpty(value: any): boolean {
  // 处理 null 和 undefined
  if (value === null || value === undefined) {
    return true
  }

  // 处理字符串、数组
  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length === 0
  }

  // 处理对象
  if (typeof value === 'object') {
    if (value instanceof Map || value instanceof Set) {
      return value.size === 0
    }

    // 普通对象
    return Object.keys(value).length === 0
  }

  // 其他类型（如数字、布尔值等）不视为空
  return false
}

/**
 * 从对象数组中提取指定键值并去重
 * @param arr 对象数组
 * @param key 要提取的键名
 * @returns 包含唯一值的数组
 */
export function getKeyList<T extends Record<string, any>>(
  arr: T[],
  key: keyof T,
): Array<T[keyof T]> {
  if (!Array.isArray(arr)) return []

  const result = new Set<T[keyof T]>()

  for (const item of arr) {
    if (item && key in item && item[key] !== undefined) {
      result.add(item[key])
    }
  }

  return Array.from(result)
}

/**
 * 防抖函数
 * @param fn 要执行的函数
 * @param timeout 延迟时间(毫秒)
 * @param immediate 是否立即执行
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  timeout: number = 200,
  immediate: boolean = false,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null

  return function (this: any, ...args: Parameters<T>) {
    const later = () => {
      timer = null
      if (!immediate) fn.apply(this, args)
    }

    const shouldCallNow = immediate && timer === null

    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(later, timeout)

    if (shouldCallNow) {
      fn.apply(this, args)
    }
  }
}

/**
 * 检查母数组是否包含子数组所有元素
 * @param parentArray 母数组
 * @param childArray 子数组
 * @returns 如果包含所有元素返回true，否则返回false
 */
export function arrayContainsAll<T>(parentArray: T[], childArray: T[]): boolean {
  // 处理空数组情况
  if (childArray.length === 0) return true
  if (parentArray.length === 0) return false

  // 使用Map记录元素出现次数（处理重复元素）
  const parentCount = new Map<any, number>()
  const childCount = new Map<any, number>()

  // 统计母数组元素
  for (const item of parentArray) {
    const key = typeof item === 'object' ? JSON.stringify(item) : item
    parentCount.set(key, (parentCount.get(key) || 0) + 1)
  }

  // 统计子数组元素
  for (const item of childArray) {
    const key = typeof item === 'object' ? JSON.stringify(item) : item
    childCount.set(key, (childCount.get(key) || 0) + 1)
  }

  // 检查子数组每个元素是否都在母数组中且数量足够
  for (const [key, count] of childCount) {
    if ((parentCount.get(key) || 0) < count) {
      return false
    }
  }

  return true
}
