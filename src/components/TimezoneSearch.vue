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

const searchResults = $computed(() => {
  return fuse.search(input)
})

const add = (timezone: Timezone) => {
  addToZones(timezone)
  input = ''
  index = 0
}

const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowDown')
    index = (index + 1) % searchResults.length
  else if (e.key === 'ArrowUp')
    // + searchResults.length 是为了 当 在第一个位置 向上翻时 直接到达底部 闭环
    index = ((index - 1) + searchResults.length) % searchResults.length
  else if (e.key === 'Enter' && searchResults[index])
    // 只有 searchResults[index] 不为空 才能点击触发 add
    add(searchResults[index].item)
}

// 当点击搜索结果外部空白处时 清空搜索框 隐藏搜索结果
const model = ref<HTMLDivElement>()
onClickOutside(model, () => {
  if (input) {
    input = ''
    index = 0
  }
})
</script>

<template>
  <div ref="model" relative>
    <input v-model="input" type="text" placeholder="Search timezone" p="x3 y2" text-xl border="~ base rounded"
      bg-transparent w-full @keydown="onKeyDown">
    <!-- ref 添加对元素的引用 进而进行控制 -->
    <div v-show="input" absolute top-full bg-base border="~ base rounded" left-0 right-0 max-h-100 overflow-auto z-10
      shadow>
      <button v-for="s, idx in searchResults" :key="s.refIndex" block w-full px2 pb1 hover:bg-gray-5 border="b base"
        :class="idx === index ? 'bg-gray:20' : ''" @click="add(s.item)">
        <TimezoneItem :timezone="s.item" />
      </button>
    </div>
  </div>
</template>
