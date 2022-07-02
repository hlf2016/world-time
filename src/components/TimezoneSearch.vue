<script setup lang="ts">
// 前端 搜索库 https://fusejs.io/
import Fuse from 'fuse.js'
import { timezones } from '../composables/data'
import { addToZones } from '../composables/state'

// 实例化一个fuse
const fuse = new Fuse(timezones, {
  keys: ['name'],
  threshold: 0.3,
})

const input = ref('')

const searchResults = computed(() => {
  return fuse.search(input.value)
})
</script>

<template>
  <div>
    <input v-model="input" type="text">
    <div>
      <button v-for="s in searchResults" :key="s.refIndex" flex gap2 @click="addToZones(s.item)">
        <div font-mono w-10 text-right>
          {{ s.item.offset }}
        </div>
        <div> {{ s.item.name }}</div>
      </button>
    </div>
  </div>
</template>
