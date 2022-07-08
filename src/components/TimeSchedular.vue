<script setup lang="ts">
</script>

<template>
  <div of-x-auto>
    <div v-for="zone, idx in zones" :key="zone.name" px4 py2 border="b base" relative>
      <TimezoneItem :timezone="zone" w-max>
        <TimeDial :timezone="zone" />
      </TimezoneItem>
      <div absolute top-0 bottom-0 left="-6" text-xl flex="~ col" justify-center>
        <!-- 用户当前时区不可删除 -->
        <button v-if="homeZone !== zone.name" i-carbon-close icon-btn m--1px title="删除" @click="removeZone(zone)" />
        <!-- scale-75 用于缩小图标显示  -->
        <button v-if="homeZone !== zone.name" i-ri-home-2-fill scale-75 @click="turnToHomeZone(zone)" />
        <button v-if="idx !== 0" m--1px i-carbon-caret-up icon-btn title="上移" @click="moveZone(zone, -1)" />
        <button v-if="idx !== zones.length - 1" m--1px i-carbon-caret-down icon-btn title="下移"
          @click="moveZone(zone, 1)" />
      </div>
    </div>
  </div>
</template>
