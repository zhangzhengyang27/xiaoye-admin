<template>
  <div
    v-tippy="{
      content: isActive ? '点击折叠' : '点击展开',
      theme: tooltipEffect,
      hideOnClick: 'toggle',
      placement: 'right',
    }"
    class="center-collapse"
    @click="toggleClick"
  >
    <IconifyIconOffline
      :icon="ArrowLeft"
      :class="[iconClass, themeColor === 'light' ? '' : 'text-primary']"
      :style="{ transform: isActive ? 'none' : 'rotateY(180deg)' }"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@/layout/hooks/useNav'

import ArrowLeft from '~icons/ri/arrow-left-double-fill'
import { useGlobal } from '@/layout/hooks/useGlobal'

interface Props {
  isActive?: boolean
}

withDefaults(defineProps<Props>(), {
  isActive: false,
})

const { tooltipEffect } = useNav()

const iconClass = computed(() => {
  return ['w-[16px]', 'h-[16px]']
})

const { $storage } = useGlobal<GlobalPropertiesApi>()
const themeColor = computed(() => $storage.layout?.themeColor)

const emit = defineEmits<{
  (e: 'toggleClick'): void
}>()

const toggleClick = () => {
  emit('toggleClick')
}
</script>

<style scoped>
.center-collapse {
  position: absolute;
  top: 50%;
  right: 2px;
  z-index: 1002;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 34px;
  cursor: pointer;
  background: var(--el-bg-color);
  border: 1px solid var(--pure-border-color);
  border-radius: 4px;
  transform: translate(12px, -50%);
}
</style>
