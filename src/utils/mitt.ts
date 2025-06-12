import type { Emitter } from 'mitt'
import mitt from 'mitt'

/**
 * 定义应用内事件类型
 *
 * @property openPanel - 打开面板事件，传递字符串参数
 * @property tagOnClick - 标签点击事件，传递字符串参数
 * @property logoChange - logo变更事件，传递布尔值参数
 * @property tagViewsChange - 标签视图变更事件，传递字符串参数
 * @property changLayoutRoute - 布局路由变更事件，传递字符串参数
 * @property tagViewsShowModel - 标签视图显示模式事件，传递字符串参数
 * @property imageInfo - 图片信息事件，包含图片元素及尺寸位置信息
 */
type Events = {
  openPanel: string
  tagOnClick: string
  logoChange: boolean
  tagViewsChange: string
  changLayoutRoute: string
  tagViewsShowModel: string
  imageInfo: {
    img: HTMLImageElement
    height: number
    width: number
    x: number
    y: number
  }
}

export const emitter: Emitter<Events> = mitt<Events>()
