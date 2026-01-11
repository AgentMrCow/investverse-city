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
import { PartnerInstitutionsPanel } from "@/components/PartnerInstitutionsPanel";
import { QuestionBankPanel } from "@/components/QuestionBankPanel";
import { RegionPolicySwitch } from "@/components/RegionPolicySwitch";
import { ShopPanel } from "@/components/ShopPanel";
import { SimulationLab } from "@/components/SimulationLab";
import { StockTickerPanel } from "@/components/StockTickerPanel";
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
  const [mapScale, setMapScale] = useState(1);
  const isMobile = useIsMobile();
  const stationOpen = !!activeNodeId;

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
      description: "Launch strikes and coordinate club tactics. Buy shields in the shop.",
      icon: Swords,
      color: "hsl(var(--destructive))",
      x: 62,
      y: 70,
      panel: (
        <div className="space-y-6">
          <ClubWarBattleLane onRequestShop={() => setActiveNodeId("shop")} />
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
      id: "shop",
      title: "Shop",
      description: "Buy shields, hedges, and boosts with GT.",
      icon: Coins,
      color: "hsl(var(--accent))",
      x: 40,
      y: 84,
      panel: <ShopPanel />,
    },
    {
      id: "institutions",
      title: "Institute Partners",
      description: "B2B courses from banks and academies.",
      icon: Users,
      color: "hsl(var(--primary))",
      x: 14,
      y: 74,
      panel: <PartnerInstitutionsPanel />,
    },
    {
      id: "stocks",
      title: "Live Market",
      description: "Real stock prices feeding the sim lab.",
      icon: LineChart,
      color: "hsl(var(--neon-cyan))",
      x: 86,
      y: 64,
      panel: <StockTickerPanel />,
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

  const zoomIn = () => setMapScale((value) => Math.min(1.4, value + 0.1));
  const zoomOut = () => setMapScale((value) => Math.max(0.8, value - 0.1));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="game-mode pt-24 pb-24">
        <div className="container mx-auto px-4">
          <div className={`game-stage${stationOpen ? " station-open" : ""}`}>
            <h1 className="sr-only">Game Mode</h1>
            <div className="game-overlay-hud">
              <GameHud />
            </div>
            <div className="game-map-wrapper">
              <div className="map-scale-controls">
                <button type="button" onClick={zoomOut} aria-label="Zoom out">
                  −
                </button>
                <button type="button" onClick={zoomIn} aria-label="Zoom in">
                  +
                </button>
              </div>
              <div
                className="map-scale-layer"
                style={{ transform: `scale(${mapScale})`, transformOrigin: "center center" }}
              >
                <GameModeMap
                  nodes={nodes}
                  activeNodeId={activeNodeId}
                  onSelect={(id) => setActiveNodeId(id)}
                  activeEffect={activeEffect}
                  effectKey={effectKey}
                />
              </div>
            </div>
            <div className="game-overlay-actions">
              <ActionDock onAction={handleAction} lastAction={activeEffect} actionKey={effectKey} />
            </div>
            {activeNode && (
              <>
                <div className="game-station-backdrop" />
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
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GameMode;
