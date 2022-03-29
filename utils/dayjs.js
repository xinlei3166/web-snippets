import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday.js'

dayjs.extend(weekday)

export const formatDatetime = (datetime, format) => {
  return dayjs(datetime).format(format || 'YYYY-MM-DD HH:mm:ss')
}

export const formatTimeStamp = (datetime) => {
  return dayjs(datetime).unix()
}

export const getWeekday = (datetime) => {
  return dayjs(datetime).weekday()
}

console.log(getWeekday('2021-04-17'))
