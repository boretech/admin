/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const DATE_FORMAT = 'YYYY-MM-DD'

export const formatToDateTime = (
  date,
  format = DATE_TIME_FORMAT,
) => dayjs(date).format(format)

export const formatToDate = (
  date,
  format = DATE_FORMAT,
) => dayjs(date).format(format)

export const dateUtil = dayjs