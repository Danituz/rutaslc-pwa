import dayjs from "@/lib/dates"
import { getWeekNumber, startOfIsoWeek, weekDiffFromBase } from "@/lib/dates"
import { Assignment, RotationConfig } from "@/types"

const normalize = (value: number, length: number) =>
  ((value % length) + length) % length

export const getAssignmentsForWeek = (
  date: dayjs.ConfigType,
  config: RotationConfig,
  options: { offset?: number } = {}
): Assignment[] => {
  const { offset = 0 } = options
  const targetWeekStart = startOfIsoWeek(date).add(offset, "week")
  const diff = weekDiffFromBase(targetWeekStart, config.baseMonday)
  const weekNumber = getWeekNumber(targetWeekStart)
  const startDate = targetWeekStart.format("YYYY-MM-DD")
  const endDate = targetWeekStart.add(6, "day").format("YYYY-MM-DD")
  const size = config.order.length

  return config.routes.map((route, routeIndex) => {
    const messengerIndex = normalize(routeIndex - diff, size)
    return {
      routeId: route.id,
      routeName: route.name,
      messenger: config.order[messengerIndex],
      weekOffset: diff,
      startDate,
      endDate,
      weekNumber,
    }
  })
}

export const getRouteForMessenger = (
  messenger: string | null,
  assignments: Assignment[]
) => assignments.find((assignment) => assignment.messenger === messenger)
