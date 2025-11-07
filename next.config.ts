import type { NextConfig } from "next"
import withPWA from "next-pwa"

const runtimeCaching = [
  {
    urlPattern: ({ request }: { request: { mode?: string } }) =>
      request.mode === "navigate",
    handler: "NetworkFirst",
    options: {
      cacheName: "pages",
      networkTimeoutSeconds: 3,
      precacheFallback: { fallbackURL: "/" },
    },
  },
  {
    urlPattern: ({ sameOrigin }: { sameOrigin: boolean }) => sameOrigin,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "same-origin",
      expiration: {
        maxEntries: 80,
        maxAgeSeconds: 60 * 60 * 24,
      },
    },
  },
]

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
}

const additionalManifestEntries = [
  { url: "/", revision: "1" },
  { url: "/admin", revision: "1" },
  { url: "/perfil", revision: "1" },
  { url: "/semana", revision: "1" },
  { url: "/schedules/weekday.json", revision: "1" },
  { url: "/schedules/saturday.json", revision: "1" },
  { url: "/config/rotation.json", revision: "1" },
]

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: false,
  runtimeCaching,
  additionalManifestEntries,
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/, /^_rsc/],
})(nextConfig)
