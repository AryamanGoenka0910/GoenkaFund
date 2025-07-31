"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MetricsCard } from "@/components/metrics-card"
import { PositionsTable } from "@/components/positions-table"
import { AddSecurityDialog } from "@/components/add-security-dialog"
import { ProtectedRoute } from "@/components/protected-route"
import { PerformanceChart } from "@/components/performance-chart"
import { BarChart3, ChevronDown, Home, LayoutDashboard, LogOut, Settings, TrendingUp, Wallet } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"

interface Position {
  id: string
  symbol: string
  name: string
  quantity: number
  purchasePrice: number
  currentPrice: number
  purchaseDate: string
  type: string
}

export default function DashboardPage() {
  const router = useRouter()
  const { signOut, user } = useAuth()
  const [positions, setPositions] = useState<Position[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPositions()
  }, []) // Run only on first load (component mount)
//     if (status === "authenticated") {
//       fetchPositions()
//     }
//   }, [status])

  const fetchPositions = async () => {
    try {
      const response = await fetch("/api/positions")
      const data = await response.json()
      setPositions(data)
    } catch (error) {
      console.error("Error fetching positions:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const calculateMetrics = () => {
    const totalValue = positions.reduce((sum, pos) => sum + pos.quantity * pos.currentPrice, 0)
    const totalCost = positions.reduce((sum, pos) => sum + pos.quantity * pos.purchasePrice, 0)
    const totalGainLoss = totalValue - totalCost
    const totalGainLossPercent = totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0

    return {
      totalValue,
      totalCost,
      totalGainLoss,
      totalGainLossPercent,
    }
  }



//   if (status === "unauthenticated") {
//     return null // Will redirect via onUnauthenticated
//   }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p>Loading portfolio data...</p>
        </div>
      </div>
    )
  }

  const metrics = calculateMetrics()

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white">
        <main className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">Portfolio Overview</h1>
              {/* <div className="text-sm text-muted-foreground">Welcome back, {session?.user?.name}</div> */}
            </div>
            <div className="flex gap-2">
              <AddSecurityDialog onSecurityAdded={fetchPositions} />
              <Button variant="outline" className="gap-2 bg-transparent">
                Export Report
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                className="gap-2 bg-transparent"
                onClick={async () => {
                  await signOut()
                  router.push("/")
                }}
              >
                Sign Out
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <MetricsCard
              title="Total Portfolio Value"
              value={`$${metrics.totalValue.toLocaleString()}`}
              change={{
                value: `$${Math.abs(metrics.totalGainLoss).toLocaleString()}`,
                percentage: `${metrics.totalGainLossPercent.toFixed(2)}%`,
                isPositive: metrics.totalGainLoss >= 0,
              }}
            />
            <MetricsCard
              title="Total Cost Basis"
              value={`$${metrics.totalCost.toLocaleString()}`}
              change={{
                value: `${positions.length} positions`,
                percentage: "",
                isPositive: true,
              }}
            />
            <MetricsCard
              title="Unrealized P&L"
              value={`$${metrics.totalGainLoss.toLocaleString()}`}
              change={{
                value: `${metrics.totalGainLossPercent.toFixed(2)}%`,
                percentage: "",
                isPositive: metrics.totalGainLoss >= 0,
              }}
            />
          </div>

          <Card className="mt-6 border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <PerformanceChart />
            </CardContent>
          </Card>

          <div className="mt-6">
            <PositionsTable positions={positions} onRefresh={fetchPositions} />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
