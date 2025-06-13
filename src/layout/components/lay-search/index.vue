<template>
  <div class="search-container w-[40px] h-[48px] flex-c cursor-pointer navbar-bg-hover" @click="handleSearch">
    <IconifyIconOffline icon="ri/search-line" />
  </div>
  <SearchModal v-model:value="show" />
</template>

<script setup lang="ts">
import { useBoolean } from '@/layout/hooks/useBoolean'
import SearchModal from './components/SearchModal.vue'

const { bool: show, toggle } = useBoolean()
function handleSearch() {
  toggle()
}
</script>
