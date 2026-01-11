import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ShieldCheck, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetchRiskProfile, submitRiskProfile } from "@/lib/supabaseQueries";

const questions = [
  {
    id: "horizon",
    label: "Time horizon",
    helper: "When do you expect to use this money?",
    options: [
      { label: "Less than 1 year", score: 1 },
      { label: "1-3 years", score: 2 },
      { label: "3-7 years", score: 3 },
      { label: "7+ years", score: 4 },
    ],
  },
  {
    id: "liquidity_need",
    label: "Liquidity need",
    helper: "How quickly might you need to withdraw funds?",
    options: [
      { label: "High, I need quick access", score: 1 },
      { label: "Medium, some flexibility", score: 2 },
      { label: "Low, I can lock funds", score: 3 },
      { label: "Very low, long lockups are fine", score: 4 },
    ],
  },
  {
    id: "loss_tolerance",
    label: "Drawdown response",
    helper: "If your portfolio drops 15% in a month, what do you do?",
    options: [
      { label: "Sell immediately", score: 1 },
      { label: "Reduce exposure", score: 2 },
      { label: "Hold steady", score: 3 },
      { label: "Buy more", score: 4 },
    ],
  },
  {
    id: "experience",
    label: "Investment experience",
    helper: "How familiar are you with investing and insurance concepts?",
    options: [
      { label: "New to it", score: 1 },
      { label: "Basic understanding", score: 2 },
      { label: "Comfortable with strategies", score: 3 },
      { label: "Advanced / professional", score: 4 },
    ],
  },
];

const levelFromScore = (score: number) => {
  if (score <= 7) return "Conservative";
  if (score <= 11) return "Balanced";
  if (score <= 14) return "Growth";
  return "Aggressive";
};

const moduleFromLevel = (level: string) => {
  switch (level) {
    case "Conservative":
      return "Insurance Essentials -> Claims & Deductibles";
    case "Balanced":
      return "Investment Foundations -> Diversification";
    case "Growth":
      return "Risk & Resilience -> Hedging with Options";
    default:
      return "Simulation Lab -> Advanced Derivatives";
  }
};

const formatDate = (value?: string | null) => {
  if (!value) return "-";
  return new Date(value).toLocaleDateString();
};

export function RiskProfilePanel() {
  const queryClient = useQueryClient();
  const { data: riskProfile, isLoading } = useQuery({
    queryKey: ["risk-profile"],
    queryFn: fetchRiskProfile,
  });
  const [responses, setResponses] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!riskProfile) return;
    const next: Record<string, number> = {};
    questions.forEach((question) => {
      const savedValue = riskProfile[question.id as keyof typeof riskProfile] as string | null;
      if (!savedValue) return;
      const index = question.options.findIndex((option) => option.label === savedValue);
      if (index >= 0) {
        next[question.id] = index;
      }
    });
    if (Object.keys(next).length > 0) {
      setResponses(next);
    }
  }, [riskProfile]);

  const completed = questions.every((question) => responses[question.id] !== undefined);
  const score = useMemo(() => {
    if (!completed) return 0;
    return questions.reduce((total, question) => {
      const optionIndex = responses[question.id];
      if (optionIndex === undefined) return total;
      return total + question.options[optionIndex].score;
    }, 0);
  }, [completed, responses]);
  const riskLevel = completed ? levelFromScore(score) : "-";
  const recommendedModule = completed ? moduleFromLevel(riskLevel) : "-";
  const payload = useMemo(() => {
    if (!completed) return null;
    return {
      risk_score: score,
      risk_level: riskLevel,
      horizon: questions[0].options[responses.horizon].label,
      liquidity_need: questions[1].options[responses.liquidity_need].label,
      loss_tolerance: questions[2].options[responses.loss_tolerance].label,
      experience: questions[3].options[responses.experience].label,
      recommended_module: recommendedModule,
    };
  }, [completed, score, riskLevel, recommendedModule, responses]);

  const mutation = useMutation({
    mutationFn: () => {
      if (!payload) {
        throw new Error("Incomplete risk profile");
      }
      return submitRiskProfile(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["risk-profile"] });
    },
  });

  if (isLoading) {
    return (
      <div className="glass-card p-6">
        <p className="text-sm text-muted-foreground">Loading risk profile...</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-primary" />
            Risk Profile Checkpoint
          </h3>
          <p className="text-sm text-muted-foreground">
            Calibrate suitability before unlocking higher-risk simulations and advanced modules.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="w-4 h-4 text-success" />
          Last updated: {formatDate(riskProfile?.updated_at)}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {questions.map((question) => (
          <div key={question.id} className="p-4 rounded-lg bg-muted/30 border border-border/50">
            <p className="text-sm font-semibold">{question.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{question.helper}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {question.options.map((option, index) => {
                const selected = responses[question.id] === index;
                return (
                  <Button
                    key={option.label}
                    type="button"
                    variant="glass"
                    className={selected ? "border-primary bg-primary/10" : ""}
                    onClick={() => setResponses((prev) => ({ ...prev, [question.id]: index }))}
                  >
                    {option.label}
                  </Button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-lg border border-border/50 bg-background/60">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">Score: {score || "-"}</Badge>
          <Badge variant="outline">Risk level: {riskLevel}</Badge>
          <Badge variant="outline">Recommended module: {recommendedModule}</Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          This checkpoint prevents mismatched allocations and highlights insurance needs early.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button
          variant="neon"
          onClick={() => mutation.mutate()}
          disabled={!completed || mutation.isPending}
        >
          {mutation.isPending ? "Saving..." : "Save risk profile"}
        </Button>
        {mutation.isSuccess && <span className="text-xs text-success">Profile saved.</span>}
        {mutation.isError && <span className="text-xs text-destructive">Save failed. Try again.</span>}
      </div>
    </div>
  );
}
