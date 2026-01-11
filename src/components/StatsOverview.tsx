import { TrendingUp, Target, Award, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "@/lib/supabaseQueries";

export function StatsOverview() {
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  if (isLoading || !profile) {
    return (
      <div className="glass-card p-4">
        <p className="text-sm text-muted-foreground">Loading stats...</p>
      </div>
    );
  }

  const stats = [
    {
      icon: TrendingUp,
      label: "Total Earned",
      value: profile.total_earned?.toLocaleString() ?? "0",
      suffix: "GT",
      change: "+15%",
      positive: true,
      color: "from-primary to-neon-cyan",
    },
    {
      icon: Target,
      label: "Quizzes Completed",
      value: profile.quizzes_completed?.toLocaleString() ?? "0",
      suffix: "",
      change: "+8",
      positive: true,
      color: "from-accent to-warning",
    },
    {
      icon: Award,
      label: "Global Rank",
      value: `#${profile.global_rank ?? "-"}`,
      suffix: "",
      change: "↑12",
      positive: true,
      color: "from-neon-purple to-neon-pink",
    },
    {
      icon: Calendar,
      label: "Current Streak",
      value: profile.streak_days?.toLocaleString() ?? "0",
      suffix: "days",
      change: "Best: 14",
      positive: true,
      color: "from-success to-emerald-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="glass-card p-5 animate-slide-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
              <stat.icon className="w-5 h-5 text-background" />
            </div>
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full border ${
                stat.positive ? "text-success border-success/30 bg-success/10" : "text-destructive border-destructive/30 bg-destructive/10"
              }`}
            >
              {stat.change}
            </span>
          </div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{stat.label}</p>
          <p className="font-display text-2xl font-bold">
            {stat.value}
            {stat.suffix && <span className="text-sm text-muted-foreground ml-1">{stat.suffix}</span>}
          </p>
        </div>
      ))}
    </div>
  );
}
