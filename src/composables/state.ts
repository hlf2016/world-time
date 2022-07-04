import type { Timezone } from '~/types'

export const now = useNow({ interval: 30000 })

// export const zoneNames = $ref<String[]>([])
// 持久化
export const zoneNames = $(useStorage<String[]>('world-time-zones', []))
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
// 获取当前用户 timezone
export const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

// 当 zones 为空时设置当前用户 timezone 为 默认值
if (!zones.length)
  zoneNames.push(userTimezone)

