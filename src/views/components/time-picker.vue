<template>
  <el-card shadow="always">
    <template #header>
      <div class="card-header">
        <el-space wrap :size="40">
          <el-link
            href="https://element-plus.org/zh-CN/component/time-picker.html"
            target="_blank"
            style="font-size: 16px; font-weight: 800"
          >
            时间选择器(查看文档)
          </el-link>
          <el-radio-group v-model="size">
            <el-radio value="large">大尺寸</el-radio>
            <el-radio value="default">默认尺寸</el-radio>
            <el-radio value="small">小尺寸</el-radio>
            <el-radio value="disabled">禁用</el-radio>
          </el-radio-group>
        </el-space>
      </div>
    </template>

    <div class="mb-2">日期和时间点</div>
    <el-space wrap>
      <p class="text-[15px]">鼠标滚轮进行选择</p>
      <el-time-picker
        v-model="value"
        placeholder="请选择时间"
        class="w-[140px]!"
        :size="dynamicSize"
        :disabled="size === 'disabled'"
      />
      <p class="text-[15px]">箭头进行选择</p>
      <el-time-picker
        v-model="value1"
        arrow-control
        placeholder="请选择时间"
        class="w-[140px]!"
        :size="dynamicSize"
        :disabled="size === 'disabled'"
      />
    </el-space>
    <el-divider />

    <div class="mb-2">限制时间选择范围</div>
    <el-time-picker
      v-model="value2"
      class="w-[140px]!"
      :disabled-hours="disabledHours"
      :disabled-minutes="disabledMinutes"
      :disabled-seconds="disabledSeconds"
      placeholder="Arbitrary time"
      :size="dynamicSize"
      :disabled="size === 'disabled'"
    />
    <el-divider />

    <div class="mb-2">任意时间范围</div>
    <el-time-picker
      v-model="value3"
      class="w-[220px]!"
      is-range
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      :size="dynamicSize"
      :disabled="size === 'disabled'"
    />
  </el-card>

  <el-card shadow="always" class="mt-4">
    <template #header>
      <div class="card-header">
        <el-link
          href="https://element-plus.org/zh-CN/component/time-select.html"
          target="_blank"
          style="font-size: 16px; font-weight: 800"
        >
          时间选择(查看文档)
        </el-link>
      </div>
    </template>

    <div class="mb-2">固定时间点</div>
    <el-time-select
      v-model="value4"
      placeholder="请选择时间"
      class="w-[140px]!"
      start="08:30"
      step="00:15"
      end="18:30"
      :size="dynamicSize"
      :disabled="size === 'disabled'"
    />

    <div class="mb-2 mt-4">时间格式</div>
    <el-time-select
      v-model="value5"
      placeholder="请选择时间"
      class="w-[140px]!"
      start="00:00"
      step="00:30"
      end="23:59"
      format="hh:mm A"
      :size="dynamicSize"
      :disabled="size === 'disabled'"
    />

    <div class="mb-2 mt-4">固定时间范围</div>
    <el-space wrap>
      <el-time-select
        v-model="startTime"
        placeholder="开始时间"
        class="w-[140px]!"
        :max-time="endTime"
        start="08:30"
        step="00:15"
        end="18:30"
        :size="dynamicSize"
        :disabled="size === 'disabled'"
      />
      <el-time-select
        v-model="endTime"
        placeholder="结束时间"
        class="w-[140px]!"
        :min-time="startTime"
        start="08:30"
        step="00:15"
        end="18:30"
        :size="dynamicSize"
        :disabled="size === 'disabled'"
      />
    </el-space>
  </el-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

defineOptions({
  name: 'TimePicker',
})

const size = ref('default')
const dynamicSize = ref()

/** 时间选择器 */
const value = ref('')
const value1 = ref('')
const value3 = ref()

const value2 = ref(new Date(2016, 9, 10, 18, 30))

const makeRange = (start: number, end: number) => {
  const result: number[] = []
  for (let i = start; i <= end; i++) {
    result.push(i)
  }
  return result
}

/** 禁止选择的小时 */
const disabledHours = () => {
  return makeRange(0, 16).concat(makeRange(19, 23))
}

/** 禁止选择的分钟 */
const disabledMinutes = (hour: number) => {
  if (hour === 17) {
    return makeRange(0, 29)
  }
  if (hour === 18) {
    return makeRange(31, 59)
  }
}

/** 禁止选择的秒 */
const disabledSeconds = (hour: number, minute: number) => {
  if (hour === 18 && minute === 30) {
    return makeRange(1, 59)
  }
}

watch(size, (val) => {
  dynamicSize.value = val === 'disabled' ? 'default' : val
})

/** 时间选择 */
const value4 = ref('')
const value5 = ref('')
const startTime = ref('')
const endTime = ref('')
</script>
