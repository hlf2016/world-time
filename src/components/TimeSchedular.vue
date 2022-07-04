<script setup lang="ts">
</script>

<template>
  <div>
    <div v-for="zone, idx in zones" :key="zone.name" px4 py2 border="b base" relative>
      <TimezoneItem :timezone="zone" />
      <div absolute top-0 bottom-0 left="-6" text-xl flex="~ col" justify-center>
        <button i-carbon-close icon-btn m--1px title="删除" @click="removeZone(zone)" />
        <button v-if="idx !== 0" m--1px i-carbon-caret-up icon-btn title="上移" @click="moveZone(zone, -1)" />
        <button v-if="idx !== zones.length - 1" m--1px i-carbon-caret-down icon-btn title="下移"
          @click="moveZone(zone, 1)" />
      </div>
    </div>
  </div>
</template>
