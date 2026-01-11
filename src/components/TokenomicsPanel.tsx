import { Coins, Lock, ShoppingBag, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchTokenRules } from "@/lib/supabaseQueries";

export function TokenomicsPanel() {
  const { data: rules = [], isLoading } = useQuery({
    queryKey: ["token-rules"],
    queryFn: fetchTokenRules,
  });

  if (isLoading) {
    return (
      <div className="glass-card p-6 h-full">
        <p className="text-sm text-muted-foreground">Loading tokenomics...</p>
      </div>
    );
  }

  const earnStreams = rules
    .filter((rule) => rule.rule_type === "earn")
    .map((rule) => `${rule.label}: ${rule.detail}`);

  const spendStreams = rules
    .filter((rule) => rule.rule_type === "spend")
    .map((rule) => `${rule.label}: ${rule.detail}`);

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold flex items-center gap-2">
            <Coins className="w-5 h-5 text-accent" />
            GT Token Economy
          </h3>
          <p className="text-sm text-muted-foreground">
            Non-transferable in-app rewards that power learning, building, and competition.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
          <Lock className="w-4 h-4" />
          In-app only
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-success mb-3">
            <TrendingUp className="w-4 h-4" />
            Earn GT
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {earnStreams.map((item) => (
              <li key={item} className="p-2 rounded-lg bg-muted/30 border border-border/50">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-primary mb-3">
            <ShoppingBag className="w-4 h-4" />
            Spend GT
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {spendStreams.map((item) => (
              <li key={item} className="p-2 rounded-lg bg-muted/30 border border-border/50">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/30">
        <p className="text-xs text-muted-foreground">
          Top-up reference: 10 HKD = 50 GT. Smart contracts on Layer 2 enforce non-transferability
          and automate rewards based on rankings.
        </p>
      </div>
    </div>
  );
}
