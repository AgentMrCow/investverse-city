import { useState, type ReactNode } from "react";

import { ActionDock } from "@/components/ActionDock";
import { ArchitectureFlow } from "@/components/ArchitectureFlow";
import { ClubWarBattleLane } from "@/components/ClubWarBattleLane";
import { CompoundingVault } from "@/components/CompoundingVault";
import { DailyChallenge } from "@/components/DailyChallenge";
import { Footer } from "@/components/Footer";
import { GameHud } from "@/components/GameHud";
import { GameModeMap, type MapNode } from "@/components/GameModeMap";
import { GameStationWindow } from "@/components/GameStationWindow";
import { InsuranceESGPanel } from "@/components/InsuranceESGPanel";
import { Leaderboard } from "@/components/Leaderboard";
import { Navbar } from "@/components/Navbar";
import { QuestionBankPanel } from "@/components/QuestionBankPanel";
import { RegionPolicySwitch } from "@/components/RegionPolicySwitch";
import { SimulationLab } from "@/components/SimulationLab";
import { SkillTree } from "@/components/SkillTree";
import { StatsOverview } from "@/components/StatsOverview";
import { TokenomicsPanel } from "@/components/TokenomicsPanel";
import { WarStrategyBoard } from "@/components/WarStrategyBoard";
import { useIsMobile } from "@/hooks/use-mobile";
import { Coins, LineChart, Sparkles, Star, Swords, Trophy, Users } from "lucide-react";

type GameNode = MapNode & { panel: ReactNode };

const GameMode = () => {
  const [activeEffect, setActiveEffect] = useState<string | null>(null);
  const [effectKey, setEffectKey] = useState(0);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const nodes: GameNode[] = [
    {
      id: "command",
      title: "Command Deck",
      description: "Stats, regional policy, and momentum indicators.",
      icon: LineChart,
      color: "hsl(var(--primary))",
      x: 18,
      y: 26,
      panel: (
        <div className="space-y-6">
          <StatsOverview />
          <RegionPolicySwitch />
        </div>
      ),
    },
    {
      id: "daily",
      title: "Daily Challenge",
      description: "Timed questions with GT rewards and streaks.",
      icon: Sparkles,
      color: "hsl(var(--accent))",
      x: 38,
      y: 22,
      panel: <DailyChallenge />,
    },
    {
      id: "skill",
      title: "Skill Tree",
      description: "Unlock investment and insurance mastery paths.",
      icon: Star,
      color: "hsl(var(--neon-purple))",
      x: 55,
      y: 26,
      panel: <SkillTree />,
    },
    {
      id: "simulation",
      title: "Simulation Lab",
      description: "Run scenarios and apply ESG coverage layers.",
      icon: LineChart,
      color: "hsl(var(--neon-cyan))",
      x: 70,
      y: 52,
      panel: (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SimulationLab />
          </div>
          <InsuranceESGPanel />
        </div>
      ),
    },
    {
      id: "club-war",
      title: "Club War",
      description: "Launch strikes and coordinate club tactics.",
      icon: Swords,
      color: "hsl(var(--destructive))",
      x: 62,
      y: 70,
      panel: (
        <div className="space-y-6">
          <ClubWarBattleLane />
          <WarStrategyBoard />
        </div>
      ),
    },
    {
      id: "vault",
      title: "Vault Core",
      description: "Reinvest GT and review token mechanics.",
      icon: Coins,
      color: "hsl(var(--warning))",
      x: 34,
      y: 74,
      panel: (
        <div className="grid lg:grid-cols-2 gap-6">
          <CompoundingVault />
          <TokenomicsPanel />
        </div>
      ),
    },
    {
      id: "leaderboard",
      title: "Leaderboard",
      description: "Track ranks and reward tiers.",
      icon: Trophy,
      color: "hsl(var(--success))",
      x: 82,
      y: 30,
      panel: <Leaderboard />,
    },
    {
      id: "community",
      title: "Community Forge",
      description: "Shape questions and review the platform map.",
      icon: Users,
      color: "hsl(var(--primary))",
      x: 18,
      y: 62,
      panel: (
        <div className="grid lg:grid-cols-2 gap-6">
          <QuestionBankPanel />
          <ArchitectureFlow />
        </div>
      ),
    },
  ];

  const activeNode = activeNodeId ? nodes.find((node) => node.id === activeNodeId) : undefined;

  const handleAction = (actionId: string) => {
    setActiveEffect(actionId);
    setEffectKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="game-mode pt-24 pb-24">
        <div className="container mx-auto px-4">
          <div className="game-stage">
            <h1 className="sr-only">Game Mode</h1>
            <div className="game-overlay-hud">
              <GameHud />
            </div>
            <GameModeMap
              nodes={nodes}
              activeNodeId={activeNodeId}
              onSelect={(id) => setActiveNodeId(id)}
              activeEffect={activeEffect}
              effectKey={effectKey}
            />
            <div className="game-overlay-actions">
              <ActionDock onAction={handleAction} lastAction={activeEffect} actionKey={effectKey} />
            </div>
            {activeNode && (
              <div className="game-overlay-station">
                <GameStationWindow
                  title={activeNode.title}
                  description={activeNode.description}
                  onClose={() => setActiveNodeId(null)}
                  compact={isMobile}
                >
                  {activeNode.panel}
                </GameStationWindow>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GameMode;
