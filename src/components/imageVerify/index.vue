<template>
  <canvas ref="domRef" width="120" height="40" class="cursor-pointer" @click="getImgCode"></canvas>
</template>

<script setup lang="ts">
import { draw } from '@/utils/common'
import { ref, onMounted, watch } from 'vue'

defineOptions({
  name: 'imageVerify',
})

interface Props {
  code?: string
}

interface Emits {
  (e: 'update:code', code: string): void
}

const props = withDefaults(defineProps<Props>(), {
  code: '',
})

const emit = defineEmits<Emits>()

const domRef = ref<HTMLCanvasElement>()
const imgCode = ref('')

function setImgCode(code: string) {
  imgCode.value = code
}

function getImgCode() {
  if (!domRef.value) return
  imgCode.value = draw(domRef.value, 120, 40)
}

onMounted(() => {
  getImgCode()
})

watch(
  () => props.code,
  (newValue) => {
    setImgCode(newValue)
  },
)
watch(imgCode, (newValue) => {
  emit('update:code', newValue)
})

defineExpose({ getImgCode })
</script>
