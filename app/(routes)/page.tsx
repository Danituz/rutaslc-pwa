"use client"

import Link from "next/link"
import { useEffect } from "react"
import { Loader2, MapPin } from "lucide-react"

import { BottomNav } from "@/components/bottom-nav"
import { ScreenHeader } from "@/components/header"
import { RouteCard } from "@/components/route-card"
import { StopItem } from "@/components/stop-item"
import { PillBadge } from "@/components/badges"
import { Button } from "@/components/ui/button"
import { useScheduleStore } from "@/lib/store"
import { isSaturday } from "@/lib/dates"
import { getAssignmentsForWeek, getRouteForMessenger } from "@/lib/rotation"
import { getRouteById } from "@/lib/schedules"
import { formatMessenger } from "@/lib/utils"
import { getStopStatus } from "@/lib/stops"

export default function HomePage() {
  const { init, loading, weekday, saturday, rotation, user, today, error } =
    useScheduleStore()

  useEffect(() => {
    void init()
  }, [init])

  const saturdayMode = isSaturday(today)
  const dataset = saturdayMode ? saturday : weekday
  const assignments = rotation ? getAssignmentsForWeek(today, rotation) : []
  const currentAssignment = user
    ? getRouteForMessenger(user, assignments)
    : undefined
  const currentRoute = dataset && currentAssignment
    ? getRouteById(dataset, currentAssignment.routeId)
    : undefined

  const stopsWithStatus = currentRoute
    ? currentRoute.stops.map((stop) => ({
        ...stop,
        status: getStopStatus(stop, today),
      }))
    : []

  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col gap-6 px-4 pb-28 pt-10">
      <ScreenHeader
        title={user ? `Hola, ${formatMessenger(user)}` : "Hola"}
        description="Aquí tienes tu ruta asignada para hoy."
        date={today}
        rightSlot={
          <PillBadge tone={saturdayMode ? "info" : "success"}>
            {saturdayMode ? "Sábado" : "Lunes a Viernes"}
          </PillBadge>
        }
      />

      {loading ? (
        <div className="flex flex-1 items-center justify-center">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
        </div>
      ) : null}

      {!loading && error ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {!loading && !user ? (
        <div className="rounded-2xl border bg-card/70 p-6 text-center">
          <p className="text-base font-medium">Selecciona tu perfil para ver tu ruta.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Guardamos tu elección localmente para que no necesites conexión.
          </p>
          <Button className="mt-4" asChild>
            <Link href="/perfil">Elegir mensajero</Link>
          </Button>
        </div>
      ) : null}

      {!loading && user && !currentRoute ? (
        <div className="rounded-2xl border bg-card/70 p-6 text-center text-sm text-muted-foreground">
          No encontramos datos para tu ruta hoy. Asegúrate de sincronizar cuando tengas
          conexión.
        </div>
      ) : null}

      {currentRoute ? (
        <RouteCard
          route={currentRoute}
          timeframe={saturdayMode ? "Horario de sábado" : "Lunes a viernes"}
          footer={
            currentAssignment ? (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="size-4" />
                Semana #{currentAssignment.weekNumber}
              </div>
            ) : null
          }
        >
          {stopsWithStatus.map((stop) => (
            <StopItem
              key={`${stop.time}-${stop.location}`}
              stop={stop}
              status={stop.status}
            />
          ))}
        </RouteCard>
      ) : null}

      <BottomNav />
    </div>
  )
}
