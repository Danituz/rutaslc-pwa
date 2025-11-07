"use client"

import { useEffect } from "react"
import { CheckCircle2 } from "lucide-react"

import { BottomNav } from "@/components/bottom-nav"
import { ScreenHeader } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useScheduleStore } from "@/lib/store"
import { formatMessenger } from "@/lib/utils"
import { getAssignmentsForWeek, getRouteForMessenger } from "@/lib/rotation"
import { MessengerId } from "@/types"

export default function PerfilPage() {
  const { init, rotation, user, setUser, today } = useScheduleStore()

  useEffect(() => {
    void init()
  }, [init])

  const assignments = rotation ? getAssignmentsForWeek(today, rotation) : []
  const myAssignment = user ? getRouteForMessenger(user, assignments) : undefined

  const messengers: MessengerId[] = rotation?.order ?? [
    "eric",
    "daniel",
    "ismael",
    "juan",
  ]

  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col gap-6 px-4 pb-28 pt-10">
      <ScreenHeader
        title="Tu perfil"
        description="Elige tu nombre para guardar tu ruta en este dispositivo."
        date={today}
      />

      <div className="space-y-4">
        {messengers.map((id) => (
          <Card
            key={id}
            className={user === id ? "border-emerald-400" : undefined}
          >
            <CardContent className="flex items-center justify-between py-4">
              <div>
                <p className="text-base font-semibold">{formatMessenger(id)}</p>
                {user === id && myAssignment ? (
                  <p className="text-xs text-muted-foreground">
                    Semana #{myAssignment.weekNumber}: {myAssignment.routeName}
                  </p>
                ) : null}
              </div>
              <Button
                variant={user === id ? "secondary" : "outline"}
                onClick={() => setUser(id)}
              >
                {user === id ? (
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle2 className="size-4" /> Guardado
                  </span>
                ) : (
                  "Seleccionar"
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        La selección se guarda solo en este dispositivo para funcionar sin conexión.
      </p>

      <BottomNav />
    </div>
  )
}
