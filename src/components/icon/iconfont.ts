import { h, defineComponent } from 'vue'

/**
 * 定义并导出一个Vue组件，用于渲染Iconfont图标
 */
export default defineComponent({
  name: 'Iconfont',
  props: {
    icon: {
      type: String,
      default: '',
    },
  },
  render() {
    const attrs = this.$attrs
    if (Object.keys(attrs).includes('uni') || attrs?.iconType === 'uni') {
      return h(
        'i',
        {
          class: 'iconfont',
          ...attrs,
        },
        this.icon,
      )
    } else if (Object.keys(attrs).includes('svg') || attrs?.iconType === 'svg') {
      return h(
        'svg',
        {
          class: 'icon-svg',
        },
        {
          default: () => h('use', { xlinkHref: `#${this.icon}` }),
        },
      )
    } else {
      return h('i', {
        class: `iconfont ${this.icon}`,
        ...attrs,
      })
    }
  },
})
