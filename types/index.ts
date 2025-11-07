export type Timeframe = "weekday" | "saturday"

export type MessengerId = "eric" | "daniel" | "ismael" | "juan"

export interface Stop {
  time: string
  location: string
  type?: "stop" | "break" | "end"
  note?: string
}

export type StopStatus = "past" | "current" | "upcoming"

export interface RouteSchedule {
  id: string
  name: string
  city: string
  color: string
  stops: Stop[]
}

export interface ScheduleDataset {
  version: number
  timeframe: Timeframe
  label: string
  routes: RouteSchedule[]
}

export interface RotationRoute {
  id: string
  name: string
}

export interface RotationConfig {
  baseMonday: string
  order: MessengerId[]
  routes: RotationRoute[]
}

export interface Assignment {
  routeId: string
  routeName: string
  messenger: MessengerId
  weekOffset: number
  startDate: string
  endDate: string
  weekNumber: number
}
