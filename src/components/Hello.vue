<script setup lang="ts">
const props = defineProps<{
  name: string
}>()

const uppercase = computed(() => props.name.toLocaleUpperCase())
</script>

<template>
  <div text="red 3xl">Hello, {{ uppercase }}</div>
  <div i-carbon-bee text-yellow text-3xl></div>
</template>
