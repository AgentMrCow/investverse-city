import { AlertTriangle, Lightbulb, Target } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchKnowledgeGaps } from "@/lib/supabaseQueries";
import { Badge } from "@/components/ui/badge";

interface KnowledgeGap {
  id: string;
  title: string;
  summary: string;
  category?: string | null;
  impact?: string | null;
  confidence?: number | null;
  evidence?: unknown;
  recommended_action?: string | null;
  recommended_module?: string | null;
}

const impactClass = (impact?: string | null) => {
  switch (impact?.toLowerCase()) {
    case "high":
      return "border-destructive/30 bg-destructive/10 text-destructive";
    case "medium":
      return "border-warning/30 bg-warning/10 text-warning";
    case "low":
      return "border-success/30 bg-success/10 text-success";
    default:
      return "border-border/50 bg-muted/30 text-muted-foreground";
  }
};

const extractEvidence = (evidence: unknown) => {
  if (!Array.isArray(evidence)) return [];
  return evidence.filter((item): item is string => typeof item === "string");
};

export function KnowledgeGapPanel() {
  const { data: gaps = [], isLoading } = useQuery({
    queryKey: ["knowledge-gaps"],
    queryFn: fetchKnowledgeGaps,
  });

  if (isLoading) {
    return (
      <div className="glass-card p-6">
        <p className="text-sm text-muted-foreground">Loading knowledge gaps...</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Knowledge Gap Radar
          </h3>
          <p className="text-sm text-muted-foreground">
            Live misconceptions surfaced from quizzes, simulations, and city activity.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/30 text-xs font-semibold text-muted-foreground">
          <AlertTriangle className="w-4 h-4" />
          Priority alerts
        </div>
      </div>

      <div className="space-y-4">
        {gaps.map((gap: KnowledgeGap) => {
          const evidence = extractEvidence(gap.evidence);
          return (
            <div key={gap.id} className="p-4 rounded-lg bg-muted/20 border border-border/50">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">{gap.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 max-w-xl">{gap.summary}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {gap.category && (
                    <Badge variant="secondary" className="uppercase tracking-wide">
                      {gap.category}
                    </Badge>
                  )}
                  {gap.impact && (
                    <Badge variant="outline" className={impactClass(gap.impact)}>
                      Impact: {gap.impact}
                    </Badge>
                  )}
                  {typeof gap.confidence === "number" && (
                    <Badge variant="outline">{gap.confidence}% confidence</Badge>
                  )}
                </div>
              </div>

              {evidence.length > 0 && (
                <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                  {evidence.map((item, index) => (
                    <li key={`${gap.id}-${index}`} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {(gap.recommended_action || gap.recommended_module) && (
                <div className="mt-4 p-3 rounded-lg border border-border/50 bg-background/60 text-xs">
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <Lightbulb className="w-4 h-4" />
                    Recommended response
                  </div>
                  {gap.recommended_action && (
                    <p className="text-muted-foreground mt-2">{gap.recommended_action}</p>
                  )}
                  {gap.recommended_module && (
                    <p className="text-muted-foreground mt-1">Module: {gap.recommended_module}</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
