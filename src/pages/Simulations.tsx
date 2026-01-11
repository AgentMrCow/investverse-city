import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SimulationLab } from "@/components/SimulationLab";
import { SimulationTimeline } from "@/components/SimulationTimeline";
import { InsuranceESGPanel } from "@/components/InsuranceESGPanel";
import { CompoundingVault } from "@/components/CompoundingVault";
import { HedgingPowerups } from "@/components/HedgingPowerups";
import { CoverageGapSimulator } from "@/components/CoverageGapSimulator";
import { AIScenarioForge } from "@/components/AIScenarioForge";

const Simulations = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-24 space-y-8">
        <section className="space-y-3">
          <h1 className="font-display text-3xl md:text-4xl font-bold">Simulation Lab</h1>
          <p className="text-muted-foreground max-w-2xl">
            Practice portfolio strategy with AI-generated market events, ESG signals, and insurance
            protection layers.
          </p>
        </section>

        <section className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SimulationLab />
          </div>
          <SimulationTimeline />
        </section>

        <section className="grid lg:grid-cols-3 gap-8">
          <InsuranceESGPanel />
          <CoverageGapSimulator />
          <HedgingPowerups />
        </section>

        <section>
          <AIScenarioForge />
        </section>

        <section className="grid lg:grid-cols-2 gap-8">
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
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Simulations;
