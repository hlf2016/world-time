<script setup lang="ts">
// 前端 搜索库 https://fusejs.io/
import Fuse from 'fuse.js'
import type { Timezone } from '../types'

// 实例化一个fuse
const fuse = new Fuse(timezones, {
  keys: ['name'],
  threshold: 0.3,
})

let input = $ref('')
let index = $ref(0)

const searchResults = computed(() => {
  return fuse.search(input)
})

const add = (timezone: Timezone) => {
  addToZones(timezone)
  input = ''
  index = 0
}
</script>

<template>
  <div relative>
    <input v-model="input" type="text" placeholder="Search timezone" p="x3 y2" text-xl border="~ base rounded"
      bg-transparent w-full>
    <div v-show="input" absolute top-full bg-base left-0 right-0 px3 py2>
      <button v-for="s in searchResults" :key="s.refIndex" flex gap2 @click="add(s.item)">
        <div font-mono text-right>
          {{ s.item.offset }}
        </div>
        <div> {{ s.item.name }}</div>
      </button>
    </div>
  </div>
</template>
