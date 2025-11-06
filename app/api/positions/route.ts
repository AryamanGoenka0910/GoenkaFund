import { type NextRequest, NextResponse } from "next/server"

interface Position {
  id: string
  symbol: string
  quantity: number
  costBasis: number
  averageCostBasis: number,
}

interface YahooFinanceData {
  currentPrice: number | null
  previousClose: number | null
}

// Positions data
const positions = [
  {
    id: "1",
    symbol: "MSFT",
    quantity: 0.212,
    costBasis: 99.88,
    averageCostBasis: 471.13,
  },
  {
    id: "2",
    symbol: "AAPL",
    quantity: 1.368,
    costBasis: 304.24,
    averageCostBasis: 222.40,
  },
  {
    id: "3",
    symbol: "NEE",
    quantity: 4,
    costBasis: 335.01,
    averageCostBasis: 83.75,
  },
  {
    id: "4",
    symbol: "META",
    quantity: 0.214,
    costBasis: 149.12,
    averageCostBasis: 696.82,
  },
  {
    id: "5",
    symbol: "VTWO",
    quantity: 2,
    costBasis: 192.30,
    averageCostBasis: 96.15,
  },
  {
    id: "6",
    symbol: "TWLO",
    quantity: 2,
    costBasis: 212.58,
    averageCostBasis: 106.29,
  },
  {
    id: "7",
    symbol: "VYM",
    quantity: 5,
    costBasis: 648.58,
    averageCostBasis: 129.72,
  },
  {
    id: "8",
    symbol: "VV",
    quantity: 4.67,
    costBasis: 1254.87,
    averageCostBasis: 268.71,
  },
  {
    id: "9",
    symbol: "GLNCY",
    quantity: 30,
    costBasis: 283.37,
    averageCostBasis: 9.45,
  },
  {
    id: "10",
    symbol: "TTMI",
    quantity: 3,
    costBasis: 86.41,
    averageCostBasis: 28.80,
  },
  {
    id: "11",
    symbol: "IVV",
    quantity: 10.847,
    costBasis: 6707.18,
    averageCostBasis: 618.34,
  },
]

// Helper function to fetch stock data from Yahoo Finance
async function getYahooFinanceData(ticker: string) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}`;

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    if (!response.ok) {
      throw new Error(`Yahoo Finance API error: ${response.status}`);
    }

    const data = await response.json();
    const quote = data.chart.result[0];
    const meta = quote.meta;

    return {
      currentPrice: meta.regularMarketPrice,
      previousClose: meta.previousClose,
    };
  } catch (error) {
    console.error(`Error fetching data for ${ticker}:`, error);
    return null;
  }
}

export async function GET() {
  // Fetch Yahoo Finance data for each position
  const positionsWithPrices = await Promise.all(
    positions.map(async (position) => {
      const yahooPositionData = await getYahooFinanceData(position.symbol);

      const currentPrice = yahooPositionData?.currentPrice ?? 0;
      const previousClose = yahooPositionData?.previousClose ?? 0;

      const totalValue = position.quantity * currentPrice;
      const totalGainLoss = totalValue - position.costBasis;
      const totalGainLossPercent = (totalGainLoss / position.costBasis) * 100;

      const todayValue = currentPrice * position.quantity;
      const prevCloseValue = previousClose * position.quantity;
      const todayGainLoss = todayValue - prevCloseValue;
      const todayGainLossPercent = previousClose > 0 ? (todayGainLoss / prevCloseValue) * 100 : 0;

      return {
        id: position.id,
        symbol: position.symbol,
        quantity: position.quantity,
        costBasis: position.costBasis,
        averageCostBasis: position.averageCostBasis,
        purchasePrice: position.averageCostBasis,
        currentPrice: currentPrice,
        previousClose: previousClose,
        totalGainLoss: totalGainLoss,
        totalGainLossPercent: totalGainLossPercent,
        todayGainLoss: todayGainLoss,
        todayGainLossPercent: todayGainLossPercent,
      };
    })
  );

  return NextResponse.json(positionsWithPrices);
}