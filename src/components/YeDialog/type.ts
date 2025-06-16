import type { CSSProperties, VNode, Component } from 'vue'

type DoneFn = (cancel?: boolean) => void
type EventType = 'open' | 'close' | 'openAutoFocus' | 'closeAutoFocus' | 'fullscreenCallBack'

/** `cancel` 点击取消按钮、`sure` 点击确定按钮、`close` 点击右上角关闭按钮或空白页或按下了esc键 */
type ArgsType = {
  command: 'cancel' | 'sure' | 'close'
}

type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'

/**
 * https://element-plus.org/zh-CN/component/dialog.html#attributes
 * Dialog 组件的属性类型定义
 * @property visible - 控制 Dialog 的显示与隐藏
 * @property title - Dialog 的标题
 * @property width - Dialog 的宽度，默认 '50%'
 * @property fullscreen - 是否全屏显示，优先级高于 fullscreenIcon
 * @property fullscreenIcon - 是否显示全屏操作图标
 * @property top - Dialog 的 margin-top 值，默认 '15vh'
 * @property modal - 是否需要遮罩层，默认 true
 * @property appendToBody - 是否挂载到 body 元素上，嵌套 Dialog 必须设为 true
 * @property lockScroll - 是否锁定 body 滚动，默认 true
 * @property class - 自定义类名
 * @property style - 自定义样式
 * @property openDelay - 打开延时时间(毫秒)
 * @property closeDelay - 关闭延时时间(毫秒)
 * @property closeOnClickModal - 是否点击遮罩层关闭，默认 true
 * @property closeOnPressEscape - 是否按 ESC 关闭，默认 true
 * @property showClose - 是否显示关闭按钮，默认 true
 * @property beforeClose - 关闭前回调函数，需调用 done 方法才会真正关闭
 * @property draggable - 是否可拖拽，默认 false
 * @property center - 是否居中 header 和 footer，默认 false
 * @property alignCenter - 是否水平垂直居中，默认 false
 * @property destroyOnClose - 关闭时是否销毁内部元素，默认 false
 */
type DialogProps = {
  visible?: boolean
  title?: string
  width?: string | number
  fullscreen?: boolean
  fullscreenIcon?: boolean
  top?: string
  modal?: boolean
  appendToBody?: boolean
  lockScroll?: boolean
  class?: string
  style?: CSSProperties
  openDelay?: number
  closeDelay?: number
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
  showClose?: boolean
  beforeClose?: (done: DoneFn) => void
  draggable?: boolean
  center?: boolean
  alignCenter?: boolean
  destroyOnClose?: boolean
}

/**
 * https://element-plus.org/zh-CN/component/popconfirm.html#attributes
 * Popconfirm 组件属性类型
 *
 * @property {string} [title] - 标题
 * @property {string} [confirmButtonText] - 确定按钮文字
 * @property {string} [cancelButtonText] - 取消按钮文字
 * @property {ButtonType} [confirmButtonType=primary] - 确定按钮类型，默认 primary
 * @property {ButtonType} [cancelButtonType=text] - 取消按钮类型，默认 text
 * @property {string|Component} [icon=QuestionFilled] - 自定义图标，默认 QuestionFilled
 * @property {string} [iconColor=#f90] - Icon 颜色，默认 #f90
 * @property {boolean} [hideIcon=false] - 是否隐藏 Icon，默认 false
 * @property {number} [hideAfter=200] - 关闭时的延迟，默认 200
 * @property {boolean} [teleported=true] - 是否将 popover 的下拉列表插入至 body 元素，默认 true
 * @property {boolean} [persistent=false] - 当 popover 组件长时间不触发且 persistent 属性设置为 false 时，popover 将会被删除，默认 false
 * @property {string|number} [width=150] - 弹层宽度，最小宽度 150px，默认 150
 */
type Popconfirm = {
  title?: string
  confirmButtonText?: string
  cancelButtonText?: string
  confirmButtonType?: ButtonType
  cancelButtonType?: ButtonType
  icon?: string | Component
  iconColor?: string
  hideIcon?: boolean
  hideAfter?: number
  teleported?: boolean
  persistent?: boolean
  width?: string | number
}

/**
 * https://element-plus.org/zh-CN/component/button.html#button-attributes
 * 按钮属性配置类型
 *
 * @property {string} label - 按钮文字
 * @property {'large' | 'default' | 'small'} [size] - 按钮尺寸，可选
 * @property {'primary' | 'success' | 'warning' | 'danger' | 'info'} [type] - 按钮类型，可选
 * @property {boolean} [plain] - 是否为朴素按钮，默认 false
 * @property {boolean} [text] - 是否为文字按钮，默认 false
 * @property {boolean} [bg] - 是否显示文字按钮背景颜色，默认 false
 * @property {boolean} [link] - 是否为链接按钮，默认 false
 * @property {boolean} [round] - 是否为圆角按钮，默认 false
 * @property {boolean} [circle] - 是否为圆形按钮，默认 false
 * @property {Popconfirm} [popconfirm] - 确定按钮的 Popconfirm 气泡确认框相关配置
 * @property {boolean} [loading] - 是否为加载中状态，默认 false
 * @property {string | Component} [loadingIcon] - 自定义加载中状态图标组件
 * @property {boolean} [disabled] - 按钮是否为禁用状态，默认 false
 * @property {string | Component} [icon] - 图标组件
 * @property {boolean} [autofocus] - 是否开启原生 autofocus 属性，默认 false
 * @property {'button' | 'submit' | 'reset'} [nativeType] - 原生 type 属性，默认 button
 * @property {boolean} [autoInsertSpace] - 自动在两个中文字符之间插入空格
 * @property {string} [color] - 自定义按钮颜色，并自动计算 hover 和 active 触发后的颜色
 * @property {boolean} [dark] - dark 模式，自动设置 color 为 dark 模式的颜色，默认 false
 * @property {string | Component} [tag] - 自定义元素标签
 * @property {Function} [btnClick] - 点击按钮后触发的回调函数
 */
