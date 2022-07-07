<script setup lang="ts">
import { format } from 'date-fns'
import type { Timezone } from '../types'
const { timezone } = defineProps<{
  timezone: Timezone
}>()

// i + timezone.offset + 1 是因为 Array.from 的索引是从 0 开始的 我们需要从1 开始的
const hours = $computed(() => Array.from({ length: 24 }, (_, i) => i + timezone.offset + 1))

// 通过计算 将 时间轴 分段 昨天 今天 和 明天
const yesterday = $computed(() => hours.filter(i => i < 0).map(h => (h + 24) % 24))
const today = $computed(() => hours.filter(i => i >= 0 && i < 24).map(h => (h + 24) % 24))
const tomorrow = $computed(() => hours.filter(i => i >= 24).map(h => h % 24))

// 时间段合并下 便于遍历
const days = computed(() => [
  yesterday,
  today,
  tomorrow,
])

// 判断是否午夜 或者 晚上 用于样式渲染
const isMidNight = (h: number) => {
  return h <= 5 || h >= 22
}

const isNight = (h: number) => {
  return h <= 7 || h >= 18
}
</script>

<template>
  <div flex="~" gap1 of-auto items-center>
    <template v-for="day, idx of days" :key="idx">
      <!-- 如果缺少哪个时间段的时间 则不去渲染 -->
      <!-- overflow-hidden 是为了把背景溢出圆角的部分给隐藏掉 否则会显示成直角 -->
      <!-- of-hidden 的同时 flex-none 表示不再挤在一行 可自由滚动 -->
      <div v-if="day.length" flex="~ none" border="~ sky6/70 rounded" of-hidden>
        <!-- 23 和 0 分别是每天的交界处 -->
        <div v-for="i in day" :key="i" w-7 h8 flex="~ col none" items-center justify-center :class="[
          isMidNight(i) ? 'bg-sky6:70 text-white' : isNight(i) ? 'bg-sky:20' : '',
        ]">
          <!-- 用具体的日期 替换 0 更好的视觉 -->
          <div v-if="i">
            {{ i }}
          </div>
          <div v-else text-xs leading-1em text-center>
            {{ format(now, 'MMM') }}
            {{ format(now, 'dd') }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
