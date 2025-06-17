<template>
  <el-text
    v-bind="{
      truncated: !lineClamp,
      lineClamp,
      ...$attrs,
    }"
    ref="textRef"
    @mouseover.self="handleHover"
  >
    <slot />
  </el-text>
</template>

<script setup lang="ts">
import { h, onMounted, ref, type PropType } from 'vue'
import { type TippyOptions, type TippyContent, useTippy } from 'vue-tippy'

defineOptions({
  name: 'YeText',
})

// 定义组件的 props
const props = defineProps({
  // lineClamp 控制文本显示的最大行数，可以是字符串或数字类型
  lineClamp: {
    type: [String, Number],
  },
  // tippyProps 是一个对象，用于配置 tippy 提示框的选项，默认值是一个空对象
  tippyProps: {
    type: Object as PropType<TippyOptions>,
    default: () => ({}),
  },
})

// 定义插槽类型，content 插槽用于自定义提示内容，default 插槽是默认的文本内容
const slots = defineSlots<{
  content: () => TippyContent
  default: () => any
}>()

// 创建对组件内部元素的引用，用于后续操作 DOM 或绑定 tippy 提示
const textRef = ref()
// 存储 tippy 实例的引用，以便在方法中控制提示的显示与隐藏
const tippyFunc = ref()

/**
 * 判断文本是否被省略（即文本超出容器的显示范围）
 * @param el - 需要检查的 DOM 元素
 * @returns {boolean} - 如果文本被省略则返回 true，否则返回 false
 */
const isTextEllipsis = (el: HTMLElement) => {
  if (!props.lineClamp) {
    // 单行省略判断：通过比较 scrollWidth 和 clientWidth 来判断文本是否溢出
    return el.scrollWidth > el.clientWidth
  } else {
    // 多行省略判断：通过比较 scrollHeight 和 clientHeight 来判断文本是否溢出
    return el.scrollHeight > el.clientHeight
  }
}

/**
 * 获取 tippy 的配置项
 * @returns {Object} - 返回配置好的 tippy 属性对象
 */
const getTippyProps = () => ({
  // 设置提示框的内容，优先使用 content 插槽，否则使用 default 插槽
  content: h(slots.content || slots.default),
  // 合并用户传入的 tippyProps 配置
  ...props.tippyProps,
})

/**
 * 鼠标悬停事件处理函数
 * @param event - 鼠标事件对象
 */
function handleHover(event: MouseEvent) {
  // 检查目标元素的文本是否被省略
  if (isTextEllipsis(event.target as HTMLElement)) {
    // 更新 tippy 的配置
    tippyFunc.value.setProps(getTippyProps())
    // 启用提示框
    tippyFunc.value.enable()
  } else {
    // 如果没有省略，则禁用提示框
    tippyFunc.value.disable()
  }
}

// 组件挂载完成后执行的操作
onMounted(() => {
  // 初始化 tippy 实例，绑定到 textRef 引用的 DOM 元素上，并应用初始的 tippy 配置
  tippyFunc.value = useTippy(textRef.value?.$el, getTippyProps())
})
</script>
