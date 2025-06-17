<template>
  <div class="ml-5 mt-4">
    <div class="font-medium">图标选择器</div>
    <el-input v-model="icon" style="width: 240px; margin-top: 12px; margin-bottom: 20px" disabled>
      <template #append>
        <div class="w-[40px] h-[32px] cursor-pointer flex justify-center items-center">
          <IconifyIconOnline :icon="inputValue" />
        </div>
      </template>
    </el-input>
  </div>

  <el-card shadow="always">
    <el-input v-model="filterValue" class="pt-2" style="width: 240px" placeholder="搜索图标" clearable />
    <el-tabs v-model="currentActiveType" class="mt-6 mb-6" @tab-click="handleClick">
      <el-tab-pane v-for="(pane, index) in tabsList" :key="index" :label="pane.label" :name="pane.name">
        <el-scrollbar max-height="700">
          <ul>
            <li
              v-for="(item, index) in pageList"
              :key="index"
              class="icon-item mr-2 mt-1"
              :style="iconItemStyle(item)"
              @click="onChangeIcon(item)"
            >
              <IconifyIconOnline :icon="currentActiveType + item" width="42px" height="42px" />
              <span>{{ currentActiveType + item }}</span>
            </li>
          </ul>
          <el-empty v-show="pageList.length === 0" :description="`${filterValue} 图标不存在`" :image-size="60" />
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>

    <div class="w-full h-9 flex items-center overflow-auto border-t border-[#e5efeb]">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        class="flex-auto ml-2"
        :page-sizes="[100, 200, 300, 400]"
        :pager-count="5"
        layout="total,sizes,prev, pager, next"
        background
        :total="totalPage"
        @size-change="handleSizeChange"
        @current-change="onCurrentChange"
      />
      <el-button class="justify-end mx-2!" type="danger" size="small" text bg @click="onClear"> 清空 </el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
defineOptions({
  name: 'IconSelect',
})

const icon = ref('ep:add-location')

import { IconJson } from '@/components/icon/data.ts'
import cloneDeep from 'lodash.clonedeep'
import { isAllEmpty } from '@/utils/common'
import { ref, computed, type CSSProperties, watch } from 'vue'
import Search from '~icons/ri/search-eye-line'

type ParameterCSSProperties = (item?: string) => CSSProperties | undefined

const inputValue = defineModel({ type: String })
inputValue.value = icon.value

const iconList = ref(IconJson)
console.log('iconList', iconList)

const currentActiveType = ref('ep:')
const copyIconList = cloneDeep(iconList.value)
const totalPage = ref(0)
const pageSize = ref(60)
const currentPage = ref(1)

const filterValue = ref('')

const tabsList = [
  {
    label: 'Element Plus',
    name: 'ep:',
  },
  {
    label: 'Remix Icon',
    name: 'ri:',
  },
  {
    label: 'Font Awesome 5 Solid',
    name: 'fa-solid:',
  },
]

const pageList = computed(() =>
  copyIconList[currentActiveType.value]
    .filter((i: string | string[]) => i.includes(filterValue.value))
    .slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value),
)

console.log('pageList', pageList)

const iconItemStyle = computed((): ParameterCSSProperties => {
  return (item) => {
    if (inputValue.value === currentActiveType.value + item) {
      return {
        borderColor: 'var(--el-color-primary)',
        color: 'var(--el-color-primary)',
      }
    }
  }
})

function setVal() {
  currentActiveType.value = inputValue.value!.substring(0, inputValue.value!.indexOf(':') + 1)
  icon.value = inputValue.value!.substring(inputValue.value!.indexOf(':') + 1)
}

function onBeforeEnter() {
  if (isAllEmpty(icon.value)) return
  setVal()
  // 寻找当前图标在第几页
  const curIconIndex = copyIconList[currentActiveType.value].findIndex((i) => i === icon.value)
  currentPage.value = Math.ceil((curIconIndex + 1) / pageSize.value)
}

function onAfterLeave() {
  filterValue.value = ''
}

function handleClick({ props }) {
  currentPage.value = 1
  currentActiveType.value = props.name
}

function onChangeIcon(item: string) {
  icon.value = item
  inputValue.value = currentActiveType.value + item
}

function onCurrentChange(page: number) {
  currentPage.value = page
}

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  pageSize.value = val
}

function onClear() {
  icon.value = ''
  inputValue.value = ''
}

watch(
  () => pageList.value,
  () => (totalPage.value = copyIconList[currentActiveType.value].filter((i) => i.includes(filterValue.value)).length),
  { immediate: true },
)
watch(
  () => inputValue.value,
  (val) => val && setVal(),
  { immediate: true },
)
watch(
  () => filterValue.value,
  () => (currentPage.value = 1),
)
</script>

<style scoped lang="scss">
ul {
  display: grid;
  grid-template-columns: repeat(auto-fill, 130px);
  justify-content: space-evenly;
  overflow-x: hidden;
}

.icon-item {
  box-sizing: content-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 72px;
  padding: 20px 30px;
  cursor: pointer;

  span {
    margin-top: 5px;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
  }

  &:hover {
    color: var(--el-color-primary);
    border-color: var(--el-color-primary);
    transform: scale(1.2);
    transition: all 0.6s;
  }
}

:deep(.el-tabs__item) {
  height: 50px;
  padding-bottom: 20px;
  font-size: 18px;
  font-weight: normal;
  line-height: 50px;
}
</style>
