import { ReactNode } from "react"

interface BadgeProps {
  children: ReactNode
  tone?: "default" | "info" | "success"
}

const toneStyles: Record<Required<BadgeProps>["tone"], string> = {
  default: "bg-muted text-foreground",
  info: "bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-100",
  success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-100",
}

export function PillBadge({ children, tone = "default" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${toneStyles[tone]}`}>
      {children}
    </span>
  )
}
