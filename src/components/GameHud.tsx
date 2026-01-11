import { Coins, Flame, ShieldCheck, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { fetchProfile } from "@/lib/supabaseQueries";

export function GameHud() {
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  const level = profile?.level ?? 1;
  const streak = profile?.streak_days ?? 0;
  const gtBalance = profile?.gt_balance ?? 0;
  const quizzes = profile?.quizzes_completed ?? 0;
  const xpProgress = Math.min(100, quizzes * 4);

  return (
    <div className="game-hud">
      <div className="hud-chip">
        <Star className="w-3.5 h-3.5 text-accent" />
        <span className="text-xs font-semibold">Lv {level}</span>
      </div>
      <div className="hud-chip hud-chip-bar">
        <Flame className="w-3.5 h-3.5 text-destructive" />
        <div className="flex-1">
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="hud-bar-fill hud-bar-fill--warning" style={{ width: "72%" }} />
          </div>
        </div>
      </div>
      <div className="hud-chip">
        <ShieldCheck className="w-3.5 h-3.5 text-success" />
        <span className="text-xs font-semibold">{streak}d</span>
      </div>
      <div className="hud-chip">
        <Coins className="w-3.5 h-3.5 text-accent" />
        <span className="text-xs font-semibold">{gtBalance.toLocaleString()} GT</span>
      </div>
    </div>
  );
}
