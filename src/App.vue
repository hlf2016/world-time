<script setup lang="ts">
import TimezoneSearch from './components/TimezoneSearch.vue'
import { zones } from './composables/state'
</script>

<template>
  <div>
    <pre>{{ zones }}</pre>
    <TimezoneSearch />
  </div>
</template>

<style>
html {
  background: #222;
  color: #fff;
  color-scheme: dark;
}
</style>
