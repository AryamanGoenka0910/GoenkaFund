import { Card } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import type React from "react"

interface MetricsCardProps {
  title: string
  value: string
  change: {
    value: string
    percentage: string
    isPositive: boolean
  }
  chart?: React.ReactNode
}

export function MetricsCard({ title, value, change, chart }: MetricsCardProps) {
  return (
    <Card className="p-6 shadow-sm border-gray-200 hover:shadow-md transition-shadow bg-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">{title}</h3>
        {chart && <div className="text-gray-400">{chart}</div>}
      </div>
      <div className="space-y-2">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              change.isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {change.isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
            <span>{change.value}</span>
          </div>
          {change.percentage && <span className="text-sm text-gray-500">{change.percentage}</span>}
        </div>s
      </div>
    </Card>
  )
}
