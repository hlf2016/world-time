import type { Timezone } from '~/types'
// export const zoneNames = $ref<String[]>([])
// 持久化
export const zoneNames = $(useStorage<String[]>('world-time-zones', []))
export const zones = $computed(() => zoneNames.map(name => timezones.find(zone => zone.name === name)))

export const addToZones = (timezone: Timezone) => {
  zoneNames.push(timezone.name)
}

// 获取当前用户 timezone
const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

// 当 zones 为空时设置当前用户 timezone 为 默认值
if (!zones.length)
  zoneNames.push(userTimezone)

