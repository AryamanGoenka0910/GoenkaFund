"use client"

import { Button } from "@/components/ui/button"
import { MetricsCard } from "@/components/metrics-card"
import { PositionsTable } from "@/components/positions-table"
import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"

interface Position {
  id: string
  symbol: string
  quantity: number
  costBasis: number
  averageCostBasis: number,
  currentPrice: number,
  previousClose: number,
  totalGainLoss: number,
  totalGainLossPercent: number,
  todayGainLoss: number,
  todayGainLossPercent: number
}

export default function DashboardPage() {
  const [positions, setPositions] = useState<Position[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPositions()
  }, []) 

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
    const totalCost = positions.reduce((sum, pos) => sum + pos.quantity * pos.averageCostBasis, 0)
    const totalGainLoss = totalValue - totalCost
    const totalGainLossPercent = totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0

    return {
      totalValue,
      totalCost,
      totalGainLoss,
      totalGainLossPercent,
    }
  }

  const calculateIRR = (
      cashFlows: number[],
      dates: Date[],
      guess: number = 0.1
  ): number | null  => 
  {
    if (cashFlows.length !== dates.length) {
      throw new Error("Cash flows and dates must be the same length.");
    }

    const maxIterations = 1000;
    const tolerance = 1e-7;
    let rate = guess;

    const daysBetween = (d1: Date, d2: Date) =>
      (d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24);

    const npv = (rate: number) => {
      const t0 = dates[0];
      return cashFlows.reduce((acc, cf, i) => {
        const t = daysBetween(t0, dates[i]) / 365;
        return acc + cf / Math.pow(1 + rate, t);
      }, 0);
    };

    for (let i = 0; i < maxIterations; i++) {
      const f = npv(rate);
      const fPrime = (npv(rate + tolerance) - f) / tolerance; // numerical derivative
      const newRate = rate - f / fPrime;
      if (Math.abs(newRate - rate) < tolerance) {
        return newRate;
      }
      rate = newRate;
    }

    return null; // IRR didn't converge
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
  const cashFlows = [-250, -250, -300, -300, -500, -800, -600, -1000, -200, -1500, -1500, -3000, 11436.647];
  const dates = [
    new Date("2024-06-09"),
    new Date("2024-06-16"),
    new Date("2024-06-17"),
    new Date("2024-06-26"),
    new Date("2024-09-24"),
    new Date("2024-10-04"),
    new Date("2024-11-05"),
    new Date("2024-11-07"),
    new Date("2025-05-12"),
    new Date("2025-06-02"),
    new Date("2025-06-16"),
    new Date("2025-08-11"),
    new Date("2025-11-05"),
  ];

  const irr = (calculateIRR(cashFlows, dates) ?? 0) * 100;

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Portfolio Overview</h1>
          {/* <div className="text-sm text-muted-foreground">Welcome back, {session?.user?.name}</div> */}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            Export Report
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

        <div className="grid gap-4 md:grid-cols-4">
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
          <MetricsCard
            title="IRR"
            value={`$${irr.toFixed(2)}%`}
            change={{
              value: `${positions.length} positions`,
              percentage: "",
              isPositive: true,
            }}
          />
        </div>

        {/* <Card className="mt-6 border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceChart />
          </CardContent>
        </Card> */}

      <div className="mt-6">
        <PositionsTable positions={positions} onRefresh={fetchPositions} />
      </div>
    </div>
  )
}
