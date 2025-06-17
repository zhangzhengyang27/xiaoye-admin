<template>
  <el-card shadow="always">
    <template #header>
      <div class="card-header">
        <span class="font-medium">
          <el-link href="https://animate.style/" target="_blank" style="margin: 0 4px 5px; font-size: 16px">
            animate.css
          </el-link>
          选择器
        </span>
      </div>
    </template>

    <ul class="animateWrap">
      <li
        v-for="(animate, index) in animatesList"
        :key="index"
        :class="animateClass"
        @mouseenter.prevent="onMouseEnter(index)"
        @mouseleave.prevent="onMouseleave"
      >
        <h4 :class="['animate__animated', animateMap[index]?.loading ? `animate__${animate} animate__infinite` : '']">
          {{ animate }}
        </h4>
      </li>
    </ul>
  </el-card>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { animates } from './animate'
import cloneDeep from 'lodash.clonedeep'

defineOptions({
  name: 'AnimateCss',
})

defineProps({
  placeholder: {
    type: String,
    default: '请选择动画',
  },
})

const animatesList = ref(animates)
const copyAnimatesList = cloneDeep(animatesList)

const animateClass = computed(() => {
  return [
    'mt-4',
    'flex',
    'border',
    'w-[180px]',
    'h-[180px]',
    'items-center',
    'cursor-pointer',
    'transition-all',
    'justify-center',
    'border-[#e5e7eb]',
    'hover:text-primary',
    'hover:duration-[700ms]',
  ]
})

const animateMap = ref({})
function onMouseEnter(index: string | number) {
  animateMap.value[index] = animateMap.value[index]?.loading
    ? Object.assign({}, animateMap.value[index], {
        loading: false,
      })
    : Object.assign({}, animateMap.value[index], {
        loading: true,
      })
}
function onMouseleave() {
  animateMap.value = {}
}
</script>

<style lang="scss" scoped>
.animateWrap {
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  justify-content: space-evenly;
  overflow-x: hidden;
}
</style>
