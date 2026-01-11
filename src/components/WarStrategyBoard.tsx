import { Coins, Shield, Swords, Target } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchClubLoadout, fetchClubWar } from "@/lib/supabaseQueries";

export function WarStrategyBoard() {
  const { data: war } = useQuery({
    queryKey: ["club-war"],
    queryFn: fetchClubWar,
  });
  const { data: loadout = [], isLoading } = useQuery({
    queryKey: ["club-loadout", war?.club_a_id],
    queryFn: () => fetchClubLoadout(war!.club_a_id),
    enabled: !!war?.club_a_id,
  });

  if (isLoading || !war) {
    return (
      <div className="glass-card p-6 h-full">
        <p className="text-sm text-muted-foreground">Loading war strategy...</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold flex items-center gap-2">
            <Swords className="w-5 h-5 text-destructive" />
            War Strategy Board
          </h3>
          <p className="text-sm text-muted-foreground">
            Allocate GT to weapons and shields before the battle window.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Target className="w-4 h-4" />
          9PM - 11PM
        </div>
      </div>

      <div className="space-y-3">
        {loadout.map((item) => (
          <div key={item.id ?? item.item} className="p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-background/60 flex items-center justify-center">
                  {item.item.includes("Defense") ? (
                    <Shield className="w-4 h-4 text-success" />
                  ) : (
                    <Swords className="w-4 h-4 text-destructive" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold">{item.item}</p>
                  <p className="text-xs text-muted-foreground">{item.effect}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-accent text-xs font-semibold">
                <Coins className="w-4 h-4" />
                {item.cost}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
