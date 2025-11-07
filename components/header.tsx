import { ReactNode } from "react"
import { formatHumanDate } from "@/lib/dates"

interface HeaderProps {
  title: string
  description?: string
  date?: string
  rightSlot?: ReactNode
}

export function ScreenHeader({ title, description, date, rightSlot }: HeaderProps) {
  return (
    <header className="flex flex-col gap-2">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {date ? formatHumanDate(date) : formatHumanDate()}
          </p>
          <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
        </div>
        {rightSlot}
      </div>
      {description ? (
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      ) : null}
    </header>
  )
}
