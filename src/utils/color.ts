/**
 * 颜色变暗函数
 * @param color 原始颜色（支持hex/rgb/rgba格式）
 * @param percent 变暗百分比（0-100）
 * @returns 变暗后的颜色字符串
 */
export function darken(color: string, percent: number): string {
  // 参数校验
  if (percent < 0 || percent > 100) {
    throw new Error('Percent must be between 0 and 100')
  }

  // 解析颜色格式
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  const rgbRegex = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/
  const rgbaRegex = /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*([01]?\.\d+)\)$/

  let r: number,
    g: number,
    b: number,
    a: number = 1

  if (hexRegex.test(color)) {
    // 处理hex格式
    let hex = color.substring(1)
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((c) => c + c)
        .join('')
    }
    r = parseInt(hex.substring(0, 2), 16)
    g = parseInt(hex.substring(2, 4), 16)
    b = parseInt(hex.substring(4, 6), 16)
  } else if (rgbRegex.test(color)) {
    // 处理rgb格式
    const match = color.match(rgbRegex)!
    r = parseInt(match[1])
    g = parseInt(match[2])
    b = parseInt(match[3])
  } else if (rgbaRegex.test(color)) {
    // 处理rgba格式
    const match = color.match(rgbaRegex)!
    r = parseInt(match[1])
    g = parseInt(match[2])
    b = parseInt(match[3])
    a = parseFloat(match[4])
  } else {
    throw new Error('Invalid color format')
  }

  // 验证RGB值有效性
  if ([r, g, b].some((v) => v < 0 || v > 255)) {
    throw new Error('Invalid RGB values')
  }

  // 计算变暗后的颜色
  const factor = 1 - percent / 100
  const darkenedR = Math.round(r * factor)
  const darkenedG = Math.round(g * factor)
  const darkenedB = Math.round(b * factor)

  // 返回对应格式
  if (a !== 1) {
    return `rgba(${darkenedR}, ${darkenedG}, ${darkenedB}, ${a})`
  }
  return `rgb(${darkenedR}, ${darkenedG}, ${darkenedB})`
}

/**
 * 颜色变亮函数
 * @param color 原始颜色（支持hex/rgb/rgba格式）
 * @param percent 变亮百分比（0-100）
 * @returns 变亮后的颜色字符串
 */
export function lighten(color: string, percent: number): string {
  // 参数校验
  if (percent < 0 || percent > 100) {
    throw new Error('Percent must be between 0 and 100')
  }

  // 解析颜色格式
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  const rgbRegex = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/
  const rgbaRegex = /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*([01]?\.\d+)\)$/

  let r: number,
    g: number,
    b: number,
    a: number = 1

  if (hexRegex.test(color)) {
    // 处理hex格式
    let hex = color.substring(1)
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((c) => c + c)
        .join('')
    }
    r = parseInt(hex.substring(0, 2), 16)
    g = parseInt(hex.substring(2, 4), 16)
    b = parseInt(hex.substring(4, 6), 16)
  } else if (rgbRegex.test(color)) {
    // 处理rgb格式
    const match = color.match(rgbRegex)!
    r = parseInt(match[1])
    g = parseInt(match[2])
    b = parseInt(match[3])
  } else if (rgbaRegex.test(color)) {
    // 处理rgba格式
    const match = color.match(rgbaRegex)!
    r = parseInt(match[1])
    g = parseInt(match[2])
    b = parseInt(match[3])
    a = parseFloat(match[4])
  } else {
    throw new Error('Invalid color format')
  }

  // 验证RGB值有效性
  if ([r, g, b].some((v) => v < 0 || v > 255)) {
    throw new Error('Invalid RGB values')
  }

  // 计算变亮后的颜色
  const factor = 1 + percent / 100
  const lightenedR = Math.min(Math.round(r * factor), 255)
  const lightenedG = Math.min(Math.round(g * factor), 255)
  const lightenedB = Math.min(Math.round(b * factor), 255)

  // 返回对应格式
  if (a !== 1) {
    return `rgba(${lightenedR}, ${lightenedG}, ${lightenedB}, ${a})`
  }
  return `rgb(${lightenedR}, ${lightenedG}, ${lightenedB})`
}

// 测试用例
function runTests() {
  // HEX格式测试
  console.assert(darken('#ffffff', 50) === 'rgb(128, 128, 128)', 'HEX white darken 50% failed')
  console.assert(darken('#336699', 20) === 'rgb(41, 82, 122)', 'HEX #336699 darken 20% failed')

  // RGB格式测试
  console.assert(darken('rgb(255, 0, 0)', 30) === 'rgb(179, 0, 0)', 'RGB red darken 30% failed')

  // RGBA格式测试
  console.assert(
    darken('rgba(100, 200, 50, 0.5)', 10) === 'rgba(90, 180, 45, 0.5)',
    'RGBA color darken 10% failed',
  )

  // 边界测试
  console.assert(darken('rgb(100, 100, 100)', 0) === 'rgb(100, 100, 100)', '0% darken failed')
  console.assert(darken('rgb(100, 100, 100)', 100) === 'rgb(0, 0, 0)', '100% darken failed')

  // 错误测试
  try {
    darken('invalid', 10)
    console.assert(false, 'Invalid color format test failed')
  } catch (e) {
    console.assert(e instanceof Error, 'Error handling test failed')
  }
}

// 执行测试
runTests()

// 测试用例
function runTestsLighten() {
  // HEX格式测试
  console.assert(lighten('#000000', 50) === 'rgb(0, 0, 0)', 'HEX black lighten 50% failed')
  console.assert(lighten('#336699', 20) === 'rgb(61, 122, 153)', 'HEX #336699 lighten 20% failed')

  // RGB格式测试
  console.assert(lighten('rgb(100, 0, 0)', 30) === 'rgb(130, 0, 0)', 'RGB red lighten 30% failed')

  // RGBA格式测试
  console.assert(
    lighten('rgba(50, 100, 150, 0.5)', 10) === 'rgba(55, 110, 165, 0.5)',
    'RGBA color lighten 10% failed',
  )

  // 边界测试
  console.assert(lighten('rgb(100, 100, 100)', 0) === 'rgb(100, 100, 100)', '0% lighten failed')
  console.assert(lighten('rgb(100, 100, 100)', 100) === 'rgb(200, 200, 200)', '100% lighten failed')

  // 错误测试
  try {
    lighten('invalid', 10)
    console.assert(false, 'Invalid color format test failed')
  } catch (e) {
    console.assert(e instanceof Error, 'Error handling test failed')
  }
}

// 执行测试
runTestsLighten()
