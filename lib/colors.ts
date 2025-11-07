import { RouteSchedule } from "@/types"

export const routePalette: Record<string, { pill: string; border: string; dot: string }> = {
  "route-1": {
    pill: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-200",
    border: "border-emerald-200 dark:border-emerald-500/40",
    dot: "bg-emerald-500",
  },
  "route-2": {
    pill: "bg-sky-500/10 text-sky-700 dark:text-sky-200",
    border: "border-sky-200 dark:border-sky-500/40",
    dot: "bg-sky-500",
  },
  "route-3": {
    pill: "bg-amber-500/10 text-amber-700 dark:text-amber-200",
    border: "border-amber-200 dark:border-amber-500/40",
    dot: "bg-amber-500",
  },
  "route-4": {
    pill: "bg-rose-500/10 text-rose-700 dark:text-rose-200",
    border: "border-rose-200 dark:border-rose-500/40",
    dot: "bg-rose-500",
  },
}

export const getRoutePalette = (route: RouteSchedule | string) => {
  const key = typeof route === "string" ? route : route.id
  return routePalette[key] ?? routePalette["route-1"]
}
