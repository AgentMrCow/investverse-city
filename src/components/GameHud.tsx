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
      <div className="game-hud-panel">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Commander Level</p>
          <Star className="w-4 h-4 text-accent" />
        </div>
        <div className="flex items-end gap-2 mt-2">
          <span className="font-display text-2xl font-bold">Lv {level}</span>
          <span className="text-xs text-muted-foreground">City XP</span>
        </div>
        <div className="hud-bar mt-3">
          <div className="hud-bar-fill" style={{ width: `${xpProgress}%` }} />
        </div>
      </div>

      <div className="game-hud-panel">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Active Mission</p>
          <Flame className="w-4 h-4 text-destructive" />
        </div>
        <p className="mt-2 text-sm font-semibold">Raise coverage to 85% this week.</p>
        <div className="hud-bar mt-3">
          <div className="hud-bar-fill hud-bar-fill--warning" style={{ width: "72%" }} />
        </div>
      </div>

      <div className="game-hud-panel">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">City Resources</p>
          <ShieldCheck className="w-4 h-4 text-success" />
        </div>
        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Streak</span>
          <span className="font-semibold">{streak} days</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">GT Balance</span>
          <span className="font-semibold flex items-center gap-1">
            <Coins className="w-4 h-4 text-accent" />
            {gtBalance.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
