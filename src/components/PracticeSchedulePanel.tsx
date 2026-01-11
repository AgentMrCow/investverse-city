import { Clock, Coins, Target } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchPracticeSessions } from "@/lib/supabaseQueries";

export function PracticeSchedulePanel() {
  const { data: schedule = [], isLoading } = useQuery({
    queryKey: ["practice-sessions"],
    queryFn: fetchPracticeSessions,
  });

  if (isLoading) {
    return (
      <div className="glass-card p-6">
        <p className="text-sm text-muted-foreground">Loading practice schedule...</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Daily Practice Loop
          </h3>
          <p className="text-sm text-muted-foreground">Short sessions that reinforce core concepts.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Target className="w-4 h-4" />
          {schedule.length} sessions
        </div>
      </div>

      <div className="space-y-3">
        {schedule.map((item) => (
          <div key={item.title} className="p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{item.time_label}</p>
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.detail}</p>
              </div>
              <div className="flex items-center gap-2 text-accent text-xs font-semibold">
                <Coins className="w-4 h-4" />
                {item.reward ?? ""}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
