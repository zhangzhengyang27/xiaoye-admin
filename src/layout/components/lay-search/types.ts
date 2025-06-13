/**
 * 搜索选项项类型定义
 * @property {string} path - 路径
 * @property {'history' | 'collect'} type - 类型：历史记录或收藏
 * @property {Object} meta - 元数据
 * @property {string} [meta.icon] - 图标
 * @property {string} [meta.title] - 标题
 */
interface optionsItem {
  path: string
  type: 'history' | 'collect'
  meta: {
    icon?: string
    title?: string
  }
}

interface dragItem {
  oldIndex: number
  newIndex: number
}

interface Props {
  value: string
  options: Array<optionsItem>
}

export type { optionsItem, dragItem, Props }
