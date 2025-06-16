import type { VNode } from 'vue'
import { isFunction } from '@/utils/is'
import { type MessageHandler, ElMessage } from 'element-plus'

/** 消息类型枚举 */
enum MessageType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

/** 消息参数接口 */
/**
 * 消息组件参数接口
 *
 * @property {MessageType} [type] - 消息类型
 * @property {boolean} [plain] - 是否为朴素样式
 * @property {any} [icon] - 自定义图标
 * @property {boolean} [dangerouslyUseHTMLString] - 是否将消息内容作为HTML字符串处理
 * @property {string} [customClass] - 自定义类名
 * @property {number} [duration] - 显示时间(毫秒)
 * @property {boolean} [showClose] - 是否显示关闭按钮
 * @property {number} [offset] - 消息距离窗口顶部的偏移量
 * @property {string | HTMLElement} [appendTo] - 消息挂载的DOM节点
 * @property {boolean} [grouping] - 是否合并内容相同的消息
 * @property {number} [repeatNum] - 重复次数
 * @property {(() => void) | null} [onClose] - 关闭时的回调函数
 */
interface MessageParams {
  type?: MessageType
  plain?: boolean
  icon?: any
  dangerouslyUseHTMLString?: boolean
  customClass?: string
  duration?: number
  showClose?: boolean
  offset?: number
  appendTo?: string | HTMLElement
  grouping?: boolean
  repeatNum?: number
  onClose?: (() => void) | null
}

/** 默认消息参数 */
const DEFAULT_MESSAGE_PARAMS: Partial<MessageParams> = {
  type: MessageType.INFO,
  plain: false,
  dangerouslyUseHTMLString: false,
  customClass: 'xiaoye-message',
  duration: 2000,
  showClose: true,
  offset: 16,
  appendTo: document.body,
  grouping: false,
  repeatNum: 1,
  onClose: null,
}

/**
 * 显示消息提示
 * @param content 消息内容，可以是字符串、VNode或返回VNode的函数
 * @param params 消息参数配置
 * @returns MessageHandler实例
 */
const message = (content: string | VNode | (() => VNode), params?: MessageParams): MessageHandler => {
  const mergedParams = {
    ...DEFAULT_MESSAGE_PARAMS,
    ...params,
    message: content,
    onClose: isFunction(params?.onClose) ? params?.onClose : null,
  }

  return ElMessage({
    ...mergedParams,
    // 确保自定义类名处理一致
    customClass: mergedParams.customClass === 'xiaoye-message' ? 'xiaoye-message' : '',
    // 将 onClose 的 null 转换为 undefined
    onClose: mergedParams.onClose === null ? undefined : mergedParams.onClose,
  })
}

/**
 * 关闭所有消息提示
 * @returns void
 */
const closeAllMessage = (): void => ElMessage.closeAll()

export { message, closeAllMessage }
