<template>
  <div class="px-3 mr-1 navbar-bg-hover" :title="isActive ? '点击折叠' : '点击展开'" @click="toggleClick">
    <IconifyIconOffline
      :icon="isActive ? MenuFold : MenuUnfold"
      class="inline-block! align-middle hover:text-primary dark:hover:text-white!"
    />
  </div>
</template>

<script setup lang="ts">
import MenuFold from '~icons/ri/menu-fold-fill'
import MenuUnfold from '~icons/ri/menu-unfold-fill'

interface Props {
  isActive?: boolean
}

withDefaults(defineProps<Props>(), {
  isActive: false,
})

const emit = defineEmits<{
  (e: 'toggleClick'): void
}>()

const toggleClick = () => {
  emit('toggleClick')
}
</script>
