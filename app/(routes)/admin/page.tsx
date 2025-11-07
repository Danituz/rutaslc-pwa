"use client"

import { useEffect } from "react"
import { ClipboardList } from "lucide-react"

import { BottomNav } from "@/components/bottom-nav"
import { ScreenHeader } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useScheduleStore } from "@/lib/store"
import { formatMessenger } from "@/lib/utils"
import { getAssignmentsForWeek } from "@/lib/rotation"

export default function AdminPage() {
  const { init, rotation, today } = useScheduleStore()

  useEffect(() => {
    void init()
  }, [init])

  const currentAssignments = rotation
    ? getAssignmentsForWeek(today, rotation)
    : []
  const nextAssignments = rotation
    ? getAssignmentsForWeek(today, rotation, { offset: 1 })
    : []

  const renderCard = (title: string, assignments: typeof currentAssignments) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        <ClipboardList className="size-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-4">
        {assignments.map((assignment) => (
          <div
            key={`${title}-${assignment.routeId}-${assignment.messenger}`}
            className="flex items-center justify-between rounded-xl border px-3 py-2"
          >
            <div>
              <p className="text-sm font-semibold">{assignment.routeName}</p>
              <p className="text-xs text-muted-foreground">
                Semana #{assignment.weekNumber} • {assignment.startDate} - {assignment.endDate}
              </p>
            </div>
            <span className="text-sm font-medium text-foreground/80">
              {formatMessenger(assignment.messenger)}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  )

  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col gap-6 px-4 pb-28 pt-10">
      <ScreenHeader
        title="Rotación"
        description="Información local para validar quién lleva cada ruta."
        date={today}
      />

      {rotation ? (
        <div className="space-y-5">
          {renderCard("Semana en curso", currentAssignments)}
          {renderCard("Siguiente semana", nextAssignments)}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Cargando rotación…</p>
      )}

      <BottomNav />
    </div>
  )
}
