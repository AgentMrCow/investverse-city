import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SimulationLab } from "@/components/SimulationLab";
import { SimulationTimeline } from "@/components/SimulationTimeline";
import { InsuranceESGPanel } from "@/components/InsuranceESGPanel";
import { CompoundingVault } from "@/components/CompoundingVault";
import { HedgingPowerups } from "@/components/HedgingPowerups";
import { CoverageGapSimulator } from "@/components/CoverageGapSimulator";
import { AIScenarioForge } from "@/components/AIScenarioForge";
import { GamePanel, GameStationCard } from "@/components/GamePanel";
import {
  Coins,
  LineChart,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

const Simulations = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-24 space-y-10">
        <section className="space-y-3">
          <h1 className="font-display text-3xl md:text-4xl font-bold">Simulation Lab</h1>
          <p className="text-muted-foreground max-w-2xl">
            Practice portfolio strategy with AI-generated market events, ESG signals, and insurance
            protection layers.
          </p>
        </section>

        <section className="grid lg:grid-cols-[1.35fr_1fr] gap-8 items-start">
          <div className="space-y-6">
            <div className="glass-card p-6">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Simulation Map</p>
              <h2 className="font-display text-2xl font-semibold mt-2">Sandbox Control</h2>
              <p className="text-sm text-muted-foreground mt-3">
                Keep the core simulation open and tap a station to surface timelines, ESG
                signals, hedging power-ups, and AI scenarios.
              </p>
            </div>
            <SimulationLab />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <GamePanel
              title="Simulation Timeline"
              description="Track scenario momentum and upcoming shocks."
              trigger={
                <GameStationCard
                  title="Simulation Timeline"
                  description="Timeline view of risk events."
                  icon={LineChart}
                  gradient="from-primary to-neon-cyan"
                />
              }
            >
              <SimulationTimeline />
            </GamePanel>

            <GamePanel
              title="Insurance + ESG"
              description="ESG signals and coverage filters in one place."
              trigger={
                <GameStationCard
                  title="Insurance + ESG"
                  description="Coverage health, ESG score, and protection math."
                  icon={ShieldCheck}
                  gradient="from-success to-emerald-400"
                />
              }
            >
              <InsuranceESGPanel />
            </GamePanel>

            <GamePanel
              title="Coverage Gap Simulator"
              description="See where portfolios are under-protected."
              trigger={
                <GameStationCard
                  title="Coverage Gap Simulator"
                  description="Stress-test coverage and identify weak points."
                  icon={Target}
                  gradient="from-accent to-warning"
                />
              }
            >
              <CoverageGapSimulator />
            </GamePanel>

            <GamePanel
              title="Hedging Power-Ups"
              description="Deploy defensive tools for volatility spikes."
              trigger={
                <GameStationCard
                  title="Hedging Power-Ups"
                  description="Activate option shields and buffers."
                  icon={TrendingUp}
                  gradient="from-neon-purple to-neon-pink"
                />
              }
            >
              <HedgingPowerups />
            </GamePanel>

            <GamePanel
              title="AI Scenario Forge"
              description="Generate AI scenarios with guided lessons."
              trigger={
                <GameStationCard
                  title="AI Scenario Forge"
                  description="Create new market events fast."
                  icon={Sparkles}
                  gradient="from-primary to-accent"
                />
              }
            >
              <AIScenarioForge />
            </GamePanel>

            <GamePanel
              title="Compounding Vault"
              description="Reinvest GT and unlock long-term growth loops."
              trigger={
                <GameStationCard
                  title="Compounding Vault"
                  description="Vault strategies and reinvestment milestones."
                  icon={Coins}
                  gradient="from-accent to-warning"
                />
              }
            >
              <div className="space-y-6">
                <CompoundingVault />
                <div className="glass-card p-6">
                  <h3 className="font-display text-lg font-semibold">Reinvestment Loop</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Use earned GT to rebalance, unlock advanced tools, and visualize long-term growth.
                    Each milestone explains a real-world investment concept.
                  </p>
                  <div className="mt-4 p-4 rounded-lg bg-muted/30 border border-border/50 text-sm text-muted-foreground">
                    Milestone unlock: retirement planning, insurance riders, and ESG impact scoring.
                  </div>
                </div>
              </div>
            </GamePanel>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Simulations;
