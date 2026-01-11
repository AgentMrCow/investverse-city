import { Calendar, Clock, Flag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchCompetitionEvents } from "@/lib/supabaseQueries";

const iconMap = {
  Daily: Clock,
  Weekly: Flag,
  Monthly: Calendar,
};

export function CompetitionCalendar() {
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["competition-events"],
    queryFn: fetchCompetitionEvents,
  });

  if (isLoading) {
    return (
      <div className="glass-card p-6">
        <p className="text-sm text-muted-foreground">Loading competition calendar...</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold">Competition Calendar</h3>
          <p className="text-sm text-muted-foreground">Recurring events that keep learners engaged.</p>
        </div>
      </div>

      <div className="space-y-3">
        {events.map((event) => {
          const Icon = iconMap[event.cadence as keyof typeof iconMap] ?? Calendar;
          return (
          <div key={event.id ?? event.title} className="p-4 rounded-lg bg-muted/30 border border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-background/60 flex items-center justify-center">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">{event.title}</p>
                <p className="text-xs text-muted-foreground">{event.detail}</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-accent">{event.cadence}</span>
          </div>
        );
        })}
      </div>
    </div>
  );
}
