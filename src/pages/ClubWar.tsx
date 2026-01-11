import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ClubWarPreview } from "@/components/ClubWarPreview";
import { WarStrategyBoard } from "@/components/WarStrategyBoard";
import { GovernancePanel } from "@/components/GovernancePanel";
import { TokenomicsPanel } from "@/components/TokenomicsPanel";
import { ClubWarBattleLane } from "@/components/ClubWarBattleLane";
import { GamePanel, GameStationCard } from "@/components/GamePanel";
import { Coins, Swords, Users } from "lucide-react";

const ClubWar = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-24 space-y-10">
        <section className="space-y-3">
          <h1 className="font-display text-3xl md:text-4xl font-bold">Club War Arena</h1>
          <p className="text-muted-foreground max-w-2xl">
            Collaborative battles that reward financial knowledge. Earn GT through quizzes, then
            deploy strategy during the war window.
          </p>
        </section>

        <section className="grid lg:grid-cols-[1.35fr_1fr] gap-8 items-start">
          <div className="space-y-6">
            <div className="glass-card p-6">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Arena Briefing</p>
              <h2 className="font-display text-2xl font-semibold mt-2">Club War Command</h2>
              <p className="text-sm text-muted-foreground mt-3">
                Keep the war preview visible, then open strategy, governance, and GT allocation
                stations as you coordinate with your club.
              </p>
            </div>
            <ClubWarPreview />
            <ClubWarBattleLane />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <GamePanel
              title="War Strategy Board"
              description="Plan attacks, defense, and resource allocation."
              trigger={
                <GameStationCard
                  title="War Strategy Board"
                  description="Tactics, boosts, and battle assignments."
                  icon={Swords}
                  gradient="from-destructive to-warning"
                />
              }
            >
              <WarStrategyBoard />
            </GamePanel>

            <GamePanel
              title="Governance Council"
              description="Club votes, proposals, and alliance settings."
              trigger={
                <GameStationCard
                  title="Governance Council"
                  description="Manage club policy and votes."
                  icon={Users}
                  gradient="from-primary to-neon-cyan"
                />
              }
            >
              <GovernancePanel />
            </GamePanel>

            <GamePanel
              title="Reward Allocation"
              description="Review GT mechanics powering club wars."
              trigger={
                <GameStationCard
                  title="Reward Allocation"
                  description="Tokenomics and reward distribution."
                  icon={Coins}
                  gradient="from-accent to-warning"
                />
              }
            >
              <TokenomicsPanel />
            </GamePanel>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ClubWar;
