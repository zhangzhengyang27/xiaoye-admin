import type { CSSProperties, VNode, Component } from 'vue'

type DoneFn = (cancel?: boolean) => void
type EventType = 'open' | 'close' | 'openAutoFocus' | 'closeAutoFocus'

/** `cancel` 点击取消按钮、`sure` 点击确定按钮、`close` 点击右上角关闭按钮或空白页或按下了 `esc` 键 */
type ArgsType = {
  command: 'cancel' | 'sure' | 'close'
}

type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'

/**
 * https://element-plus.org/zh-CN/component/drawer.html#%E5%B1%9E%E6%80%A7
 * Drawer 组件属性类型定义
 *
 * @property {boolean} [visible] - 控制 Drawer 的显示与隐藏
 * @property {boolean} [appendToBody=false] - 是否将 Drawer 插入至 body 元素上（嵌套 Drawer 必须设为 true）
 * @property {string} [appendTo] - 指定挂载的 DOM 元素（会覆盖 appendToBody）
 * @property {boolean} [lockScroll=true] - 是否锁定 body 滚动
 * @property {(done: DoneFn) => void} [beforeClose] - 关闭前回调函数
 * @property {boolean} [closeOnClickModal=true] - 是否可通过点击遮罩层关闭
 * @property {boolean} [closeOnPressEscape=true] - 是否可通过 ESC 键关闭
 * @property {boolean} [showClose=true] - 是否显示关闭按钮
 * @property {number} [openDelay=0] - 打开延时（毫秒）
 * @property {number} [closeDelay=0] - 关闭延时（毫秒）
 * @property {string} [class] - 自定义类名
 * @property {CSSProperties} [style] - 自定义样式
 * @property {boolean} [destroyOnClose=false] - 关闭时是否销毁子元素
 * @property {boolean} [modal=true] - 是否需要遮罩层
 * @property {'rtl'|'ltr'|'ttb'|'btt'} [direction='rtl'] - 打开方向
 * @property {string|number} [size] - 窗体尺寸（支持像素值或百分比）
 * @property {string} [title] - 标题内容
 * @property {boolean} [withHeader=true] - 是否显示 header 栏
 * @property {string} [modalClass] - 遮罩层类名
 * @property {number} [zIndex] - 设置 z-index
 * @property {string} [headerAriaLevel='2'] - header 的 aria-level 属性
 */
type DrawerProps = {
  visible?: boolean
  appendToBody?: boolean
  appendTo?: string
  lockScroll?: boolean
  beforeClose?: (done: DoneFn) => void
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
  showClose?: boolean
  openDelay?: number
  closeDelay?: number
  class?: string
  style?: CSSProperties
  destroyOnClose?: boolean
  modal?: boolean
  direction?: 'rtl' | 'ltr' | 'ttb' | 'btt'
  size?: string | number
  title?: string
  withHeader?: boolean
  modalClass?: string
  zIndex?: number
  headerAriaLevel?: string
}

/**
 * https://element-plus.org/zh-CN/component/popConfirm.html#attributes
 * PopConfirm 类型定义
 *
 * @property {string} [title] - 标题
 * @property {string} [confirmButtonText] - 确认按钮文字
 * @property {string} [cancelButtonText] - 取消按钮文字
 * @property {ButtonType} [confirmButtonType=primary] - 确认按钮类型
 * @property {ButtonType} [cancelButtonType=text] - 取消按钮类型
 * @property {string|Component} [icon=QuestionFilled] - 自定义图标
 * @property {string} [iconColor=#f90] - Icon颜色
 * @property {boolean} [hideIcon=false] - 是否隐藏Icon
 * @property {number} [hideAfter=200] - 关闭时的延迟(ms)
 * @property {boolean} [teleported=true] - 是否将下拉列表插入至body元素
 * @property {boolean} [persistent=false] - 是否持久化popover组件
 * @property {string|number} [width=150] - 弹层宽度(最小150px)
 */
