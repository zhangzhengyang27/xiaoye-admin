<template>
  <div ref="resultRef" class="result">
    <div
      v-for="(item, index) in options"
      :key="item.path"
      :ref="'resultItemRef' + index"
      class="result-item dark:bg-[#1d1d1d]"
      :style="itemStyle(item)"
      @click="handleTo"
      @mouseenter="handleMouse(item)"
    >
      <component :is="useRenderIcon(item.meta?.icon)" />
      <span class="result-item-title"> {{ item.meta?.title }} </span>
      <EnterOutlined />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Props } from '../types'
import { useResizeObserver } from '@pureadmin/utils'
import { useEpThemeStoreHook } from '@/stores/modules/epTheme'
import { useRenderIcon } from '@/components/icon/hooks'
import { ref, computed, getCurrentInstance, onMounted } from 'vue'
import EnterOutlined from '@/assets/svg/enter_outlined.svg'

interface Emits {
  (e: 'update:value', val: string): void
  (e: 'enter'): void
}

const resultRef = ref()
const innerHeight = ref()
const emit = defineEmits<Emits>()
const instance = getCurrentInstance()!
const props = withDefaults(defineProps<Props>(), {})

const itemStyle = computed(() => {
  return (item) => {
    return {
      background: item?.path === active.value ? useEpThemeStoreHook().epThemeColor : '',
      color: item.path === active.value ? '#fff' : '',
      fontSize: item.path === active.value ? '16px' : '14px',
    }
  }
})

const active = computed({
  get() {
    return props.value
  },
  set(val: string) {
    emit('update:value', val)
  },
})

/** 鼠标移入 */
async function handleMouse(item) {
  active.value = item.path
}

function handleTo() {
  emit('enter')
}

function resizeResult() {
  // el-scrollbar max-height="calc(90vh - 140px)"
  innerHeight.value = window.innerHeight - window.innerHeight / 10 - 140
}

useResizeObserver(resultRef, resizeResult)

/**
 * 处理搜索结果项的滚动位置计算
 * @param index 当前结果项的索引
 * @returns 返回需要滚动的距离，如果不需要滚动则返回0
 * @description 根据当前结果项的位置和视窗高度，计算需要滚动的距离
 * 计算规则：当前项offsetTop + 固定偏移量(128px) - 视窗高度
 */
function handleScroll(index: number) {
  const curInstance = instance?.proxy?.$refs[`resultItemRef${index}`]
  if (!curInstance) return 0
  const curRef = curInstance[0] as ElRef
  const scrollTop = curRef.offsetTop + 128 // 128 两个result-item（56px+56px=112px）高度加上下margin（8px+8px=16px）
  return scrollTop > innerHeight.value ? scrollTop - innerHeight.value : 0
}

onMounted(() => {
  resizeResult()
})

defineExpose({ handleScroll })
</script>

<style scoped lang="scss">
.result {
  padding-bottom: 12px;

  &-item {
    display: flex;
    align-items: center;
    height: 56px;
    padding: 14px;
    margin-top: 8px;
    cursor: pointer;
    border: 0.1px solid #ccc;
    border-radius: 4px;
    transition: font-size 0.16s;

    &-title {
      display: flex;
      flex: 1;
      margin-left: 5px;
    }
  }
}
</style>
