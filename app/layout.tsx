import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { PWARegister } from "@/components/pwa-register"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  applicationName: "Mensajeros LACLICSA",
  title: {
    default: "Mensajeros LACLICSA",
    template: "%s | Mensajeros LACLICSA",
  },
  description:
    "Consulta tus horarios y usa tu plan de ruta sin conexión en cualquier momento.",
  manifest: "/manifest.json",
  themeColor: "#0f172a",
  formatDetection: {
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Mensajeros LACLICSA",
  },
  icons: {
    icon: "/icons/icon-maskable-192.png",
    shortcut: "/icons/icon-maskable-192.png",
    apple: "/icons/icon-maskable-192.png",
  },
}

export const viewport = {
  themeColor: "#0f172a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
      >
        <div className="min-h-dvh bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.12),_transparent)]">
          {children}
          <PWARegister />
        </div>
      </body>
    </html>
  )
}
