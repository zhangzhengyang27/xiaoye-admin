<template>
  <el-dropdown trigger="click" placement="bottom-end">
    <span :class="['dropdown-badge', 'navbar-bg-hover', 'select-none', Number(noticesNum) !== 0 && 'mr-[10px]']">
      <el-badge :value="Number(noticesNum) === 0 ? '' : noticesNum" :max="99">
        <span class="header-notice-icon">
          <IconifyIconOffline :icon="BellIcon" />
        </span>
      </el-badge>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-tabs
          v-model="activeKey"
          :stretch="true"
          class="dropdown-tabs"
          :style="{ width: notices.length === 0 ? '200px' : '330px' }"
        >
          <el-empty v-if="notices.length === 0" description="暂无消息" :image-size="60" />
          <span v-else>
            <template v-for="item in notices" :key="item.key">
              <el-tab-pane :label="getLabel(item)" :name="`${item.key}`">
                <el-scrollbar max-height="330px">
                  <div class="noticeList-container">
                    <NoticeList :list="item.list" :emptyText="item.emptyText" />
                  </div>
                </el-scrollbar>
              </el-tab-pane>
            </template>
          </span>
        </el-tabs>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { noticesData } from './data.ts'
import NoticeList from './components/NoticeList.vue'
import BellIcon from '~icons/ep/bell'

/** 消息的总数 */
const noticesNum = ref(0)

/** 消息数据 */
const notices = ref(noticesData)
const activeKey = ref(noticesData[0]?.key)

notices.value.map((v) => (noticesNum.value += v.list.length))

const getLabel = computed(() => (item) => item.name + (item.list.length > 0 ? `(${item.list.length})` : ''))
</script>

<style scoped lang="scss">
.dropdown-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 48px;
  cursor: pointer;

  .header-notice-icon {
    font-size: 18px;
  }
}

.dropdown-tabs {
  .noticeList-container {
    padding: 15px 24px 0;
  }

  :deep(.el-tabs__header) {
    margin: 0;
  }

  :deep(.el-tabs__nav-wrap)::after {
    height: 1px;
  }

  :deep(.el-tabs__nav-wrap) {
    padding: 0 36px;
  }
}
</style>
