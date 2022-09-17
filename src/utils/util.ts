import dayjs from "dayjs"
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)
const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = (n: number) => {
  const str = n.toString()
  return str[1] ? str : '0' + str
}

export { formatTime }

export function include<T>(array: T[], data: T) {
  return array.includes(data)
}

export function values<T>(array: T[]) {
  return array.values()
}
export function dateFormat(date: any, format: string) {
  return dayjs(date).format(format)
}
export function getCountdown(date: any) {
  let endTime = dayjs(date).valueOf()
  let now = dayjs()
  let duration = dayjs.duration(endTime - now.valueOf())
  return {
    hour: duration.days() > 0 ? duration.days() * 24 + duration.hours(): duration.hours(),
    minutes: duration.minutes() < 10 ? '0'+duration.minutes() : duration.minutes(),
    seconds: duration.seconds() < 10 ? '0'+duration.seconds() : duration.seconds()
  }
}

export function orderStatus(code: any) {
  let str = ''
  switch(code) {
    case '2': 
      str = '待服务'
      break
    case '3': 
      str = '洗车中'
      break
    case '4': 
      str = '已完成'
      break
    case '5': 
      str = '寻车中'
      break
    case '6': 
      str = '待付款'
      break
    case '9': 
      str = '已取消'
      break
  }
  return str
}