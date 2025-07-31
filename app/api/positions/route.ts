import { type NextRequest, NextResponse } from "next/server"

// Mock positions data
const positions = [
  {
    id: "1",
    securityId: "1",
    symbol: "AAPL",
    name: "Apple Inc.",
    quantity: 1000,
    purchasePrice: 150.0,
    currentPrice: 175.0,
    purchaseDate: "2024-01-15",
    type: "stock",
  },
  {
    id: "2",
    securityId: "2",
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    quantity: 500,
    purchasePrice: 2500.0,
    currentPrice: 2800.0,
    purchaseDate: "2024-01-15",
    type: "stock",
  },
  {
    id: "3",
    securityId: "3",
    symbol: "BTC",
    name: "Bitcoin",
    quantity: 10,
    purchasePrice: 45000.0,
    currentPrice: 43000.0,
    purchaseDate: "2024-01-15",
    type: "crypto",
  },
]

export async function GET() {
  return NextResponse.json(positions)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const newPosition = {
    id: Date.now().toString(),
    ...body,
  }
  positions.push(newPosition)
  return NextResponse.json(newPosition, { status: 201 })
}
