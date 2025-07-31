"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, TrendingDown, TrendingUp } from "lucide-react"

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

interface PositionsTableProps {
  positions: Position[]
  onRefresh: () => void
}

export function PositionsTable({ positions, onRefresh }: PositionsTableProps) {
  const calculateGainLoss = (position: Position) => {
    const totalValue = position.quantity * position.currentPrice
    const totalCost = position.quantity * position.purchasePrice
    const gainLoss = totalValue - totalCost
    const gainLossPercent = (gainLoss / totalCost) * 100
    return { gainLoss, gainLossPercent }
  }

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
              <TableHead className="text-gray-700 font-medium">Type</TableHead>
              <TableHead className="text-gray-700 font-medium">Quantity</TableHead>
              <TableHead className="text-gray-700 font-medium">Purchase Price</TableHead>
              <TableHead className="text-gray-700 font-medium">Current Price</TableHead>
              <TableHead className="text-gray-700 font-medium">Market Value</TableHead>
              <TableHead className="text-gray-700 font-medium">P&L</TableHead>
              <TableHead className="text-gray-700 font-medium">P&L %</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {positions.map((position) => {
              const { gainLoss, gainLossPercent } = calculateGainLoss(position)
              const marketValue = position.quantity * position.currentPrice
              const isPositive = gainLoss >= 0

              return (
                <TableRow key={position.id} className="border-gray-100 hover:bg-gray-50">
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-semibold text-gray-900">{position.symbol}</div>
                      <div className="text-sm text-gray-500">{position.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={position.type === "stock" ? "default" : "secondary"}
                      className={position.type === "stock" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}
                    >
                      {position.type.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-900 font-medium">{position.quantity.toLocaleString()}</TableCell>
                  <TableCell className="text-gray-900">${position.purchasePrice.toFixed(2)}</TableCell>
                  <TableCell className="text-gray-900 font-medium">${position.currentPrice.toFixed(2)}</TableCell>
                  <TableCell className="text-gray-900 font-semibold">${marketValue.toLocaleString()}</TableCell>
                  <TableCell className={isPositive ? "text-green-600" : "text-red-600"}>
                    <div className="flex items-center gap-1 font-medium">
                      {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}$
                      {Math.abs(gainLoss).toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell className={`font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
                    {gainLossPercent.toFixed(2)}%
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
