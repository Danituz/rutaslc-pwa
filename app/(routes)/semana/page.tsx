"use client"

import { useEffect } from "react"
import { Loader2 } from "lucide-react"

import { BottomNav } from "@/components/bottom-nav"
import { ScreenHeader } from "@/components/header"
import { RouteCard } from "@/components/route-card"
import { StopItem } from "@/components/stop-item"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useScheduleStore } from "@/lib/store"

export default function WeekViewPage() {
  const { init, loading, weekday, saturday } = useScheduleStore()

  useEffect(() => {
    void init()
  }, [init])

  const isReady = weekday && saturday

  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col gap-6 px-4 pb-28 pt-10">
      <ScreenHeader
        title="Vista semanal"
        description="Consulta cualquier ruta en sus horarios oficiales."
      />

      {loading && !isReady ? (
        <div className="flex flex-1 items-center justify-center">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
        </div>
      ) : null}

      {isReady ? (
        <Tabs defaultValue="weekday" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="weekday">Lunes a viernes</TabsTrigger>
            <TabsTrigger value="saturday">Sábado</TabsTrigger>
          </TabsList>
          <TabsContent value="weekday" className="space-y-5 pt-4">
            {weekday!.routes.map((route) => (
              <RouteCard key={route.id} route={route} timeframe="Lu - Vi">
                {route.stops.map((stop) => (
                  <StopItem key={`${route.id}-${stop.time}-${stop.location}`} stop={stop} />
                ))}
              </RouteCard>
            ))}
          </TabsContent>
          <TabsContent value="saturday" className="space-y-5 pt-4">
            {saturday!.routes.map((route) => (
              <RouteCard key={route.id} route={route} timeframe="Sábado">
                {route.stops.map((stop) => (
                  <StopItem key={`${route.id}-${stop.time}-${stop.location}`} stop={stop} />
                ))}
              </RouteCard>
            ))}
          </TabsContent>
        </Tabs>
      ) : null}

      <BottomNav />
    </div>
  )
}
