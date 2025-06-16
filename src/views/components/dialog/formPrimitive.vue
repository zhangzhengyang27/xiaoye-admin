<template>
  <el-input v-model="data" class="w-[220px]!" placeholder="请输入内容" />
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'

// 声明 props 类型
export interface FormProps {
  data?: string
}

const props = withDefaults(defineProps<FormProps>(), {
  data: () => '',
})

const emit = defineEmits(['update:data'])

// 使用 vueuse 的双向绑定工具
const data = useVModel(props, 'data', emit)
</script>
