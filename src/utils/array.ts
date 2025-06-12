/**
 * 计算两个数组的交集
 * @param arr1 第一个数组
 * @param arr2 第二个数组
 * @returns 两个数组的交集数组（不重复）
 */
export function intersection<T>(arr1: T[], arr2: T[]): T[] {
  // 处理空数组情况
  if (arr1.length === 0 || arr2.length === 0) return []

  // 使用Set去重并提高查找效率
  const set1 = new Set(arr1)
  const resultSet = new Set<T>()

  // 找出同时存在于两个数组的元素
  for (const item of arr2) {
    if (set1.has(item)) {
      resultSet.add(item)
    }
  }

  return Array.from(resultSet)
}
