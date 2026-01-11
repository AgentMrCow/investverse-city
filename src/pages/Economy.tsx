import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TokenomicsPanel } from "@/components/TokenomicsPanel";
import { MarketplacePanel } from "@/components/MarketplacePanel";
import { CompoundingVault } from "@/components/CompoundingVault";
import { ContractStatusPanel } from "@/components/ContractStatusPanel";

const Economy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-24 space-y-8">
        <section className="space-y-3">
          <h1 className="font-display text-3xl md:text-4xl font-bold">Economy & Rewards</h1>
          <p className="text-muted-foreground max-w-2xl">
            GT powers the learning loop, rewards progress, and stays non-transferable to keep
            the ecosystem educational and compliant.
          </p>
        </section>

        <section>
          <TokenomicsPanel />
        </section>

        <section>
          <ContractStatusPanel />
        </section>

        <section className="grid lg:grid-cols-2 gap-8">
          <MarketplacePanel />
          <CompoundingVault />
        </section>

        <section className="glass-card p-6">
          <h3 className="font-display text-lg font-semibold">Compliance Notes</h3>
          <p className="text-sm text-muted-foreground mt-2">
            GT cannot be transferred to external wallets or exchanges. Smart contracts enforce
            reward logic, token sinks, and anti-abuse penalties.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Economy;
