import { ReactNode } from "react"
import { getRoutePalette } from "@/lib/colors"
import { RouteSchedule } from "@/types"

interface RouteCardProps {
  route: RouteSchedule
  timeframe?: string
  footer?: ReactNode
  children?: ReactNode
}

export function RouteCard({ route, timeframe, footer, children }: RouteCardProps) {
  const palette = getRoutePalette(route)

  return (
    <section
      className={`rounded-2xl border bg-white/60 p-4 shadow-sm backdrop-blur dark:bg-white/5 ${palette.border}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${palette.pill}`}>
            {route.city}
          </p>
          <h2 className="text-xl font-semibold">{route.name}</h2>
          <p className="text-xs text-muted-foreground">{route.stops.length} paradas</p>
        </div>
        {timeframe ? (
          <span className="text-xs font-medium text-muted-foreground">{timeframe}</span>
        ) : null}
      </div>
      <div className="mt-4 space-y-3">{children}</div>
      {footer ? <div className="mt-4 border-t pt-3 text-sm text-muted-foreground">{footer}</div> : null}
    </section>
  )
}
