<script setup lang="ts">
import timezone from 'timezones.json'
// 前端 搜索库 https://fusejs.io/
import Fuse from 'fuse.js'

// 实例化一个fuse
const fuse = new Fuse(timezone, {
  keys: ['utc', 'text', 'value'],
  threshold: 0.3,
})

interface Timezone {
  name: string
  offset: number
}

const zones = ref<Timezone[]>([])

const input = ref('')

const searchResults = computed(() => {
  return fuse.search(input.value)
})
</script>

<template>
  <div>
    <input v-model="input">
    <div>
      <div v-for="s in searchResults" :key="s.refIndex">
        {{ s.item.text }}
      </div>
    </div>
  </div>
</template>

<style>
html {
  background: #222;
  color: #fff;
  color-scheme: dark;
}
</style>
