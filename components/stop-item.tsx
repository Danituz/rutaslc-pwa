import { Stop, StopStatus } from "@/types"

const stateStyles: Record<StopStatus, string> = {
  past: "opacity-60",
  current:
    "border-emerald-400/70 bg-emerald-50/70 shadow-[0_8px_30px_rgba(16,185,129,0.25)]",
  upcoming: "opacity-90",
}

export function StopItem({ stop, status = "upcoming" }: { stop: Stop; status?: StopStatus }) {
  return (
    <div
      className={`flex items-center gap-4 rounded-xl border border-border/60 px-4 py-3 transition ${stateStyles[status]}`}
    >
      <div className="flex flex-col text-xs font-semibold text-muted-foreground">
        <span>{stop.time}</span>
      </div>
      <div className="flex-1 text-sm font-medium">
        <p>{stop.location}</p>
        {stop.type === "break" ? (
          <span className="text-xs text-amber-600 dark:text-amber-300">Descanso</span>
        ) : null}
        {stop.type === "end" ? (
          <span className="text-xs text-emerald-600 dark:text-emerald-300">Fin</span>
        ) : null}
      </div>
    </div>
  )
}
