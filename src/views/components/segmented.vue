<template>
  <el-card shadow="always">
    <template #header>
      <div class="card-header">
        <el-space wrap :size="40">
          <span style="font-size: 16px; font-weight: 800"> 分段控制器 </span>
          <el-radio-group v-model="size">
            <el-radio value="large">大尺寸</el-radio>
            <el-radio value="default">默认尺寸</el-radio>
            <el-radio value="small">小尺寸</el-radio>
          </el-radio-group>
        </el-space>
      </div>
    </template>
    <el-scrollbar>
      <div class="mb-2">
        基础用法（v-model）<span class="text-primary">
          {{ optionsBasis[value].label }}
        </span>
      </div>
      <Segmented v-model="value" :options="optionsBasis" :size="dynamicSize" />
      <el-divider />
      <div class="mb-2">tooltip 提示</div>
      <Segmented :options="optionsTooltip" :size="dynamicSize" />
      <el-divider />
      <div class="mb-2">change 事件</div>
      <Segmented :options="optionsChange" :size="dynamicSize" @change="onChange" />
      <el-divider />
      <div class="mb-2">禁用</div>
      <Segmented :options="optionsDisabled" :size="dynamicSize" />
      <el-divider />
      <div class="mb-2">全局禁用</div>
      <Segmented :options="optionsBasis" :size="dynamicSize" disabled />
      <el-divider />
      <div class="mb-2">block 属性(将宽度调整为父元素宽度)</div>
      <Segmented :options="optionsBlock" block :size="dynamicSize" />
      <el-divider />
      <div class="mb-2">可设置图标</div>
      <Segmented :options="optionsIcon" :size="dynamicSize" />
      <el-divider />
      <div class="mb-2">只设置图标</div>
      <Segmented :options="optionsOnlyIcon" :size="dynamicSize" />
      <el-divider />
      <div class="mb-2">自定义渲染</div>
      <Segmented :options="optionsLabel" :size="dynamicSize" />
    </el-scrollbar>
  </el-card>
</template>

<script setup lang="tsx">
import { h, ref, watch } from 'vue'
import { message } from '@/utils/message'
import { useRenderIcon } from '@/components/icon/hooks'
import Segmented from '@/components/Segmented'
import { type OptionsType } from '@/components/Segmented/type'

// 静态资源
import HomeFilled from '~icons/ep/home-filled'

defineOptions({
  name: 'Segmented',
})

/** 基础用法 */
const value = ref(4) // 必须为number类型
const size = ref('default')
const dynamicSize = ref()

const optionsBasis: Array<OptionsType> = [
  {
    label: '周一',
  },
  {
    label: '周二',
  },
  {
    label: '周三',
  },
  {
    label: '周四',
  },
  {
    label: '周五',
  },
]

/** tooltip 提示 */
const optionsTooltip: Array<OptionsType> = [
  {
    label: '周一',
    tip: '周一启航，新的篇章',
  },
  {
    label: '周二',
    tip: '周二律动，携手共进',
  },
  {
    label: '周三',
    tip: '周三昂扬，激情不减',
  },
  {
    label: '周四',
    tip: '周四精进，事半功倍',
  },
  {
    label: '周五',
    tip: '周五喜悦，收尾归档',
  },
]

/** 禁用 */
const optionsDisabled: Array<OptionsType> = [
  {
    label: '周一',
  },
  {
    label: '周二',
  },
  {
    label: '周三',
    disabled: true,
  },
  {
    label: '周四',
  },
  {
    label: '周五',
    disabled: true,
  },
]

/** block */
const optionsBlock: Array<OptionsType> = [
  {
    label: '周一',
  },
  {
    label: '周二',
  },
  {
    label: '周三',
  },
  {
    label: '周四',
  },
  {
    label: '周五喜悦，收尾归档，周末倒计时',
    tip: '周五喜悦，收尾归档，周末倒计时',
  },
]

/** 可设置图标 */
const optionsIcon: Array<OptionsType> = [
  {
    label: '周一',
    icon: HomeFilled,
  },
  {
    label: '周二',
  },
  {
    label: '周三',
    icon: 'ri:terminal-window-line',
  },
  {
    label: '周四',
  },
  {
    label: '周五',
    icon: 'streamline-emojis:2',
  },
]

/** 只设置图标 */
const optionsOnlyIcon: Array<OptionsType> = [
  {
    icon: HomeFilled,
  },
  {
    icon: 'ri:terminal-window-line',
  },
  {
    icon: 'streamline-emojis:cow-face',
  },
  {
    icon: 'streamline-emojis:airplane',
  },
  {
    icon: 'streamline-emojis:2',
  },
]

/** 自定义渲染 */
const optionsLabel: Array<OptionsType> = [
  {
    label: () => (
      <div>
        {h(useRenderIcon(HomeFilled), {
          class: 'm-auto mt-1 w-[18px] h-[18px]',
        })}
        <p>周一</p>
      </div>
    ),
  },
  {
    label: () => (
      <div>
        {h(useRenderIcon('ri:terminal-window-line'), {
          class: 'm-auto mt-1 w-[18px] h-[18px]',
        })}
        <p>周二</p>
      </div>
    ),
  },
  {
    label: () => (
      <div>
        {h(useRenderIcon('streamline-emojis:cow-face'), {
          class: 'm-auto mt-1 w-[18px] h-[18px]',
        })}
        <p>周三</p>
      </div>
    ),
  },
]

const optionsChange: Array<OptionsType> = [
  {
    label: '周一',
    value: 1,
  },
  {
    label: '周二',
    value: 2,
  },
  {
    label: '周三',
    value: 3,
  },
]

/** change 事件 */
function onChange({ index, option }) {
  const { label, value } = option
  message(`当前选中项索引为：${index}，名字为${label}，值为${value}`, {
    type: 'success',
  })
}

watch(size, (val) => (dynamicSize.value = size.value))
</script>

<style scoped>
:deep(.el-divider--horizontal) {
  margin: 17px 0;
}
</style>
