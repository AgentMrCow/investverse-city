import { ArchitectureFlow } from "@/components/ArchitectureFlow";
import { CityVisualization } from "@/components/CityVisualization";
import { ClubWarPreview } from "@/components/ClubWarPreview";
import { CompoundingVault } from "@/components/CompoundingVault";
import { DailyChallenge } from "@/components/DailyChallenge";
import { GamePanel, GameStationCard } from "@/components/GamePanel";
import { InsuranceESGPanel } from "@/components/InsuranceESGPanel";
import { Leaderboard } from "@/components/Leaderboard";
import { QuestionBankPanel } from "@/components/QuestionBankPanel";
import { RegionPolicySwitch } from "@/components/RegionPolicySwitch";
import { SimulationLab } from "@/components/SimulationLab";
import { SkillTree } from "@/components/SkillTree";
import { StatsOverview } from "@/components/StatsOverview";
import { TokenomicsPanel } from "@/components/TokenomicsPanel";
import {
  BarChart3,
  Coins,
  LineChart,
  Sparkles,
  Star,
  Swords,
  Trophy,
  Users,
} from "lucide-react";

export function GameHub() {
  return (
    <section id="game-hub" className="relative py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background to-background" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col gap-4 mb-10">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">In-Game Hub</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">City Command Deck</h2>
          <p className="text-muted-foreground max-w-2xl">
            Tap a station to open its panel. The hub works like a mobile game menu, with pop-up
            panels instead of long scrolls.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.35fr_1fr] gap-8 items-start">
          <CityVisualization />

          <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <GamePanel
              title="Command Deck"
              description="Your live stats, region policy, and momentum indicators."
              trigger={
                <GameStationCard
                  title="Command Deck"
                  description="Open your stats and region policy switches."
                  icon={BarChart3}
                  gradient="from-primary to-neon-cyan"
                  label="HUD"
                />
              }
            >
              <div className="space-y-6">
                <StatsOverview />
                <RegionPolicySwitch />
              </div>
            </GamePanel>

            <GamePanel
              title="Daily Challenge"
              description="Keep the streak alive and earn GT rewards."
              trigger={
                <GameStationCard
                  title="Daily Challenge"
                  description="Timed quizzes with instant GT payouts."
                  icon={Sparkles}
                  gradient="from-accent to-warning"
                  label="Daily"
                />
              }
            >
              <DailyChallenge />
            </GamePanel>

            <GamePanel
              title="Skill Tree"
              description="Progress through investment, insurance, ESG, and web3 skills."
              trigger={
                <GameStationCard
                  title="Skill Tree"
                  description="Track mastery across investment and insurance paths."
                  icon={Star}
                  gradient="from-neon-purple to-neon-pink"
                />
              }
            >
              <SkillTree />
            </GamePanel>

            <GamePanel
              title="Club War Arena"
              description="Coordinate with your club to win timed strategy battles."
              trigger={
                <GameStationCard
                  title="Club War Arena"
                  description="Launch tactics, defense, and club coordination."
                  icon={Swords}
                  gradient="from-destructive to-warning"
                />
              }
            >
              <ClubWarPreview />
            </GamePanel>

            <GamePanel
              title="Leaderboard"
              description="See how knowledge, teamwork, and GT rewards stack up."
              trigger={
                <GameStationCard
                  title="Leaderboard"
                  description="Rankings, streaks, and reward standings."
                  icon={Trophy}
                  gradient="from-success to-emerald-400"
                />
              }
            >
              <Leaderboard />
            </GamePanel>

            <GamePanel
              title="Simulation Sandbox"
              description="Run scenarios, measure ESG signals, and protect assets."
              trigger={
                <GameStationCard
                  title="Simulation Sandbox"
                  description="Test portfolios and insurance coverage in minutes."
                  icon={LineChart}
                  gradient="from-primary to-accent"
                />
              }
            >
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <SimulationLab />
                </div>
                <InsuranceESGPanel />
              </div>
            </GamePanel>

            <GamePanel
              title="Vault + Tokenomics"
              description="Track GT sinks, vault strategy, and reward mechanics."
              trigger={
                <GameStationCard
                  title="Vault + Tokenomics"
                  description="Reinvest GT, unlock power-ups, and stay compliant."
                  icon={Coins}
                  gradient="from-accent to-warning"
                />
              }
            >
              <div className="grid lg:grid-cols-2 gap-6">
                <CompoundingVault />
                <TokenomicsPanel />
              </div>
            </GamePanel>

            <GamePanel
              title="Community Forge"
              description="Draft questions and review the platform architecture."
              trigger={
                <GameStationCard
                  title="Community Forge"
                  description="Curate questions and inspect the system map."
                  icon={Users}
                  gradient="from-neon-cyan to-primary"
                />
              }
            >
              <div className="grid lg:grid-cols-2 gap-6">
                <QuestionBankPanel />
                <ArchitectureFlow />
              </div>
            </GamePanel>
          </div>
        </div>
      </div>
    </section>
  );
}
