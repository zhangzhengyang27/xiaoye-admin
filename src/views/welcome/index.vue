<template>
  <el-row :gutter="24" justify="space-around">
    <el-col
      v-for="(item, index) in chartData"
      :key="index"
      v-motion
      class="mb-[18px]"
      :lg="6"
      :md="12"
      :sm="12"
      :xs="24"
      :initial="{
        opacity: 0,
        y: 100,
      }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: {
          delay: 80 * (index + 1),
        },
      }"
    >
      <el-card class="line-card" shadow="hover">
        <div class="flex justify-between">
          <span class="text-md font-medium">{{ item.name }}</span>
          <div
            class="w-8 h-8 flex justify-center items-center rounded-md"
            :style="{
              backgroundColor: isDark ? 'transparent' : item.bgColor,
            }"
          >
            <IconifyIconOffline :icon="item.icon" :color="item.color" width="18" height="18" />
          </div>
        </div>
        <div class="flex justify-between items-start mt-3">
          <div class="w-1/2">
            <NormalCountTo :duration="item.duration" :fontSize="'1.6em'" :startVal="100" :endVal="item.value" />
            <p class="font-medium text-green-500">{{ item.percent }}</p>
          </div>
          <ChartLine v-if="item.data.length > 1" class="w-1/2!" :color="item.color" :data="item.data" />
          <ChartRound v-else class="w-1/2!" />
        </div>
      </el-card>
    </el-col>

    <el-col
      v-motion
      class="mb-[18px]"
      :lg="18"
      :md="18"
      :sm="18"
      :xs="24"
      :initial="{
        opacity: 0,
        y: 100,
      }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: {
          delay: 400,
        },
      }"
    >
      <el-card class="bar-card" shadow="never">
        <div class="flex justify-between">
          <span class="text-md font-medium">分析概览</span>
          <Segmented v-model="curWeek" :options="optionsBasis" />
        </div>
        <div class="flex justify-between items-start mt-3">
          <ChartBar
            :requireData="barChartData[curWeek].requireData"
            :questionData="barChartData[curWeek].questionData"
          />
        </div>
      </el-card>
    </el-col>

    <el-col
      v-motion
      class="mb-[18px]"
      :lg="6"
      :md="6"
      :sm="6"
      :xs="24"
      :initial="{
        opacity: 0,
        y: 100,
      }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: {
          delay: 480,
        },
      }"
    >
      <el-card shadow="never">
        <div class="flex justify-between">
          <span class="text-md font-medium">解决概率</span>
        </div>
        <div
          v-for="(item, index) in progressData"
          :key="index"
          :class="['flex', 'justify-between', 'items-start', index === 0 ? 'mt-8' : 'mt-[2.15rem]']"
        >
          <el-progress
            :text-inside="true"
            :percentage="item.percentage"
            :stroke-width="21"
            :color="item.color"
            striped
            striped-flow
            :duration="item.duration"
          />
          <span class="text-nowrap ml-2 text-text_color_regular text-sm">
            {{ item.week }}
          </span>
        </div>
      </el-card>
    </el-col>

    <el-col
      v-motion
      class="mb-[18px]"
      :lg="18"
      :md="18"
      :sm="18"
      :xs="24"
      :initial="{
        opacity: 0,
        y: 100,
      }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: {
          delay: 560,
        },
      }"
    >
      <el-card shadow="never" class="h-[580px]">
        <div class="flex justify-between">
          <span class="text-md font-medium">数据统计</span>
        </div>
        <WelcomeTable class="mt-3" />
      </el-card>
    </el-col>

    <el-col
      v-motion
      class="mb-[18px]"
      :lg="6"
      :md="6"
      :sm="6"
      :xs="24"
      :initial="{
        opacity: 0,
        y: 100,
      }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: {
          delay: 640,
        },
      }"
    >
      <el-card shadow="never">
        <div class="flex justify-between">
          <span class="text-md font-medium">最新动态</span>
        </div>
        <el-scrollbar max-height="504" class="mt-3">
          <el-timeline>
            <el-timeline-item
              v-for="(item, index) in latestNewsData"
              :key="index"
              center
              placement="top"
              :icon="
                markRaw(
                  useRenderFlicker({
                    background: randomGradient({
                      randomizeHue: true,
                    }),
                  }),
                )
              "
              :timestamp="item.date"
            >
              <p class="text-text_color_regular text-sm">
                {{ `新增 ${item.requiredNumber} 条问题，${item.resolveNumber} 条已解决` }}
              </p>
            </el-timeline-item>
          </el-timeline>
        </el-scrollbar>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue'
import WelcomeTable from './components/table/index.vue'
import NormalCountTo from '@/components/countTo'
import { useRenderFlicker } from '@/components/flicker'
import { ChartBar, ChartLine, ChartRound } from './components/charts'
import Segmented from '@/components/Segmented'
import { type OptionsType } from '@/components/Segmented/type'
import { chartData, barChartData, progressData, latestNewsData } from './data'
import { useDark, randomGradient } from '@pureadmin/utils'

defineOptions({
  name: 'Welcome',
})

const { isDark } = useDark()

const curWeek = ref(1) // 0上周、1本周
const optionsBasis: Array<OptionsType> = [
  {
    label: '上周',
  },
  {
    label: '本周',
  },
]
</script>

<style scoped lang="scss">
:deep(.el-card) {
  --el-card-border-color: none;

  /* 解决概率进度条宽度 */
  .el-progress--line {
    width: 85%;
  }

  /* 解决概率进度条字体大小 */
  .el-progress-bar__innerText {
    font-size: 15px;
  }

  /* 隐藏 el-scrollbar 滚动条 */
  .el-scrollbar__bar {
    display: none;
  }

  /* el-timeline 每一项的边距 */
  .el-timeline-item {
    margin: 0 6px;
  }
}

.main-content {
  margin: 20px 20px 0 !important;
}
</style>
