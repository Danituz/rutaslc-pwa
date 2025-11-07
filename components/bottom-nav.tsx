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
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 px-4 py-2 shadow-2xl shadow-black/10 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex max-w-md items-center justify-between gap-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center rounded-xl px-2 py-1 text-xs font-medium text-muted-foreground transition",
                isActive && "bg-foreground/5 text-foreground"
              )}
            >
              <Icon className="size-5" />
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
