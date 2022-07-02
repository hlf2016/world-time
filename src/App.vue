<script setup lang="ts">
import timezoneRaw from 'timezones.json'
// 前端 搜索库 https://fusejs.io/
import Fuse from 'fuse.js'

interface Timezone {
  name: string
  offset: number
  isdst: boolean
}

// 扁平化 处理 timezone 数据 utc 部分
const timezone = timezoneRaw.flatMap((i) => {
  return i.utc.map((u) => {
    return {
      name: u,
      offset: i.offset,
      isdst: i.isdst,
    } as Timezone
  })
})

// 实例化一个fuse
const fuse = new Fuse(timezone, {
  keys: ['name'],
  threshold: 0.3,
})

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
      <div v-for="s in searchResults" :key="s.refIndex" flex gap2>
        <div font-mono w-10 text-right>
          {{ s.item.offset }}
        </div>
        <div> {{ s.item.name }}</div>
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
