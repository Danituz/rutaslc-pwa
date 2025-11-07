import { ScheduleDataset, RouteSchedule, Timeframe } from "@/types"

const fileByTimeframe: Record<Timeframe, string> = {
  weekday: "/schedules/weekday.json",
  saturday: "/schedules/saturday.json",
}

const scheduleCache = new Map<Timeframe, ScheduleDataset>()

export const loadSchedule = async (timeframe: Timeframe) => {
  if (scheduleCache.has(timeframe)) return scheduleCache.get(timeframe)!
  const response = await fetch(fileByTimeframe[timeframe])
  if (!response.ok) throw new Error(`No se pudo cargar ${fileByTimeframe[timeframe]}`)
  const data = (await response.json()) as ScheduleDataset
  scheduleCache.set(timeframe, data)
  return data
}

export const getRouteById = (
  dataset: ScheduleDataset | null | undefined,
  routeId: string
): RouteSchedule | undefined => dataset?.routes.find((route) => route.id === routeId)
