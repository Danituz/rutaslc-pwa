import dayjs from "dayjs"
import isoWeek from "dayjs/plugin/isoWeek"
import localizedFormat from "dayjs/plugin/localizedFormat"
import utc from "dayjs/plugin/utc"
import "dayjs/locale/es"

dayjs.extend(isoWeek)
dayjs.extend(localizedFormat)
dayjs.extend(utc)
dayjs.locale("es")

export const toIsoDate = (value: dayjs.ConfigType = new Date()): string =>
  dayjs(value).format("YYYY-MM-DD")

export const isSaturday = (value: dayjs.ConfigType = new Date()): boolean =>
  dayjs(value).isoWeekday() === 6

export const startOfIsoWeek = (value: dayjs.ConfigType = new Date()) =>
  dayjs(value).isoWeekday(1).startOf("day")

export const endOfIsoWeek = (value: dayjs.ConfigType = new Date()) =>
  startOfIsoWeek(value).add(6, "day").endOf("day")

export const weekDiffFromBase = (
  value: dayjs.ConfigType,
  base: dayjs.ConfigType
): number => startOfIsoWeek(value).diff(startOfIsoWeek(base), "week")

export const formatHumanDate = (value: dayjs.ConfigType = new Date()) =>
  dayjs(value).format("dddd D [de] MMMM")

export const getWeekNumber = (value: dayjs.ConfigType = new Date()) =>
  dayjs(value).isoWeek()

export const getWeekRange = (value: dayjs.ConfigType = new Date()) => {
  const start = startOfIsoWeek(value)
  const end = endOfIsoWeek(value)
  return {
    start,
    end,
    label: `${start.format("DD MMM")} - ${end.format("DD MMM")}`,
  }
}

export default dayjs
