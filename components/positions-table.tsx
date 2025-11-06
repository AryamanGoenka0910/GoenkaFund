"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, TrendingDown, TrendingUp } from "lucide-react"

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

interface PositionsTableProps {
  positions: Position[]
  onRefresh: () => void // fix this
}

export function PositionsTable({ positions, onRefresh }: PositionsTableProps) {
  
  return (
    <Card className="shadow-sm border-gray-200 bg-white">
      <CardHeader className="border-b border-gray-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-gray-900">Portfolio Positions</CardTitle>
          <Button variant="outline" size="sm" onClick={onRefresh} className="text-gray-600 bg-transparent">
            Refresh Prices
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-100">
              <TableHead className="text-gray-700 font-medium">Security</TableHead>
              <TableHead className="text-gray-700 font-medium">Quantity</TableHead>
              
              <TableHead className="text-gray-700 font-medium">Average Cost Basis</TableHead>
              <TableHead className="text-gray-700 font-medium">Market Value</TableHead>
              <TableHead className="text-gray-700 font-medium">Cost Basis</TableHead>
              <TableHead className="text-gray-700 font-medium">Current Price</TableHead>  

              <TableHead className="text-gray-700 font-medium">Total P&L</TableHead>
              <TableHead className="text-gray-700 font-medium">Total P&L %</TableHead>
              <TableHead className="text-gray-700 font-medium">Today P&L</TableHead>
              <TableHead className="text-gray-700 font-medium">Today P&L %</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {positions.map((position) => {
              const marketValue = position.quantity * position.currentPrice
              const isTotalPositive = position.totalGainLoss >= 0
              const isTodayPositive = position.todayGainLoss >= 0
              
              return (
                <TableRow key={position.id} className="border-gray-100 hover:bg-gray-50">
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-semibold text-gray-900">{position.symbol}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-900 font-medium">{position.quantity.toLocaleString()}</TableCell>
                  
                  <TableCell className="text-gray-900">${position.costBasis}</TableCell>
                  <TableCell className="text-gray-900">${marketValue.toLocaleString()}</TableCell>
                  <TableCell className="text-gray-900">${position.averageCostBasis}</TableCell>
                  <TableCell className="text-gray-900 font-semibold">${position.currentPrice.toFixed(2)}</TableCell>
                  
                  <TableCell className={isTotalPositive ? "text-green-600" : "text-red-600"}>
                    <div className="flex items-center gap-1 font-medium">
                      {isTotalPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}$
                      {Math.abs(position.totalGainLoss).toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell className={`font-medium ${isTotalPositive ? "text-green-600" : "text-red-600"}`}>
                    {position.totalGainLossPercent.toFixed(2)}%
                  </TableCell>
                  <TableCell className={isTodayPositive ? "text-green-600" : "text-red-600"}>
                    <div className="flex items-center gap-1 font-medium">
                      {isTodayPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}$
                      {Math.abs(position.todayGainLoss).toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell className={`font-medium ${isTodayPositive ? "text-green-600" : "text-red-600"}`}>
                    {position.todayGainLossPercent.toFixed(2)}%
                  </TableCell>

                  <TableCell>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
