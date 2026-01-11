import { Button } from "./ui/button";
import { Coins, Clock, TrendingUp, Vault } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchVaultOptions } from "@/lib/supabaseQueries";

export function CompoundingVault() {
  const { data: vaultOptions = [], isLoading } = useQuery({
    queryKey: ["vault-options"],
    queryFn: fetchVaultOptions,
  });

  if (isLoading) {
    return (
      <div className="glass-card p-6 h-full">
        <p className="text-sm text-muted-foreground">Loading vault options...</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold flex items-center gap-2">
            <Vault className="w-5 h-5 text-accent" />
            Time-Locked Vault
          </h3>
          <p className="text-sm text-muted-foreground">
            Visualize compounding with simulated APY and streak multipliers.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold">
          <Coins className="w-4 h-4" />
          4,200 GT locked
        </div>
      </div>

      <div className="space-y-3">
        {vaultOptions.map((vault) => (
          <div key={vault.term} className="p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="font-semibold text-sm">{vault.term}</span>
              </div>
              <span className="text-xs text-success">APY {vault.apy}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>Compound bonus: {vault.bonus}</span>
              <span>Unlocks: {vault.unlocks}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-gradient-to-br from-primary/10 via-transparent to-neon-cyan/10 border border-primary/30">
        <div className="flex items-center gap-2 text-primary">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-semibold">Streak Multiplier</span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          3-month top performers unlock a +15% compounding boost to illustrate long-term growth.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button variant="gold">Lock GT</Button>
        <Button variant="glass">View Vault History</Button>
      </div>
    </div>
  );
}
