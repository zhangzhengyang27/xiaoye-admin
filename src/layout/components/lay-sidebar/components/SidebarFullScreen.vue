<template>
  <span class="fullscreen-icon navbar-bg-hover" @click="toggle">
    <IconifyIconOffline :icon="screenIcon" />
  </span>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useNav } from '@/layout/hooks/useNav'

const screenIcon = ref()
const { toggle, isFullscreen, Fullscreen, ExitFullscreen } = useNav()

// 使用类型断言处理非标准属性
const doc = document as Document & {
  webkitFullscreenElement?: Element
  mozFullScreenElement?: Element
  msFullscreenElement?: Element
}

isFullscreen.value = !!(
  doc.fullscreenElement ||
  doc.webkitFullscreenElement ||
  doc.mozFullScreenElement ||
  doc.msFullscreenElement
)

watch(
  isFullscreen,
  (full) => {
    screenIcon.value = full ? ExitFullscreen : Fullscreen
  },
  {
    immediate: true,
  },
)
</script>
