import { Coins, Crown, Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchRewardTiers } from "@/lib/supabaseQueries";

export function RewardsBreakdown() {
  const { data: tiers = [], isLoading } = useQuery({
    queryKey: ["reward-tiers"],
    queryFn: fetchRewardTiers,
  });

  if (isLoading) {
    return (
      <div className="glass-card p-6">
        <p className="text-sm text-muted-foreground">Loading reward tiers...</p>
      </div>
    );
  }

  const monthlyRewards = tiers.filter((tier) => tier.event === "monthly");
  const dailyRewards = tiers.filter((tier) => tier.event === "daily");

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold flex items-center gap-2">
            <Coins className="w-5 h-5 text-accent" />
            Reward Tiers
          </h3>
          <p className="text-sm text-muted-foreground">Transparent GT distribution for competitions.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Sparkles className="w-4 h-4" />
          Learn-to-earn
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-primary mb-3">
            <Crown className="w-4 h-4" />
            Monthly Competition
          </div>
          <div className="space-y-2">
            {monthlyRewards.map((tier) => (
              <div key={tier.id ?? tier.rank_label} className="flex items-center justify-between p-2 rounded-lg bg-muted/30 border border-border/50 text-xs">
                <span className="font-semibold">{tier.rank_label}</span>
                <span className="text-accent">{tier.reward}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-success mb-3">
            <Sparkles className="w-4 h-4" />
            Daily Challenge
          </div>
          <div className="space-y-2">
            {dailyRewards.map((tier) => (
              <div key={tier.id ?? tier.rank_label} className="flex items-center justify-between p-2 rounded-lg bg-muted/30 border border-border/50 text-xs">
                <span className="font-semibold">{tier.rank_label}</span>
                <span className="text-success">{tier.reward}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
