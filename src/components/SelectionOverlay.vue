<script setup lang="ts">
let leftEdge = $ref(40)
let rightEdge = $ref(100)
const top = $ref(0)
const bottom = $ref(0)

const left = $computed(() => Math.min(rightEdge, leftEdge))
const right = $computed(() => Math.max(rightEdge, leftEdge))

const { pressed } = $(useMousePressed())
const { x } = $(useMouse())

const el = ref<HTMLElement>()
const box = useElementBounding(el)

useEventListener('mousedown', () => {
  leftEdge = (x - box.left.value) > 0 ? x - box.left.value : 0
})

// 监听 鼠标 按下时间
watchEffect(() => {
  if (!pressed)
    return
  rightEdge = x - leftEdge
})

const position = computed(() => ({
  top: `${top}px`,
  left: `${left}px`,
  width: `${right - left}px`,
  bottom: 0,
}))

// 左侧透明阴影
const leftShadow = computed(() => ({
  left: 0,
  top: `${top}px`,
  bottom: `${bottom}px`,
  width: `${left}px`,
}))

// 右侧透明阴影
const rightShadow = computed(() => ({
  right: 0,
  top: `${top}px`,
  bottom: `${bottom}px`,
  left: `${right}px`,
}))
</script>

<template>
  <div v-show="pressed" ref="el" pointer-events-none>
    <!-- 左侧透明阴影 -->
    <div absolute :style="leftShadow" bg-white:80 />
    <!-- 右侧侧透明阴影 -->
    <div absolute :style="rightShadow" bg-white:80 w-full />
    <div absolute :style="position" border="3 green6 rounded" shadow />
  </div>
</template>
