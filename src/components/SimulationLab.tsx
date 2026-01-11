import { Button } from "./ui/button";
import { AlertTriangle, BarChart3, Coins, Leaf, LineChart, ShieldCheck, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchPortfolio,
  fetchPortfolioAllocations,
  fetchSimulationMetrics,
  fetchSimulationScenarios,
} from "@/lib/supabaseQueries";

const iconMap = {
  BarChart3,
  ShieldCheck,
  Leaf,
};

export function SimulationLab() {
  const { data: portfolio } = useQuery({
    queryKey: ["portfolio"],
    queryFn: fetchPortfolio,
  });
  const { data: allocations = [], isLoading: allocationsLoading } = useQuery({
    queryKey: ["portfolio-allocations", portfolio?.id],
    queryFn: () => fetchPortfolioAllocations(portfolio!.id),
    enabled: !!portfolio?.id,
  });
  const { data: scenarios = [], isLoading: scenariosLoading } = useQuery({
    queryKey: ["simulation-scenarios"],
    queryFn: fetchSimulationScenarios,
  });
  const { data: metrics = [], isLoading: metricsLoading } = useQuery({
    queryKey: ["simulation-metrics"],
    queryFn: fetchSimulationMetrics,
  });

  if (allocationsLoading || scenariosLoading || metricsLoading) {
    return (
      <div className="glass-card p-6 h-full">
        <p className="text-sm text-muted-foreground">Loading simulation data...</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h3 className="font-display text-lg font-semibold flex items-center gap-2">
            <LineChart className="w-5 h-5 text-primary" />
            Simulation Lab
          </h3>
          <p className="text-sm text-muted-foreground">
            AI-driven market scenarios teach diversification, correlation, and rebalancing.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">
          <Coins className="w-4 h-4" />
          {portfolio?.virtual_funds?.toLocaleString() ?? 0} GT virtual funds
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Portfolio Allocation</p>
          <div className="space-y-3">
            {allocations.map((allocation) => (
              <div key={allocation.id ?? allocation.label} className="p-3 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">{allocation.label}</span>
                  <span className={allocation.change?.startsWith("-") ? "text-destructive" : "text-success"}>
                    {allocation.change ?? "0%"}
                  </span>
                </div>
                <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${allocation.gradient}`}
                    style={{ width: `${allocation.percent ?? 0}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{allocation.percent ?? 0}% allocation</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Scenario Feed</p>
            <div className="space-y-3">
              {scenarios.map((scenario) => (
                <div key={scenario.id ?? scenario.title} className="p-3 rounded-lg bg-muted/30 border border-border/50">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm">{scenario.title}</p>
                    <span className="text-xs text-muted-foreground">AI generated</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Impact: {scenario.impact}</p>
                  <p className="text-xs text-muted-foreground">Lesson: {scenario.lesson}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-lg bg-gradient-to-br from-destructive/10 via-muted/20 to-background border border-destructive/30">
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-semibold">Risk Alert</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Crypto exposure exceeds recommended limits. Consider a put-option power-up at level 12.
            </p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mt-6">
        {metrics.map((metric) => {
          const Icon = iconMap[metric.icon as keyof typeof iconMap] ?? BarChart3;
          return (
          <div key={metric.id ?? metric.label} className="p-3 rounded-lg bg-muted/30 border border-border/50">
            <div className={`flex items-center gap-2 text-sm font-semibold ${metric.tone}`}>
              <Icon className="w-4 h-4" />
              {metric.label}
            </div>
            <p className="mt-2 text-lg font-display font-bold">{metric.value}</p>
          </div>
        );
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button variant="neon">
          <TrendingUp className="w-4 h-4" />
          Simulate Next Week
        </Button>
        <Button variant="glass">Rebalance Portfolio</Button>
      </div>
    </div>
  );
}
