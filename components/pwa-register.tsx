"use client"

import { useEffect } from "react"

export function PWARegister() {
  useEffect(() => {
    const shouldRegister =
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      process.env.NODE_ENV === "production"

    if (!shouldRegister) return

    import("next-pwa/register")
  }, [])

  return null
}
