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
const city = computed(() => timezone.name.split('/')[1].replace(/_/g, ' '))

// 当前时间的时区时间计算
const time = computed(() => formatter.format(now.value))
</script>

<template>
  <div flex gap2 py1>
    <div w-8 ma op80 font-bold>
      <div v-if="timezone.name === userTimezone" i-carbon-home />
      <div v-else>
        {{ timezone.offset > 0 ? `+${timezone.offset}`
            : timezone.offset
        }}
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
  </div>
</template>
