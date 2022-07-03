import type { Timezone } from '~/types'
export const zones = $ref<Timezone[]>([])

export const addToZones = (timezone: Timezone) => {
  zones.push(timezone)
}
