<script setup lang="ts">
import type { Timezone } from '../types'

const { timezone } = defineProps<{
  timezone: Timezone
}>()

// 时间格式化
const formatter = new Intl.DateTimeFormat('en-US', {
  timeZone: timezone.name,
  hour12: false,
  hour: 'numeric',
  minute: 'numeric',
})

// 分别取出洲和城市
const state = computed(() => timezone.name.split('/')[0].replace(/_/g, ' '))
const city = computed(() => timezone.name.split('/')[1].replace(/_/g, ' ')) || ''

// 当前时间的时区时间计算
const time = computed(() => formatter.format(now.value))

// 计算列表各项的时间偏移 相对比 用户当前时间偏移量的差距值
const offset = computed(() => {
  const offset = timezone.offset - userTimezoneOffset.value
  return (offset > 0) ? `+${offset}` : offset
})
</script>

<template>
  <div flex flex-wrap gap3 py1>
    <div w-8 ma op80 font-bold :title="`${timezone.offset} GMT`">
      <div v-if="timezone.name === homeZone" i-ri-home-2-fill op-50 />
      <div v-else text-sky-6>
        <!-- {{ timezone.offset > 0 ? `+${timezone.offset}`
            : timezone.offset
        }} -->
        {{ offset }}
      </div>
    </div>
    <div flex="~ col" text-left flex-auto>
      <div>
        {{ city }}
        <sup border="~ base rounded" px1>{{ timezone.abbr }}</sup>
      </div>
      <div text-sm op50 leading-1em>
        {{ state }}
      </div>
    </div>
    <div ma tabular-nums>
      {{ time }}
    </div>
    <slot />
  </div>
</template>
