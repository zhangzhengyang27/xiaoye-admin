/**
 * 检查元素是否包含指定类名
 * @param element 目标DOM元素
 * @param className 要检查的类名
 * @returns 是否包含该类名
 */
export function hasClass(element: HTMLElement, className: string): boolean {
  // 参数校验
  if (!element || !className || typeof className !== 'string') {
    return false
  }

  // 获取元素类名并分割为数组
  const classList = element.className.split(/\s+/)

  // 检查是否包含目标类名
  return classList.includes(className)
}

/**
 * 获取元素类名列表
 * @param element 目标DOM元素
 * @returns 类名数组（已去除空字符串和多余空格）
 */
export function getClass(element: HTMLElement): string[] {
  // 参数校验
  if (!element || !element.className) {
    return []
  }

  // 分割类名字符串并过滤空值
  return element.className.split(/\s+/).filter((className) => className.trim().length > 0)
}

/**
 * 从元素中移除类名
 * @param element 目标DOM元素
 * @param className 要移除的类名
 */
export function removeClass(element: HTMLElement, className: string): void {
  // 参数校验
  if (!element || !className || typeof className !== 'string') {
    return
  }

  // 获取当前类名列表并过滤掉目标类名
  const newClasses = element.className.split(/\s+/).filter((c) => c && c !== className)

  // 更新元素类名
  element.className = newClasses.join(' ').trim()
}

/**
 * 切换元素的类名
 * @param element 目标DOM元素
 * @param className 要切换的类名
 * @param force 强制添加/移除（可选）
 */
export function toggleClass(element: HTMLElement, className: string, force?: boolean): void {
  // 参数校验
  if (!element || !className || typeof className !== 'string') {
    return
  }

  // 获取当前类名列表
  const classList = element.className.split(/\s+/).filter((c) => c)
  const index = classList.indexOf(className)

  // 根据force参数或当前状态决定操作
  if (force !== undefined) {
    if (force && index === -1) {
      classList.push(className)
    } else if (!force && index !== -1) {
      classList.splice(index, 1)
    }
  } else {
    if (index === -1) {
      classList.push(className)
    } else {
      classList.splice(index, 1)
    }
  }

  // 更新元素类名
  element.className = classList.join(' ').trim()
}

// 测试用例
function runTests() {
  // 创建测试元素
  const testElement = document.createElement('div')

  // 测试1: 添加不存在的类名
  toggleClass(testElement, 'active')
  console.assert(testElement.className === 'active', 'Add non-existing class test failed')

  // 测试2: 移除存在的类名
  toggleClass(testElement, 'active')
  console.assert(testElement.className === '', 'Remove existing class test failed')

  // 测试3: 强制添加
  toggleClass(testElement, 'active', true)
  console.assert(testElement.className === 'active', 'Force add test failed')

  // 测试4: 强制移除
  toggleClass(testElement, 'active', false)
  console.assert(testElement.className === '', 'Force remove test failed')

  // 测试5: 无效参数
  toggleClass(null as unknown as HTMLElement, 'test')
  toggleClass(testElement, '')
  console.assert(testElement.className === '', 'Invalid params test failed')
}

// 执行测试
runTests()
