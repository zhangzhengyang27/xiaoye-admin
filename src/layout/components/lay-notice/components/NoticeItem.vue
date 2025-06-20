<template>
  <div class="notice-container border-0 border-b-[1px] border-solid border-[#f0f0f0] dark:border-[#303030]">
    <el-avatar v-if="noticeItem.avatar" :size="30" :src="noticeItem.avatar" class="notice-container-avatar" />
    <div class="notice-container-text">
      <div class="notice-text-title text-[#000000d9] dark:text-white">
        <el-tooltip
          popper-class="notice-title-popper"
          :effect="tooltipEffect"
          :disabled="!titleTooltip"
          :content="noticeItem.title"
          placement="top-start"
          :enterable="!Mobile"
        >
          <div ref="titleRef" class="notice-title-content" @mouseover="hoverTitle">
            {{ noticeItem.title }}
          </div>
        </el-tooltip>
        <el-tag v-if="noticeItem?.extra" :type="noticeItem?.status" size="small" class="notice-title-extra">
          {{ noticeItem?.extra }}
        </el-tag>
      </div>

      <el-tooltip
        popper-class="notice-title-popper"
        :effect="tooltipEffect"
        :disabled="!descriptionTooltip"
        :content="noticeItem.description"
        placement="top-start"
      >
        <div
          ref="descriptionRef"
          class="notice-text-description"
          @mouseover="hoverDescription($event, noticeItem.description)"
        >
          {{ noticeItem.description }}
        </div>
      </el-tooltip>
      <div class="notice-text-datetime text-[#00000073] dark:text-white">
        {{ noticeItem.datetime }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type ListItem } from '../data'
import { ref, type PropType, nextTick } from 'vue'
import { useNav } from '@/layout/hooks/useNav'
import { isMobile } from '@/utils/is'

defineProps({
  noticeItem: {
    type: Object as PropType<ListItem>,
    default: () => {},
  },
})

const titleRef = ref(null)
const titleTooltip = ref(false)
const descriptionRef = ref(null)
const descriptionTooltip = ref(false)
const { tooltipEffect } = useNav()
const Mobile = isMobile()

function hoverTitle() {
  nextTick(() => {
    const element = titleRef.value
    if (element) {
      titleTooltip.value = element.scrollWidth > element.clientWidth
    }
  })
}

function hoverDescription(event, description) {
  // currentWidth 为文本在页面中所占的宽度，创建标签，加入到页面，获取 currentWidth ,最后在移除
  const tempTag = document.createElement('span')
  tempTag.innerText = description
  tempTag.className = 'getDescriptionWidth'
  document.querySelector('body').appendChild(tempTag)
  const currentWidth = (document.querySelector('.getDescriptionWidth') as HTMLSpanElement).offsetWidth
  document.querySelector('.getDescriptionWidth').remove()

  // cellWidth为容器的宽度
  const cellWidth = event.target.offsetWidth

  // 当文本宽度大于容器宽度两倍时，代表文本显示超过两行
  if (currentWidth > 2 * cellWidth) {
    descriptionTooltip.value = true
  } else {
    descriptionTooltip.value = false
  }
}
</script>

<style>
.notice-title-popper {
  max-width: 238px;
}
</style>

<style lang="scss" scoped>
.notice-container {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 12px 0;

  .notice-container-avatar {
    margin-right: 16px;
    background: #fff;
  }

  .notice-container-text {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;

    .notice-text-title {
      display: flex;
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 400;
      line-height: 1.5715;
      cursor: pointer;

      .notice-title-content {
        flex: 1;
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .notice-title-extra {
        float: right;
        margin-top: -1.5px;
        font-weight: 400;
      }
    }

    .notice-text-description,
    .notice-text-datetime {
      font-size: 12px;
      line-height: 1.5715;
    }

    .notice-text-description {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .notice-text-datetime {
      margin-top: 4px;
    }
  }
}
</style>
