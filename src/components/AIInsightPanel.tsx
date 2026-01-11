import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  fetchKnowledgeGaps,
  fetchPortfolio,
  fetchPortfolioAllocations,
  fetchRiskProfile,
  fetchSimulationMetrics,
} from "@/lib/supabaseQueries";

const focusOptions = ["Balanced", "Investments", "Insurance", "ESG"] as const;

type FocusOption = (typeof focusOptions)[number];

type InsightResponse = {
  text: string;
  model?: string;
};

const AI_ENDPOINT = import.meta.env.VITE_AI_ENDPOINT || "/api/insights";

export function AIInsightPanel() {
  const [focus, setFocus] = useState<FocusOption>("Balanced");
  const [note, setNote] = useState("");
  const [insight, setInsight] = useState<InsightResponse | null>(null);

  const { data: riskProfile } = useQuery({
    queryKey: ["risk-profile"],
    queryFn: fetchRiskProfile,
  });
  const { data: gaps = [] } = useQuery({
    queryKey: ["knowledge-gaps"],
    queryFn: fetchKnowledgeGaps,
  });
  const { data: metrics = [] } = useQuery({
    queryKey: ["simulation-metrics"],
    queryFn: fetchSimulationMetrics,
  });
  const { data: portfolio } = useQuery({
    queryKey: ["portfolio"],
    queryFn: fetchPortfolio,
  });
  const { data: allocations = [] } = useQuery({
    queryKey: ["portfolio-allocations", portfolio?.id],
    queryFn: () => fetchPortfolioAllocations(portfolio!.id),
    enabled: !!portfolio?.id,
  });

  const prompt = useMemo(() => {
    const gapSummary = gaps
      .slice(0, 3)
      .map((gap) => `${gap.title} (${gap.impact ?? "Impact TBD"})`)
      .join("; ");
    const allocationSummary = allocations
      .slice(0, 4)
      .map((allocation) => `${allocation.label} ${allocation.percent ?? 0}%`)
      .join(", ");
    const metricSummary = metrics
      .slice(0, 3)
      .map((metric) => `${metric.label}: ${metric.value ?? "-"}`)
      .join("; ");

    const riskSummary = riskProfile
      ? `Risk level: ${riskProfile.risk_level}. Horizon: ${riskProfile.horizon}. Liquidity: ${riskProfile.liquidity_need}. Loss tolerance: ${riskProfile.loss_tolerance}.`
      : "Risk profile not completed yet.";

    return `Create an Investverse City coaching brief for a learner. Focus area: ${focus}.\n\nSnapshot:\n- ${riskSummary}\n- Knowledge gaps: ${gapSummary || "No gaps available"}.\n- Portfolio: ${allocationSummary || "No allocations yet"}.\n- Simulation metrics: ${metricSummary || "No metrics yet"}.\n${note.trim() ? `- Learner note: ${note.trim()}.` : ""}\n\nInstructions:\n- Output 4 bullets titled: Focus, Modules, Actions, Caution.\n- Keep under 130 words.\n- Recommend in-app actions (daily challenge, skill tree, simulation lab, coverage gap simulator).\n- Stay educational, no financial advice claims.`;
  }, [allocations, focus, gaps, metrics, note, riskProfile]);

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(AI_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload?.error || "AI request failed.");
      }

      return payload as InsightResponse;
    },
    onSuccess: (data) => {
      setInsight(data);
    },
  });

  const errorMessage = mutation.error instanceof Error ? mutation.error.message : null;

  return (
    <div className="glass-card p-6">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Learning Coach
          </h3>
          <p className="text-sm text-muted-foreground">
            Turn player data into a focused learning plan and next-step recommendations.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/30 text-xs font-semibold text-muted-foreground">
          <Bot className="w-4 h-4" />
          OpenRouter
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {focusOptions.map((option) => (
          <Button
            key={option}
            variant="glass"
            size="sm"
            className={option === focus ? "border-primary bg-primary/10" : ""}
            onClick={() => setFocus(option)}
          >
            {option}
          </Button>
        ))}
        {insight?.model && <Badge variant="outline">Model: {insight.model}</Badge>}
      </div>

      <Textarea
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="Optional: add a learner note (e.g., wants to learn about insurance deductibles)"
        className="mb-4"
        maxLength={160}
      />

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <Button
          variant="neon"
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Generating..." : "Generate coaching brief"}
        </Button>
        <span className="text-xs text-muted-foreground">
          Uses knowledge gaps, risk profile, and simulation metrics.
        </span>
      </div>

      <div className="rounded-lg border border-border/50 bg-muted/20 p-4 min-h-[140px]">
        {mutation.isPending && <p className="text-sm text-muted-foreground">Thinking through the data...</p>}
        {!mutation.isPending && insight?.text && (
          <p className="text-sm text-foreground whitespace-pre-line">{insight.text}</p>
        )}
        {!mutation.isPending && !insight?.text && (
          <p className="text-sm text-muted-foreground">
            Generate a brief to see AI-powered, data-grounded coaching.
          </p>
        )}
        {errorMessage && (
          <p className="text-sm text-destructive mt-2">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}
