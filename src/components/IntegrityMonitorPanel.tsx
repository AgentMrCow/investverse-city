import { AlertTriangle, ShieldCheck, Timer } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchIntegrityEvents } from "@/lib/supabaseQueries";

const toneMap: Record<string, string> = {
  Warning: "text-warning",
  Penalty: "text-destructive",
  Info: "text-muted-foreground",
};

const iconMap: Record<string, typeof ShieldCheck> = {
  Warning: AlertTriangle,
  Penalty: AlertTriangle,
  Info: Timer,
};

export function IntegrityMonitorPanel() {
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["integrity-events"],
    queryFn: fetchIntegrityEvents,
  });

  if (isLoading) {
    return (
      <div className="glass-card p-6 h-full">
        <p className="text-sm text-muted-foreground">Loading integrity monitor...</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-success" />
            Integrity Monitor
          </h3>
          <p className="text-sm text-muted-foreground">
            Fair-play safeguards powered by AI screenshot detection and behavior checks.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {events.map((event) => {
          const tone = toneMap[event.severity] ?? "text-muted-foreground";
          const Icon = iconMap[event.severity] ?? ShieldCheck;
          return (
            <div key={event.id} className="p-3 rounded-lg bg-muted/30 border border-border/50">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${tone}`} />
                  <span className="font-semibold">{event.event_type}</span>
                </div>
                <span className={`text-xs font-semibold ${tone}`}>{event.severity}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{event.detail}</p>
              {event.action && <p className="text-xs text-muted-foreground">Action: {event.action}</p>}
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border/50">
        <div className="flex items-center gap-2 text-sm font-semibold text-primary">
          <ShieldCheck className="w-4 h-4" />
          Fair Play Rules
        </div>
        <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
          <li>Timed quizzes pause after 20s idle; repeated pauses reduce rewards.</li>
          <li>Screenshots during challenges trigger warnings and GT penalties.</li>
          <li>Question submissions are scanned for relevance and duplicates.</li>
        </ul>
      </div>
    </div>
  );
}
