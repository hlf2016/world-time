<script setup lang="ts">
import type { Timezone } from '../types'

const { timezone } = defineProps<{
  timezone: Timezone
}>()

// 分别取出洲和城市
const state = computed(() => timezone.name.split('/')[0])
const city = computed(() => timezone.name.split('/')[1])
</script>

<template>
  <div flex gap2 py1>
    <div w-8 ma op80 font-bold>
      {{ timezone.offset > 0 ? `+${timezone.offset}` : timezone.offset }}
    </div>
    <div flex="~ col" text-left flex-auto>
      <div>
        {{ city }}
      </div>
      <div text-sm op50 leading-1em>
        {{ state }}
      </div>
    </div>
  </div>
</template>
