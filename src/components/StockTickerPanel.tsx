import { useEffect, useState } from "react";
import { LineChart } from "lucide-react";

import { cn } from "@/lib/utils";

interface Quote {
  symbol: string;
  price: number;
  change: number;
}

const symbols = ["AAPL", "MSFT", "TSLA", "SPY"];

export function StockTickerPanel() {
  const [quotes, setQuotes] = useState<Quote[]>([
    { symbol: "AAPL", price: 178.2, change: 0.8 },
    { symbol: "MSFT", price: 334.1, change: -0.4 },
    { symbol: "TSLA", price: 262.4, change: 1.3 },
    { symbol: "SPY", price: 451.8, change: 0.2 },
  ]);

  useEffect(() => {
    const loadQuotes = async () => {
      try {
        const res = await fetch(
          `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols.join(",")}`,
        );
        const data = await res.json();
        const parsed: Quote[] =
          data?.quoteResponse?.result?.map((q: { symbol: string; regularMarketPrice: number; regularMarketChangePercent: number }) => ({
            symbol: q.symbol,
            price: q.regularMarketPrice,
            change: q.regularMarketChangePercent,
          })) ?? [];
        if (parsed.length) setQuotes(parsed);
      } catch (e) {
        // keep fallback data
      }
    };
    loadQuotes();
  }, []);

  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Live Market</p>
          <h3 className="font-display text-lg font-semibold">Stock Terminal</h3>
        </div>
        <LineChart className="w-5 h-5 text-primary" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {quotes.map((q) => (
          <div key={q.symbol} className="rounded-lg border border-border/60 bg-muted/40 p-3">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>{q.symbol}</span>
              <span className={cn(q.change >= 0 ? "text-success" : "text-destructive")}>
                {q.change >= 0 ? "+" : ""}
                {q.change?.toFixed(2)}%
              </span>
            </div>
            <p className="text-xl font-display font-bold mt-1">{q.price?.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">Sim data ties to sims + vaults</p>
          </div>
        ))}
      </div>
    </div>
  );
}
