import { Trophy, Medal, Award, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { DEMO_PROFILE_ID, fetchLeaderboardEntries, fetchProfile } from "@/lib/supabaseQueries";

interface Player {
  rank: number;
  name: string;
  avatar: string;
  tokens: number;
  level: number;
  change: "up" | "down" | "same";
}

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1: return <Trophy className="w-5 h-5 text-accent" />;
    case 2: return <Medal className="w-5 h-5 text-muted-foreground" />;
    case 3: return <Award className="w-5 h-5 text-warning" />;
    default: return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
  }
};

const getRankStyle = (rank: number) => {
  switch (rank) {
    case 1: return "bg-gradient-to-r from-accent/20 to-warning/20 border-accent/30";
    case 2: return "bg-muted/30 border-muted-foreground/20";
    case 3: return "bg-warning/10 border-warning/20";
    default: return "bg-muted/20 border-border/50";
  }
};

export function Leaderboard() {
  const { data: entries = [], isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: fetchLeaderboardEntries,
  });
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  if (isLoading) {
    return (
      <div className="glass-card p-6">
        <p className="text-sm text-muted-foreground">Loading leaderboard...</p>
      </div>
    );
  }

  const topPlayers: Player[] = entries
    .filter((entry) => entry.rank && entry.rank <= 5)
    .map((entry) => ({
      rank: entry.rank,
      name: entry.display_name ?? "Player",
      avatar: entry.avatar ?? "⭐",
      tokens: entry.tokens ?? 0,
      level: entry.level ?? 1,
      change: entry.change ?? "same",
    }));

  const myEntry = entries.find((entry) => entry.profile_id === DEMO_PROFILE_ID);

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold">Monthly Leaderboard</h3>
          <p className="text-sm text-muted-foreground">Top performers this month</p>
        </div>
        <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
          12 days left
        </div>
      </div>

      <div className="space-y-3">
        {topPlayers.map((player, index) => (
          <div
            key={player.rank}
            className={`flex items-center gap-4 p-3 rounded-xl border transition-all hover:scale-[1.02] cursor-pointer animate-slide-up ${getRankStyle(player.rank)}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="w-8 flex justify-center">
              {getRankIcon(player.rank)}
            </div>
            
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xl">
              {player.avatar}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{player.name}</p>
              <p className="text-xs text-muted-foreground">Level {player.level}</p>
            </div>
            
            <div className="text-right">
              <p className="font-display font-bold text-gradient-gold">{player.tokens.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">GT</p>
            </div>
            
            <div className="w-6">
              {player.change === "up" && <TrendingUp className="w-4 h-4 text-success" />}
              {player.change === "down" && <TrendingUp className="w-4 h-4 text-destructive rotate-180" />}
            </div>
          </div>
        ))}
      </div>

      {/* Your Position */}
      <div className="mt-6 pt-4 border-t border-border/50">
        <div className="flex items-center gap-4 p-3 rounded-xl bg-primary/10 border border-primary/30">
          <div className="w-8 flex justify-center">
            <span className="text-sm font-bold text-primary">#{myEntry?.rank ?? profile?.global_rank ?? "-"}</span>
          </div>
          
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-neon-cyan flex items-center justify-center text-primary-foreground font-bold">
            {profile?.avatar ?? "Y"}
          </div>
          
          <div className="flex-1">
            <p className="font-semibold">{profile?.display_name ?? "You"}</p>
            <p className="text-xs text-muted-foreground">Level {profile?.level ?? 1}</p>
          </div>
          
          <div className="text-right">
            <p className="font-display font-bold text-primary">{profile?.gt_balance?.toLocaleString() ?? 0}</p>
            <p className="text-xs text-muted-foreground">GT</p>
          </div>
          
          <TrendingUp className="w-4 h-4 text-success" />
        </div>
      </div>
    </div>
  );
}
