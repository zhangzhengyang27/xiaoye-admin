<template>
  <div v-loading="loading" class="frame" element-loading-text="加载中">
    <iframe ref="frameRef" :src="frameSrc" class="frame-iframe" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, unref, watch, onMounted, nextTick } from 'vue'

defineOptions({
  name: 'LayFrame',
})

const props = defineProps<{
  frameInfo?: {
    frameSrc?: string
    fullPath?: string
  }
}>()

const loading = ref(true)
const currentRoute = useRoute()
const frameSrc = ref<string>('')
const frameRef = ref<HTMLIFrameElement | null>(null)

if (unref(currentRoute.meta)?.frameSrc) {
  frameSrc.value = unref(currentRoute.meta)?.frameSrc as string
}

if (unref(currentRoute.meta)?.frameLoading === false) {
  hideLoading()
}

function hideLoading() {
  loading.value = false
}

function init() {
  nextTick(() => {
    const iframe = unref(frameRef)
    if (!iframe) return

    const onLoad = () => {
      hideLoading()
      // 移除监听，防止重复触发
      iframe.removeEventListener('load', onLoad)
    }

    iframe.addEventListener('load', onLoad)
  })
}

watch(
  () => currentRoute.fullPath,
  (path) => {
    if (currentRoute.name === 'Redirect' && path.includes(props.frameInfo?.fullPath)) {
      frameSrc.value = path // redirect时，置换成任意值，待重定向后 重新赋值
      loading.value = true
    }
    // 重新赋值
    if (props.frameInfo?.fullPath === path) {
      frameSrc.value = props.frameInfo?.frameSrc
    }
  },
)

onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
.frame {
  position: absolute;
  inset: 0;

  .frame-iframe {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: 0;
  }
}

.main-content {
  margin: 2px 0 0 !important;
}
</style>
