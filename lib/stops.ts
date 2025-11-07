import dayjs from "@/lib/dates"
import { Stop, StopStatus } from "@/types"

const sanitizeTime = (value: string) => value.replace(/[^0-9:\-]/g, "").trim()

const parseSegment = (segment: string, base: dayjs.Dayjs) => {
  const clean = segment.replace(/[^0-9:]/g, "").trim()
  if (!clean) return null
  const [hours, minutes = "0"] = clean.split(":")
  const hour = Number(hours)
  const minute = Number(minutes)
  if (Number.isNaN(hour) || Number.isNaN(minute)) return null
  return base.hour(hour).minute(minute).second(0)
}

export const getStopStatus = (stop: Stop, isoDate: string): StopStatus => {
  const baseDay = dayjs(isoDate)
  const now = dayjs()
  if (!baseDay.isValid() || !now.isSame(baseDay, "day")) {
    // when viewing otra fecha usamos la base como referencia visual
    return "upcoming"
  }

  const pair = sanitizeTime(stop.time).split("-").map((segment) => segment.trim())
  const start = parseSegment(pair[0] ?? "", baseDay)
  const end = parseSegment(pair[1] ?? pair[0] ?? "", baseDay)

  if (!start) return "upcoming"
  if (now.isBefore(start)) return "upcoming"
  if (end && now.isAfter(end)) return "past"
  if (!end && now.diff(start, "minute") > 10) return "past"
  return "current"
}
