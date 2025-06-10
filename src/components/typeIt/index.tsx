import type { El } from 'typeit/dist/types'
import TypeIt, { type Options as TypeItOptions } from 'typeit'
import { type PropType, ref, defineComponent, onMounted } from 'vue'

// 打字机效果组件（配置项详情请查阅 https://www.typeitjs.com/docs/vanilla/usage#options）
export default defineComponent({
  name: 'TypeIt',
  props: {
    options: {
      type: Object as PropType<TypeItOptions>,
      default: () => ({}) as TypeItOptions,
    },
  },
  setup(props, { slots, expose }) {
    const typedItRef = ref<Element | null>(null)

    onMounted(() => {
      const $typed = typedItRef.value!.querySelector('.type-it') as El

      if (!$typed) {
        throw new TypeError("请确保有且只有一个具有class属性为 'type-it' 的元素")
      }

      const typeIt = new TypeIt($typed, props.options).go()
      expose({ typeIt })
    })

    return () => <div ref={typedItRef}>{slots.default?.() ?? <span class="type-it"></span>}</div>
  },
})
