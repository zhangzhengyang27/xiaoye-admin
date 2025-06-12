import { h, defineComponent } from 'vue'
import { Icon as IconifyIcon, addIcon } from '@iconify/vue/dist/offline'

export default defineComponent({
  name: 'IconifyIconOffline',
  components: { IconifyIcon },
  props: {
    icon: {
      default: '',
    },
  },
  render() {
    if (typeof this.icon === 'object') {
      addIcon(this.icon, this.icon)
    }
    const attrs = this.$attrs

    if (typeof this.icon === 'string') {
      return h(
        IconifyIcon,
        {
          icon: this.icon,
          'aria-hidden': false,
          style: attrs?.style ? Object.assign(attrs.style, { outline: 'none' }) : { outline: 'none' },
          ...attrs,
        },
        { default: () => [] },
      )
    } else {
      return h(
        this.icon,
        {
          'aria-hidden': false,
          style: attrs?.style ? Object.assign(attrs.style, { outline: 'none' }) : { outline: 'none' },
          ...attrs,
        },
        {
          default: () => [],
        },
      )
    }
  },
})
