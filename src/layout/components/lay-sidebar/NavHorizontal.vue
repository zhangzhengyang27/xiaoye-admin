<template>
  <div v-loading="usePermissionStoreHook().wholeMenus.length === 0" class="horizontal-header">
    <div v-if="showLogo" class="horizontal-header-left" @click="backTopMenu">
      <img :src="getLogo()" alt="logo" />
      <span>{{ title }}</span>
    </div>
    <el-menu
      ref="menuRef"
      mode="horizontal"
      popper-class="pure-scrollbar"
      class="horizontal-header-menu"
      :default-active="defaultActive"
    >
      <LaySidebarItem
        v-for="route in usePermissionStoreHook().wholeMenus"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
    <div class="horizontal-header-right">
      <!-- 菜单搜索 -->
      <LaySearch id="header-search" />
      <!-- 全屏 -->
      <LaySidebarFullScreen id="full-screen" />
      <!-- 消息通知 -->
      <LayNotice id="header-notice" />
      <!-- 退出登录 -->
      <el-dropdown trigger="click">
        <span class="el-dropdown-link navbar-bg-hover">
          <img :src="userAvatar" :style="avatarsStyle" />
          <p v-if="username" class="dark:text-white">{{ username }}</p>
        </span>
        <template #dropdown>
          <el-dropdown-item @click="toAccountSettings">
            <IconifyIconOffline :icon="AccountSettingsIcon" style="margin: 5px" />
            账户设置
          </el-dropdown-item>
          <el-dropdown-menu class="logout">
            <el-dropdown-item @click="logout">
              <IconifyIconOffline :icon="LogoutCircleRLine" style="margin: 5px" />
              退出系统
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span class="set-icon navbar-bg-hover" title="打开系统配置" @click="onPanel">
        <IconifyIconOffline :icon="Setting" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { emitter } from '@/utils/mitt'
import { useNav } from '@/layout/hooks/useNav'
import LaySearch from '../lay-search/index.vue'
import LayNotice from '../lay-notice/index.vue'
import { responsiveStorageNameSpace } from '@/config'
import { ref, nextTick, computed, onMounted } from 'vue'
import { usePermissionStoreHook } from '@/stores/modules/permission'
import LaySidebarItem from '../lay-sidebar/components/SidebarItem.vue'
import LaySidebarFullScreen from '../lay-sidebar/components/SidebarFullScreen.vue'

import GlobalizationIcon from '@/assets/svg/globalization.svg'
import AccountSettingsIcon from '~icons/ri/user-settings-line'
import LogoutCircleRLine from '~icons/ri/logout-circle-r-line'
import Setting from '~icons/ri/settings-3-line'
import Check from '~icons/ep/check'
import { isAllEmpty } from '@/utils/common'
import { storageLocal } from '@/utils/storage'

const route = useRoute()

const menuRef = ref()
const showLogo = ref(storageLocal.get<StorageConfigs>(`${responsiveStorageNameSpace()}configure`)?.showLogo ?? true)

const { title, logout, onPanel, getLogo, username, userAvatar, backTopMenu, avatarsStyle, toAccountSettings } = useNav()

const defaultActive = computed((): string => {
  return !isAllEmpty(route.meta?.activePath) ? (route.meta.activePath as string) : route.path
})

nextTick(() => {
  menuRef.value?.handleResize()
})

onMounted(() => {
  emitter.on('logoChange', (key) => {
    showLogo.value = key
  })
})
</script>

<style lang="scss" scoped>
:deep(.el-loading-mask) {
  opacity: 0.45;
}

.logout {
  width: 120px;

  ::v-deep(.el-dropdown-menu__item) {
    display: inline-flex;
    flex-wrap: wrap;
    min-width: 100%;
  }
}
</style>
