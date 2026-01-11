import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TokenomicsPanel } from "@/components/TokenomicsPanel";
import { MarketplacePanel } from "@/components/MarketplacePanel";
import { CompoundingVault } from "@/components/CompoundingVault";
import { ContractStatusPanel } from "@/components/ContractStatusPanel";
import { GamePanel, GameStationCard } from "@/components/GamePanel";
import { Coins, FileText, ShieldCheck, TrendingUp } from "lucide-react";

const Economy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-24 space-y-10">
        <section className="space-y-3">
          <h1 className="font-display text-3xl md:text-4xl font-bold">Economy & Rewards</h1>
          <p className="text-muted-foreground max-w-2xl">
            GT powers the learning loop, rewards progress, and stays non-transferable to keep
            the ecosystem educational and compliant.
          </p>
        </section>

        <section className="grid lg:grid-cols-[1.35fr_1fr] gap-8 items-start">
          <div className="space-y-6">
            <div className="glass-card p-6">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Economy Hub</p>
              <h2 className="font-display text-2xl font-semibold mt-2">GT Command Ledger</h2>
              <p className="text-sm text-muted-foreground mt-3">
                Keep tokenomics visible, then open each station for deeper vault, marketplace, and
                compliance details.
              </p>
            </div>
            <TokenomicsPanel />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <GamePanel
              title="Contract Status"
              description="On-chain contract health and compliance checks."
              trigger={
                <GameStationCard
                  title="Contract Status"
                  description="Audit readiness and contract safeguards."
                  icon={ShieldCheck}
                  gradient="from-success to-emerald-400"
                />
              }
            >
              <ContractStatusPanel />
            </GamePanel>

            <GamePanel
              title="Marketplace"
              description="In-app upgrades, perks, and GT sinks."
              trigger={
                <GameStationCard
                  title="Marketplace"
                  description="Spend GT on learning boosts and perks."
                  icon={Coins}
                  gradient="from-accent to-warning"
                />
              }
            >
              <MarketplacePanel />
            </GamePanel>

            <GamePanel
              title="Compounding Vault"
              description="Reinvest GT for long-term mastery rewards."
              trigger={
                <GameStationCard
                  title="Compounding Vault"
                  description="Vault strategies and compound growth."
                  icon={TrendingUp}
                  gradient="from-primary to-neon-cyan"
                />
              }
            >
              <CompoundingVault />
            </GamePanel>

            <GamePanel
              title="Compliance Notes"
              description="How GT stays non-transferable and policy-safe."
              trigger={
                <GameStationCard
                  title="Compliance Notes"
                  description="Regulatory guardrails and safeguards."
                  icon={FileText}
                  gradient="from-neon-purple to-neon-pink"
                />
              }
            >
              <div className="glass-card p-6">
                <h3 className="font-display text-lg font-semibold">Compliance Notes</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  GT cannot be transferred to external wallets or exchanges. Smart contracts enforce
                  reward logic, token sinks, and anti-abuse penalties.
                </p>
              </div>
            </GamePanel>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Economy;
