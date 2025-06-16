<template>
  <footer
    class="flex items-center justify-center w-full pb-2 text-sm text-[rgba(0,0,0,0.6)] dark:text-[rgba(220,220,242,0.8)]"
  >
    Copyright © 2020-present xiaoye
  </footer>
</template>

<script setup lang="ts">
import { getConfig } from '@/config'

const TITLE = getConfig('Title')
</script>
