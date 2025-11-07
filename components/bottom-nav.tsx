"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CalendarDays, Home, Settings, UserRound } from "lucide-react"

import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Hoy", icon: Home },
  { href: "/semana", label: "Semana", icon: CalendarDays },
  { href: "/admin", label: "Rotación", icon: Settings },
  { href: "/perfil", label: "Perfil", icon: UserRound },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 px-4 pt-2"
      style={{ paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + 0.75rem)` }}
    >
      <div className="mx-auto flex max-w-md items-center justify-between rounded-3xl border border-white/20 bg-slate-900/80 p-2 text-white shadow-2xl shadow-blue-950/40 backdrop-blur">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center rounded-2xl px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-wide transition",
                isActive
                  ? "bg-white text-slate-900 shadow-lg shadow-blue-900/20"
                  : "text-white/70 hover:text-white"
              )}
            >
              <Icon className={cn("mb-1 size-4", isActive ? "text-blue-600" : "text-white/70")} />
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
