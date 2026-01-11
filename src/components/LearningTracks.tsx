import { BarChart3, BookOpen, Leaf, ShieldCheck, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchLearningTracks } from "@/lib/supabaseQueries";

const iconMap = {
  TrendingUp,
  ShieldCheck,
  BarChart3,
  Leaf,
  BookOpen,
};

export function LearningTracks() {
  const { data: tracks = [], isLoading } = useQuery({
    queryKey: ["learning-tracks"],
    queryFn: fetchLearningTracks,
  });

  if (isLoading) {
    return (
      <div className="glass-card p-6">
        <p className="text-sm text-muted-foreground">Loading learning tracks...</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold">Learning Tracks</h3>
          <p className="text-sm text-muted-foreground">Personalized paths that unlock as you level up.</p>
        </div>
        <span className="text-xs text-muted-foreground uppercase tracking-wider">5 tracks</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {tracks.map((track) => {
          const Icon = iconMap[track.icon as keyof typeof iconMap] ?? BookOpen;
          const gradient = track.gradient ?? "from-primary to-neon-cyan";
          return (
          <div key={track.id ?? track.title} className="p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-background" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">{track.title}</p>
                <p className="text-xs text-muted-foreground">{track.focus}</p>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span>{track.progress ?? 0}% complete</span>
                <span>Next: {track.next_step ?? "TBD"}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${gradient}`}
                  style={{ width: `${track.progress ?? 0}%` }}
                />
              </div>
            </div>
          </div>
        );
        })}
      </div>
    </div>
  );
}
