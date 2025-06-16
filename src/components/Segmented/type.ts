import type { VNode, Component } from 'vue'
import type { iconType } from '@/components/icon/types'

/** 分段控制器选项类型 */
/** @description 配置项接口，用于定义分段控制器的各个选项 */
/**
 * @property label - 选项显示的文字，可以是字符串或返回VNode/组件的函数
 * @property icon - 选项图标，支持字符串或组件形式，使用平台内置的useRenderIcon渲染
 * @property iconAttrs - 图标属性配置
 * @property value - 选项值
 * @property disabled - 是否禁用该选项
 * @property tip - 选项的tooltip提示信息
 */
export interface OptionsType {
  label?: string | (() => VNode | Component)
  icon?: string | Component
  iconAttrs?: iconType
  value?: any
  disabled?: boolean
  tip?: string
}
