"use client"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import { loadSchedule } from "@/lib/schedules"
import { toIsoDate } from "@/lib/dates"
import { MessengerId, RotationConfig, ScheduleDataset } from "@/types"

type StoreState = {
  user: MessengerId | null
  today: string
  weekday: ScheduleDataset | null
  saturday: ScheduleDataset | null
  rotation: RotationConfig | null
  loading: boolean
  error?: string
  init: () => Promise<void>
  setUser: (user: MessengerId) => void
  refreshToday: () => void
}

const fetchRotation = async (): Promise<RotationConfig> => {
  const response = await fetch("/config/rotation.json")
  if (!response.ok) throw new Error("No se pudo cargar la rotación")
  return (await response.json()) as RotationConfig
}

export const useScheduleStore = create<StoreState>()(
  persist(
    (set, get) => ({
      user: null,
      today: toIsoDate(),
      weekday: null,
      saturday: null,
      rotation: null,
      loading: false,
      error: undefined,
      init: async () => {
        if (get().loading) return
        if (get().weekday && get().saturday && get().rotation) return

        set({ loading: true, error: undefined })
        try {
          const [weekday, saturday, rotation] = await Promise.all([
            loadSchedule("weekday"),
            loadSchedule("saturday"),
            fetchRotation(),
          ])

          set({ weekday, saturday, rotation, loading: false })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : String(error),
            loading: false,
          })
        }
      },
      setUser: (user) => set({ user }),
      refreshToday: () => set({ today: toIsoDate() }),
    }),
    {
      name: "routes-schedule-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }),
    }
  )
)