type ButtonProps = {
  label: string
  size?: 'large' | 'default' | 'small'
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  plain?: boolean
  text?: boolean
  bg?: boolean
  link?: boolean
  round?: boolean
  circle?: boolean
  popconfirm?: Popconfirm
  loading?: boolean
  loadingIcon?: string | Component
  disabled?: boolean
  icon?: string | Component
  autofocus?: boolean
  nativeType?: 'button' | 'submit' | 'reset'
  autoInsertSpace?: boolean
  color?: string
  dark?: boolean
  tag?: string | Component
  btnClick?: ({
    dialog,
    button,
  }: {
    /** 当前 `Dialog` 信息 */
    dialog: BtnClickDialog
    /** 当前 `button` 信息 */
    button: BtnClickButton
  }) => void
}

type BtnClickDialog = {
  options?: DialogOptions
  index?: number
}

type BtnClickButton = {
  btn?: ButtonProps
  index?: number
}

interface DialogOptions extends DialogProps {
  /** 内容区组件的 `props`，可通过 `defineProps` 接收 */
  props?: any
  /** 是否隐藏 `Dialog` 按钮操作区的内容 */
  hideFooter?: boolean
  /** 确定按钮的 `Popconfirm` 气泡确认框相关配置 */
  popconfirm?: Popconfirm
  /** 点击确定按钮后是否开启 `loading` 加载动画 */
  sureBtnLoading?: boolean
  /**
   * @description 自定义对话框标题的内容渲染器
   * @see {@link https://element-plus.org/zh-CN/component/dialog.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%A4%B4%E9%83%A8}
   */
  headerRenderer?: ({
    close,
    titleId,
    titleClass,
  }: {
    close: Function
    titleId: string
    titleClass: string
  }) => VNode | Component
  /** 自定义内容渲染器 */
  contentRenderer?: ({ options, index }: { options: DialogOptions; index: number }) => VNode | Component
  /** 自定义按钮操作区的内容渲染器，会覆盖`footerButtons`以及默认的 `取消` 和 `确定` 按钮 */
  footerRenderer?: ({ options, index }: { options: DialogOptions; index: number }) => VNode | Component
  /** 自定义底部按钮操作 */
  footerButtons?: Array<ButtonProps>
  /** `Dialog` 打开后的回调 */
  open?: ({ options, index }: { options: DialogOptions; index: number }) => void
  /** `Dialog` 关闭后的回调（只有点击右上角关闭按钮或空白页或按下了esc键关闭页面时才会触发） */
  close?: ({ options, index }: { options: DialogOptions; index: number }) => void
  /** `Dialog` 关闭后的回调。 `args` 返回的 `command` 值解析：`cancel` 点击取消按钮、`sure` 点击确定按钮、`close` 点击右上角关闭按钮或空白页或按下了esc键  */
  closeCallBack?: ({ options, index, args }: { options: DialogOptions; index: number; args: any }) => void
  /** 点击全屏按钮时的回调 */
  fullscreenCallBack?: ({ options, index }: { options: DialogOptions; index: number }) => void
  /** 输入焦点聚焦在 `Dialog` 内容时的回调 */
  openAutoFocus?: ({ options, index }: { options: DialogOptions; index: number }) => void
  /** 输入焦点从 `Dialog` 内容失焦时的回调 */
  closeAutoFocus?: ({ options, index }: { options: DialogOptions; index: number }) => void
  /** 点击底部取消按钮的回调，会暂停 `Dialog` 的关闭. 回调函数内执行 `done` 参数方法的时候才是真正关闭对话框的时候 */
  beforeCancel?: (
    done: Function,
    {
      options,
      index,
    }: {
      options: DialogOptions
      index: number
    },
  ) => void
  /** 点击底部确定按钮的回调，会暂停 `Dialog` 的关闭. 回调函数内执行 `done` 参数方法的时候才是真正关闭对话框的时候 */
  beforeSure?: (
    done: Function,
    {
      options,
      index,
      closeLoading,
    }: {
      options: DialogOptions
      index: number
      /** 关闭确定按钮的 `loading` 加载动画 */
      closeLoading: Function
    },
  ) => void
}

export type { EventType, ArgsType, DialogProps, ButtonProps, DialogOptions }
