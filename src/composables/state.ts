import type { Timezone } from '~/types'

export const now = useNow({ interval: 30000 })

// 获取当前用户 timezone
export const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
export interface State {
  name?: string
  description?: string
  zones: string[]
  homeZone: string
  date: Date
  selection: Selection[]
}

export interface Selection {
  from: Date
  to: Date
}

export const storage = useStorage<State>('world-time-state', {
  zones: [],
  homeZone: userTimezone,
  date: new Date(),
  selection: [],
})

// export const zoneNames = $ref<String[]>([])
// 持久化
export const zoneNames = $toRef(storage.value, 'zones')
export const homeZone = toRef(storage.value, 'homeZone')
export const zones = $computed(() => zoneNames.map(name => timezones.find(zone => zone.name === name)))

export const addToZones = (timezone: Timezone) => {
  zoneNames.push(timezone.name)
}

// 删除 指定zone
export const removeZone = (timezone: Timezone) => {
  const index = zoneNames.indexOf(timezone.name)
  zoneNames.splice(index, 1)
}

// 上移或者下移指定zone
export const moveZone = (timezone: Timezone, step: 1 | -1) => {
  // 获取移动前初始索引
  const index = zoneNames.indexOf(timezone.name)
  if (index === -1)
    return
  // 移动的目标索引
  const targetIndex = index + step
  // 记录目标 索引对应的值
  const targetName = zoneNames[targetIndex]
  // 交换两个位置的值
  zoneNames[targetIndex] = timezone.name
  zoneNames[index] = targetName
}

// 设置 任意 时区为自己的主时区
export const turnToHomeZone = (timezone: Timezone) => {
  homeZone.value = timezone.name
}

// 获取 当前用户 timezone 的 offset
export const userTimezoneOffset = computed(() => timezones.find(timezone => timezone.name === homeZone.value).offset)

// 当 zones 为空时设置当前用户 timezone 为 默认值
if (!zones.length)
  zoneNames.push(userTimezone)