type PopConfirm = {
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

type BtnClickDrawer = {
  options?: DrawerOptions
  index?: number
}

type BtnClickButton = {
  btn?: ButtonProps
  index?: number
}

/**
 * https://element-plus.org/zh-CN/component/button.html#button-attributes
 * 按钮属性配置类型
 *
 * 定义了按钮的各种可配置属性，包括样式、状态、交互等
 *
 * @property {string} label - 按钮显示文字
 * @property {'large' | 'default' | 'small'} [size='default'] - 按钮尺寸
 * @property {'primary' | 'success' | 'warning' | 'danger' | 'info'} [type] - 按钮类型
 * @property {boolean} [plain=false] - 是否为朴素按钮
 * @property {boolean} [text=false] - 是否为文字按钮
 * @property {boolean} [bg=false] - 是否显示文字按钮背景颜色
 * @property {boolean} [link=false] - 是否为链接按钮
 * @property {boolean} [round=false] - 是否为圆角按钮
 * @property {boolean} [circle=false] - 是否为圆形按钮
 * @property {PopConfirm} [popConfirm] - 确认按钮的气泡确认框配置
 * @property {boolean} [loading=false] - 是否为加载中状态
 * @property {string | Component} [loadingIcon] - 自定义加载中图标
 * @property {boolean} [disabled=false] - 是否禁用按钮
 * @property {string | Component} [icon] - 按钮图标
 * @property {boolean} [autofocus=false] - 是否开启原生autofocus属性
 * @property {'button' | 'submit' | 'reset'} [nativeType='button'] - 原生type属性
 * @property {boolean} [autoInsertSpace] - 是否自动在中文字符间插入空格
 * @property {string} [color] - 自定义按钮颜色
 * @property {boolean} [dark=false] - 是否为dark模式
 * @property {string | Component} [tag] - 自定义元素标签
 * @property {Function} [btnClick] - 按钮点击回调函数
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
  popConfirm?: PopConfirm
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
  /** 点击按钮后触发的回调 */
  btnClick?: ({
    drawer,
    button,
  }: {
    /** 当前 `Drawer` 信息 */
    drawer: BtnClickDrawer
    /** 当前 `button` 信息 */
    button: BtnClickButton
  }) => void
}

interface DrawerOptions extends DrawerProps {
  /** 内容区组件的 `props`，可通过 `defineProps` 接收 */
  props?: any
  /** 是否隐藏 `Drawer` 按钮操作区的内容 */
  hideFooter?: boolean
  /** 确认按钮的 `PopConfirm` 气泡确认框相关配置 */
  popConfirm?: PopConfirm
  /** 点击确定按钮后是否开启 `loading` 加载动画 */
  sureBtnLoading?: boolean
  /**
   * @description 自定义抽屉标题的内容渲染器
   * @see {@link https://element-plus.org/zh-CN/component/drawer.html#%E6%8F%92%E6%A7%BD}
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
  contentRenderer?: ({ options, index }: { options: DrawerOptions; index: number }) => VNode | Component
  /** 自定义按钮操作区的内容渲染器，会覆盖`footerButtons`以及默认的 `取消` 和 `确定` 按钮 */
  footerRenderer?: ({ options, index }: { options: DrawerOptions; index: number }) => VNode | Component
  /** 自定义底部按钮操作 */
  footerButtons?: Array<ButtonProps>
  /** `Drawer` 打开后的回调 */
  open?: ({ options, index }: { options: DrawerOptions; index: number }) => void
  /** `Drawer` 关闭后的回调（只有点击右上角关闭按钮或空白页或按下了esc键关闭页面时才会触发） */
  close?: ({ options, index }: { options: DrawerOptions; index: number }) => void
  /** `Drawer` 关闭后的回调。 `args` 返回的 `command` 值解析：`cancel` 点击取消按钮、`sure` 点击确定按钮、`close` 点击右上角关闭按钮或空白页或按下了esc键  */
  closeCallBack?: ({ options, index, args }: { options: DrawerOptions; index: number; args: any }) => void
  /** 输入焦点聚焦在 `Drawer` 内容时的回调 */
  openAutoFocus?: ({ options, index }: { options: DrawerOptions; index: number }) => void
  /** 输入焦点从 `Drawer` 内容失焦时的回调 */
  closeAutoFocus?: ({ options, index }: { options: DrawerOptions; index: number }) => void

  /** 点击底部取消按钮的回调，会暂停 `Drawer` 的关闭. 回调函数内执行 `done` 参数方法的时候才是真正关闭对话框的时候 */
  beforeCancel?: (
    done: Function,
    {
      options,
      index,
    }: {
      options: DrawerOptions
      index: number
    },
  ) => void
  /** 点击底部确定按钮的回调，会暂停 `Drawer` 的关闭. 回调函数内执行 `done` 参数方法的时候才是真正关闭对话框的时候 */
  beforeSure?: (
    done: Function,
    {
      options,
      index,
      closeLoading,
    }: {
      options: DrawerOptions
      index: number
      closeLoading: Function
    },
  ) => void
}

export type { ButtonProps, DrawerOptions, ArgsType, DrawerProps, EventType }
