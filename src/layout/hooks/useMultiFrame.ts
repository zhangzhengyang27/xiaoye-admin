const MAP = new Map()

/**
 * 多框架管理钩子
 *
 * 提供对框架映射的增删查操作：
 * - setMap: 添加/更新路径对应的框架组件
 * - getMap: 获取指定路径的框架组件或全部映射
 * - delMap: 删除指定路径的框架组件
 */
export const useMultiFrame = () => {
  function setMap(path, Comp) {
    MAP.set(path, Comp)
  }

  function getMap(path?) {
    if (path) {
      return MAP.get(path)
    }
    return [...MAP.entries()]
  }

  function delMap(path) {
    MAP.delete(path)
  }

  return {
    setMap,
    getMap,
    delMap,
  }
}
