<script setup lang="ts">
import { useVModel } from '@vueuse/core'

export interface FormProps {
  data?: string
}

const props = withDefaults(defineProps<FormProps>(), {
  data: () => '',
})

// 使用 vueuse 的双向绑定工具
const emit = defineEmits(['update:data'])
const data = useVModel(props, 'data', emit)
</script>

<template>
  <el-input v-model="data" class="w-[220px]!" placeholder="请输入内容" />
</template>
