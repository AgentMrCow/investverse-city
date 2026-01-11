import { Shield, Sparkles, TrendingDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchHedgingPowerups } from "@/lib/supabaseQueries";

export function HedgingPowerups() {
  const { data: powerups = [], isLoading } = useQuery({
    queryKey: ["hedging-powerups"],
    queryFn: fetchHedgingPowerups,
  });

  if (isLoading) {
    return (
      <div className="glass-card p-6 h-full">
        <p className="text-sm text-muted-foreground">Loading hedging power-ups...</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Hedging Power-ups
          </h3>
          <p className="text-sm text-muted-foreground">
            Advanced tools for risk-aware learners.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="w-4 h-4" />
          Advanced tier
        </div>
      </div>

      <div className="space-y-3">
        {powerups.map((powerup) => (
          <div key={powerup.id ?? powerup.name} className="p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">{powerup.name}</p>
                <p className="text-xs text-muted-foreground">{powerup.effect}</p>
                <p className="text-xs text-muted-foreground">Unlocked at level {powerup.unlock_level}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-destructive text-xs font-semibold">
                  <TrendingDown className="w-4 h-4" />
                  {powerup.cost}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
