<script setup lang="ts">
import { ref } from 'vue'
import IconSelect from '@/components/icon/Select.vue'

defineOptions({
  name: 'IconSelect',
})

const icon = ref('ep:add-location')
</script>

<template>
  <div class="card-header">
    <span class="font-medium">图标选择器</span>
  </div>
  <IconSelect v-model="icon" class="w-full" />
</template>
