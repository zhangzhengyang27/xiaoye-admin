<template>
  <div class="search-footer text-[#333] dark:text-white">
    <span class="search-footer-item">
      <EnterOutlined class="icon" />
      确认
    </span>
    <span class="search-footer-item">
      <IconifyIconOffline :icon="ArrowUpLine" class="icon" />
      <IconifyIconOffline :icon="ArrowDownLine" class="icon" />
      切换
    </span>
    <span class="search-footer-item">
      <MdiKeyboardEsc class="icon" />
      关闭
    </span>
    <p v-if="device !== 'mobile' && total > 0" class="search-footer-total">共{{ total }}</p>
  </div>
</template>

<script setup lang="ts">
import { useNav } from '@/layout/hooks/useNav'
import MdiKeyboardEsc from '@/assets/svg/keyboard_esc.svg'
import EnterOutlined from '@/assets/svg/enter_outlined.svg'
import ArrowUpLine from '~icons/ri/arrow-up-line'
import ArrowDownLine from '~icons/ri/arrow-down-line'

withDefaults(defineProps<{ total?: number }>(), {
  total: 0,
})

const { device } = useNav()
</script>

<style lang="scss" scoped>
.search-footer {
  display: flex;

  .search-footer-item {
    display: flex;
    align-items: center;
    margin-right: 14px;
  }

  .icon {
    padding: 2px;
    margin-right: 3px;
    font-size: 20px;
    box-shadow:
      inset 0 -2px #cdcde6,
      inset 0 0 1px 1px #fff,
      0 1px 2px 1px #1e235a66;
  }

  .search-footer-total {
    position: absolute;
    right: 20px;
  }
}
</style>
