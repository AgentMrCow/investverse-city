import { AlertTriangle, Calendar, LineChart, Zap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchSimulationTimelineEvents } from "@/lib/supabaseQueries";

export function SimulationTimeline() {
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["simulation-timeline"],
    queryFn: fetchSimulationTimelineEvents,
  });

  if (isLoading) {
    return (
      <div className="glass-card p-6 h-full">
        <p className="text-sm text-muted-foreground">Loading market timeline...</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Market Timeline
          </h3>
          <p className="text-sm text-muted-foreground">Macro events that drive the simulation.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <LineChart className="w-4 h-4" />
          AI scenario
        </div>
      </div>

      <div className="space-y-3">
        {events.map((event) => (
          <div key={event.id ?? event.title} className="p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{event.date_label}</p>
                <p className="text-sm font-semibold">{event.title}</p>
                <p className="text-xs text-muted-foreground">{event.impact}</p>
              </div>
              {event.type === "risk" ? (
                <AlertTriangle className="w-4 h-4 text-destructive" />
              ) : event.type === "esg" ? (
                <Zap className="w-4 h-4 text-accent" />
              ) : (
                <LineChart className="w-4 h-4 text-primary" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
