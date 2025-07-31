"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const performanceData = [
  { month: "Jan", value: 2450000, benchmark: 2400000 },
  { month: "Feb", value: 2520000, benchmark: 2420000 },
  { month: "Mar", value: 2480000, benchmark: 2440000 },
  { month: "Apr", value: 2650000, benchmark: 2480000 },
  { month: "May", value: 2580000, benchmark: 2500000 },
  { month: "Jun", value: 2720000, benchmark: 2520000 },
  { month: "Jul", value: 2850000, benchmark: 2580000 },
  { month: "Aug", value: 2780000, benchmark: 2600000 },
  { month: "Sep", value: 2920000, benchmark: 2650000 },
  { month: "Oct", value: 3050000, benchmark: 2700000 },
  { month: "Nov", value: 3180000, benchmark: 2750000 },
  { month: "Dec", value: 3250000, benchmark: 2800000 },
]

export function PerformanceChart() {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={performanceData}>
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 12 }} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6B7280", fontSize: 12 }}
            tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
                    <div className="text-sm font-medium text-gray-900 mb-2">{label}</div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                        <span className="text-sm text-gray-600">Portfolio: </span>
                        <span className="text-sm font-medium text-gray-900">
                          ${(payload[0].value as number).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                        <span className="text-sm text-gray-600">Benchmark: </span>
                        <span className="text-sm font-medium text-gray-900">
                          ${(payload[1].value as number).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Line type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={3} dot={false} name="Portfolio" />
          <Line
            type="monotone"
            dataKey="benchmark"
            stroke="#9CA3AF"
            strokeWidth={2}
            dot={false}
            strokeDasharray="5 5"
            name="Benchmark"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
