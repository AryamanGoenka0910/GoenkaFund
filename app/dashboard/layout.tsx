"use client"

import { Button } from "@/components/ui/button"
import { LayoutDashboard, TrendingUp, Settings, LogOut, Home } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { ProtectedRoute } from "@/components/protected-route"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { signOut } = useAuth()

  const navItems = [
    { icon: Home, label: "Home", href: "/dashboard" },
    { icon: LayoutDashboard, label: "Portfolio", href: "/dashboard" },
    { icon: TrendingUp, label: "Analytics", href: "/dashboard/analytics" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ]

  return (
    <ProtectedRoute>
      <div className="h-screen bg-black text-white flex overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 h-screen border-r border-white/10 bg-white/5 p-4 flex flex-col fixed">
          <div className="mb-8">
            <h2 className="text-xl font-bold">Goenka Fund</h2>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Button
                  key={item.href}
                  variant="ghost"
                  className={`w-full justify-start gap-3 ${
                    isActive ? "bg-white/10 text-white" : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                  onClick={() => router.push(item.href)}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Button>
              )
            })}
          </nav>

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-white/60 hover:text-white hover:bg-white/5 mt-auto"
            onClick={async () => {
              await signOut()
              router.push("/")
            }}
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </Button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 overflow-y-auto">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  )
}
