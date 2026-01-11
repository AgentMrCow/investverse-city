import { AlertTriangle, HeartPulse, Leaf, Shield, ShieldCheck } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchEsgScore, fetchInsuranceCoverages } from "@/lib/supabaseQueries";

const coverageIconMap = {
  Property: ShieldCheck,
  Health: HeartPulse,
  Disaster: Shield,
};

export function InsuranceESGPanel() {
  const { data: esgScore, isLoading: esgLoading } = useQuery({
    queryKey: ["esg-score"],
    queryFn: fetchEsgScore,
  });
  const { data: coverages = [], isLoading: coveragesLoading } = useQuery({
    queryKey: ["insurance-coverages"],
    queryFn: fetchInsuranceCoverages,
  });

  if (esgLoading || coveragesLoading) {
    return (
      <div className="glass-card p-6 h-full">
        <p className="text-sm text-muted-foreground">Loading insurance shield...</p>
      </div>
    );
  }

  const esgSignals = [
    { label: "ESG Score", value: esgScore?.score?.toString() ?? "-", tone: "text-success" },
    { label: "Volatility Shield", value: esgScore?.volatility_shield ?? "-", tone: "text-primary" },
    { label: "Green Dividend", value: esgScore?.green_dividend ?? "-", tone: "text-accent" },
  ];

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold flex items-center gap-2">
            <Leaf className="w-5 h-5 text-success" />
            ESG + Insurance Shield
          </h3>
          <p className="text-sm text-muted-foreground">
            Insurance protects buildings from shocks; ESG boosts resilience and rewards.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mb-6">
        {esgSignals.map((signal) => (
          <div key={signal.label} className="p-3 rounded-lg bg-muted/30 border border-border/50">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">{signal.label}</p>
            <p className={`mt-2 text-lg font-display font-bold ${signal.tone}`}>{signal.value}</p>
          </div>
        ))}
      </div>

      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Coverage Status</p>
        <div className="space-y-3">
          {coverages.map((coverage) => {
            const Icon = coverageIconMap[coverage.label as keyof typeof coverageIconMap] ?? ShieldCheck;
            const statusTone =
              coverage.status === "Active"
                ? "text-success"
                : coverage.status === "Partial"
                  ? "text-warning"
                  : "text-muted-foreground";
            return (
            <div key={coverage.label} className="p-3 rounded-lg bg-muted/30 border border-border/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-background/60 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{coverage.label}</p>
                  <p className="text-xs text-muted-foreground">{coverage.detail}</p>
                </div>
              </div>
              <span className={`text-xs font-semibold ${statusTone}`}>{coverage.status}</span>
            </div>
          );
          })}
        </div>
      </div>

      <div className="mt-6 p-4 rounded-lg bg-destructive/10 border border-destructive/30">
        <div className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="w-4 h-4" />
          <span className="text-sm font-semibold">Disaster Event</span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Low-ESG assets trigger a simulated storm. Insurance reduces building losses by 60%.
        </p>
      </div>
    </div>
  );
}
