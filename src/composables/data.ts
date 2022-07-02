import timezoneRaw from 'timezones.json'
import type { Timezone } from '~/types'

// 扁平化 处理 timezone 数据 utc 部分
export const timezones = timezoneRaw.flatMap((i) => {
  return i.utc.map((u) => {
    return {
      name: u,
      offset: i.offset,
      isdst: i.isdst,
    } as Timezone
  })
})
